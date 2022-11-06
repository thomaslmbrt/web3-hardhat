import { run } from "hardhat";

export const verify = async (contractAddress: string, args: any[] = []) => {
 try {
  await run("verify:verify", {
    address: contractAddress,
    constructorArgs: args,
  });
 } catch (e: any) {
   console.log(e);
 }
}
