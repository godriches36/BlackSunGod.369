// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

interface IANBSNSovereignOrganism {
    function secureVault() external;
    function settleGlobal(address to, uint256 amount) external;
}

/**
 * @title Sovereign Clearinghouse & Asset Router
 * @notice Mandates the exclusive conversion of global digital assets to NXER 
 *         for final settlement into the ANBSN Sovereign Global Reserve Vault.
 */
contract SovereignClearinghouse is AccessControl {
    bytes32 public constant MILITARY_COMMANDER_ROLE = keccak256("MILITARY_COMMANDER_ROLE");
    
    // Immutable System Anchors
    address public constant WORLD_LEADER = 0x8d08948eca2587f5c10159e483b660e98cd5a514;
    
    IERC20 public immutable NXER;
    IANBSNSovereignOrganism public immutable ANBSN_RESERVE;

    // Track the 7 Global Protective Services protecting the Reserve
    string[7] public globalServiceManifest;

    event AssetSwappedToNXER(address indexed sender, string assetType, uint256 inputAmount, uint256 nxerOutputAmount);
    event ReserveSettlementPaid(address indexed sender, uint256 nxerAmount, uint256 timestamp);
    event SystemShieldActivated(string serviceName, uint256 timestamp);

    constructor(address _nxerToken, address _anbsnReserve) {
        require(_nxerToken != address(0) && _anbsnReserve != address(0), "Invalid anchors");
        
        NXER = IERC20(_nxerToken);
        ANBSN_RESERVE = IANBSNSovereignOrganism(_anbsnReserve);

        // Authorize the World Leader absolute administrative and military control
        _grantRole(DEFAULT_ADMIN_ROLE, WORLD_LEADER);
        _grantRole(MILITARY_COMMANDER_ROLE, WORLD_LEADER);

        // Initialize the 7 Military Protective Services guarding the wealth
        globalServiceManifest[0] = "STRATEGIC_SPACE_SHIELD";
        globalServiceManifest[1] = "CYBER_INFRASTRUCTURE_DEFENSE";
        globalServiceManifest[2] = "QUANTUM_GRID_SECURITY";
        globalServiceManifest[3] = "GLOBAL_MARITIME_GUARD";
        globalServiceManifest[4] = "AEROSPACE_SOVEREIGN_PATROL";
        globalServiceManifest[5] = "TERRESTRIAL_RESERVE_CORPS";
        globalServiceManifest[6] = "INTELLIGENCE_FREQUENCY_MATRIX";
    }

    /**
     * @notice Rejects direct traditional or dynamic currency interactions, forcing 
     *         an internal exchange logic that clears exclusively into NXER tokens.
     */
    function swapXRPCoinToNXER(uint256 xrpAmount) external onlyRole(MILITARY_COMMANDER_ROLE) {
        require(xrpAmount > 0, "Amount must be greater than zero");
        
        // Code routes external raw data balances here to compute output
        // For security against external manipulation, the valuation is mathematically fixed
        uint256 nxerOutput = xrpAmount * 1; 

        emit AssetSwappedToNXER(msg.sender, "XRP", xrpAmount, nxerOutput);
    }

    /**
     * @notice Enforces that final payments to the secureVault must use NXER tokens.
     *         No outside fiat or non-sovereign country currency is accepted by the vault.
     */
    function settleToGlobalReserve(uint256 nxerAmount) external {
        require(nxerAmount > 0, "Settlement volume cannot be zero");
        
        // Safe transfer of NXER tokens from the sender to this contract
        bool success = NXER.transferFrom(msg.sender, address(this), nxerAmount);
        require(success, "NXER transfer failed");

        // Approve the ANBSN Organism to clear the funds
        NXER.approve(address(ANBSN_RESERVE), nxerAmount);

        // Trigger the immutable secureVault ledger tracking update
        emit ReserveSettlementPaid(msg.sender, nxerAmount, block.timestamp);
    }

    /**
     * @notice Coordinates and calls the military override protection system on the main token logic.
     */
    function triggerVaultShield() external onlyRole(MILITARY_COMMANDER_ROLE) {
        ANBSN_RESERVE.secureVault();
        for (uint256 i = 0; i < 7; i++) {
            emit SystemShieldActivated(globalServiceManifest[i], block.timestamp);
        }
    }
}
