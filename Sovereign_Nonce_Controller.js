/**
 * AGBON OS - NONCE & TRANSACTION RECOVERY ENGINE
 * Logic: "Dropped & Replaced" Protocol
 * Purpose: Mastering Nonce Sequencing to allow for Transaction Cancellation.
 * COPYRIGHT © 2026 godriches36. ALL RIGHTS RESERVED.
 */

import { ethers } from "ethers";

/**
 * RECALL TRANSACTION (The "Kill Switch")
 * This replaces a pending transaction with a "Null" action, 
 * effectively dropping the original and reverting funds.
 */
export const recallSovereignTransaction = async (signer, pendingNonce, currentGasPrice) => {
    console.warn(`[RECOVERY] Attempting to DROP transaction with Nonce: ${pendingNonce}`);

    // We send a 0 ETH transaction to OURSELVES with the SAME nonce
    // But we increase the gas price by 25% to ensure miners pick it up first.
    const replacementTx = {
        to: await signer.getAddress(),
        value: 0,
        nonce: pendingNonce,
        gasPrice: currentGasPrice.mul(125).div(100), 
        data: "0x44524f50" // 'DROP' in hex
    };

    try {
        const tx = await signer.sendTransaction(replacementTx);
        return {
            status: "DROPPING_ORIGINAL",
            replacementHash: tx.hash,
            instruction: "Wait for 'Dropped & Replaced' status on Sovereign Ledger."
        };
    } catch (error) {
        console.error("RECOVERY_FAILED: Nonce may already be processed.");
        return null;
    }
};

/**
 * SEQUENCE AUDITOR
 * Ensures your transactions are sequential (0, 1, 2...) to prevent "Gaps".
 */
export const auditNonceSequence = async (provider, address) => {
    const transactionCount = await provider.getTransactionCount(address);
    const pendingCount = await provider.getTransactionCount(address, "pending");

    return {
        next_ready_nonce: transactionCount,
        pending_transactions: pendingCount - transactionCount,
        is_stuck: (pendingCount - transactionCount) > 0,
        action_required: (pendingCount - transactionCount) > 2 ? "REPLACE_LOW_GAS_TX" : "CLEAR"
    };
};

/**
 * GAS OVERRIDE LOGIC
 * As your doc says: "highest transaction fee will be picked up by the miners."
 */
export const getCompetitiveGas = async (provider) => {
    const feeData = await provider.getFeeData();
    return {
        standard: feeData.gasPrice,
        sovereign_priority: feeData.gasPrice.mul(150).div(100) // 50% boost for instant processing
    };
};
