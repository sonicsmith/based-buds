import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import * as dotenv from "dotenv";

dotenv.config();

const privateKey = process.env.DEPLOYMENT_PRIVATE_KEY;
const mainnetUrl = process.env.MAINNET_RPC_URL;
const testnetUrl = process.env.TESTNET_RPC_URL;
const apiKey = process.env.ETHERSCAN_API_KEY;

const accounts = privateKey ? [privateKey] : [];

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    "base-mainnet": {
      accounts,
      url: mainnetUrl,
      chainId: 8453,
    },
    "base-sepolia": {
      accounts,
      url: testnetUrl,
      chainId: 84532,
    },
  },
  etherscan: {
    apiKey,
  },
};

export default config;
