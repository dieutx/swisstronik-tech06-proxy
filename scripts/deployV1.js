const hre = require("hardhat");
require('@openzeppelin/hardhat-upgrades');

async function main() {
  const gas = (await hre.ethers.provider.getFeeData()).gasPrice;
  const V1contract = await hre.ethers.getContractFactory("V1");
  console.log("Deploying V1contract...");
  
  const v1contract = await hre.upgrades.deployProxy(V1contract, [10], {
      gasPrice: gas, 
      initializer: "initialValue",
   });
  
  await v1contract.waitForDeployment();
  
  console.log("V1 Contract deployed to:", v1contract.target);
  
  console.log(`Pausing 10 seconds in order to verify Contract`);
  await delay();
  console.log(`Pause finished. Verifying Contract...`);

  try {
    await hre.run("verify:verify", {
      address: v1contract.target,
      constructorArguments: [10],
    });
    console.log("Contract verified to", hre.config.etherscan.customChains[0].urls.browserURL + "/address/" + v1contract.target);
  } catch (err) {
    console.error("Error veryfing Contract. Reason:", err);
  }
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 10 * 1000));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
