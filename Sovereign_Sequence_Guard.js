/**
 * AGBON OS - GETH PENDING BLOCK SEQUENCE GUARD
 * Logic: https://github.com/chainstacklabs/geth-pending-latest-block
 * Purpose: Monitoring the 'Pending' state to prevent Nonce Gaps & System Freezes.
 * COPYRIGHT © 2026 godriches36. ALL RIGHTS RESERVED.
 */

import { ethers } from "ethers";

/**
 * PENDING STATE MONITOR
 * Uses Geth-specific calls to see transactions that are in the Mempool
 * but not yet in a block. This is the "Black-Sun" monitoring layer.
 */
export const monitorPendingSequence = async (provider, address) => {
    // We query both 'latest' (confirmed) and 'pending' (mempool)
    const [latestNonce, pendingNonce] = await Promise.all([
        provider.getTransactionCount(address, "latest"),
        provider.getTransactionCount(address, "pending")
    ]);

    const nonceGap = pendingNonce - latestNonce;

    return {
        confirmed_count: latestNonce,
        mempool_count: pendingNonce,
        gap_detected: nonceGap > 0,
        status: nonceGap > 0 ? "WARNING: STUCK_TRANSACTION" : "CLEAR",
        recommendation: nonceGap > 0 ? "INITIATE_REPLACEMENT_OR_DROP" : "PROCEED"
    };
};

/**
 * THE BLACK-SUN NONCE HANDSHAKE
 * Ensures every new transaction uses the 'Pending' nonce + 1.
 * This prevents the "9 nonce after a 2" error from your document.
 */
export const getNextSovereignNonce = async (provider, address) => {
    // We always use 'pending' to ensure we are at the very front of the sequence
    const nextNonce = await provider.getTransactionCount(address, "pending");
    console.log(`[BLACK-SUN] Secure Nonce Identified: ${nextNonce}`);
    return nextNonce;
};

/**
 * BLOCKCHAIN OVERRIDE (DROP LOGIC)
 * If the OS detects a transaction has been "Pending" for too long 
 * without moving to "Latest", it triggers the 'Dropped & Replaced' logic.
 */
export const triggerSequenceRepair = async (signer, stuckNonce) => {
    const feeData = await signer.getFeeData();
    
    // As per your doc: "highest transaction fee will be picked up by the miners"
    // We double the priority fee to "Force" the replacement.
    const repairTx = {
        to: await signer.getAddress(),
        value: 0,
        nonce: stuckNonce,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas.mul(2),
        maxFeePerGas: feeData.maxFeePerGas.mul(2)
    };

    console.warn(`[REPAIR] Dropping stuck nonce ${stuckNonce} via Black-Sun Protocol.`);
    return await signer.sendTransaction(repairTx);
};
