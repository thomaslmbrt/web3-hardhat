import { ethers, network } from "hardhat";
import {verify} from "../utils/verify";

async function main() {
  const myTokenContract = await ethers.getContractFactory("MyERC20Token");
  const myToken = await myTokenContract.deploy();

  await myToken.deployed();
  console.log(`smart contract address ${myToken.address}`);

  if (network.name === 'goerli') {
    console.log(`Waiting blocks`);
    await myToken.deployTransaction.wait(6);
    console.log(`Verifying contract`);
    await verify(myToken.address);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
