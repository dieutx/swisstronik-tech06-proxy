const hre = require("hardhat");
require('@openzeppelin/hardhat-upgrades');

const UPGRADEABLE_PROXY = "0x531aB44A406915ab4b1e6b95f56C02E0Fd1b3D77";

async function main() {
   const gas = (await hre.ethers.provider.getFeeData()).gasPrice;
   const V2Contract = await hre.ethers.getContractFactory("V2");
   console.log("Upgrading V1Contract...");
   let upgrade = await hre.upgrades.upgradeProxy(UPGRADEABLE_PROXY, V2Contract, {
      gasPrice: gas
   });
   console.log("V1 Upgraded to V2");
   console.log("V2 Contract Deployed To:", upgrade.target)
}

main().catch((error) => {
   console.error(error);
   process.exitCode = 1;
 });
