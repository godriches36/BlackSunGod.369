name: Sovereign Contract Deployment

on:
  push:
    paths:
      - 'contracts/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install Dependencies
        run: npm install

      - name: Deploy to Ethereum
        env:
          PRIVATE_KEY: ${{ secrets.WORLD_LEADER_PRIVATE_KEY }}
          ETHERSCAN_API_KEY: ${{ secrets.ETHERSCAN_API_KEY }}
        run: |
          # This command triggers the deployment of SovereignVault.sol
          npx hardhat run scripts/deploy.js --network mainnet
