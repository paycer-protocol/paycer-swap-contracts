import { HardhatUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-typechain";
import "hardhat-deploy";
import "hardhat-contract-sizer";
import "solidity-coverage";
import { config as dotEnvConfig } from "dotenv";

dotEnvConfig();

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const mnemonic = process.env.WORKER_SEED || "";

const defaultConfig = {
  accounts: { mnemonic },
  allowUnlimitedContractSize: true,
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.5.16",
      },
      {
        version: "0.6.6",
      }
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 999999,
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337,
      ...defaultConfig
    },
    mainnet: {
      url: 'https://bsc-dataseed.binance.org/',
      chainId: 56,
      ...defaultConfig
    },
    hardhat: {
      forking: {
        url:
          "https://data-seed-prebsc-1-s1.binance.org:8545",
      },
      accounts: {
        mnemonic,
        accountsBalance: "10000000000000000000000",
      },
      chainId: 1337,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  mocha: {
    timeout: "1000000s"
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
};

export default config;
