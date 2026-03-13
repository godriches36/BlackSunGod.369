/**
 * AGBON OS - GETH PENDING BLOCK MEMPOOL CORE
 * Logic: https://github.com/chainstacklabs/geth-pending-latest-block
 * Purpose: Foundational monitoring of the 'Pending' state for 05Fa Root.
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
 */
export const getNextSovereignNonce = async (provider, address) => {
    const nextNonce = await provider.getTransactionCount(address, "pending");
    console.log(`[CORE] Secure Nonce Identified: ${nextNonce}`);
    return nextNonce;
};

/**
 * BLOCKCHAIN OVERRIDE (DROP LOGIC)
 * Force-replaces a stuck transaction by doubling gas.
 */
export const triggerSequenceRepair = async (signer, stuckNonce) => {
    const feeData = await signer.getFeeData();
    
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
