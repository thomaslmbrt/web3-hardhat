import {MyERC20Token} from "../typechain-types";
import {ethers} from "hardhat";
import * as assert from "assert";
import { expect } from "chai";

describe('MyERC20Token', () => {
  let token: MyERC20Token;

  before(async () => {
    [this.owner, this.addr1, ...this.addrs] = await ethers.getSigners();
    const myTokenContract = await ethers.getContractFactory("MyERC20Token");
    token = await myTokenContract.deploy();
  });

  describe('Deployment', () => {
    it('should get the owner balance', async () => {
      const ownerBalance = `${await (token.balanceOf(this.owner.address))}`;

      assert.equal(ownerBalance, `${ethers.BigNumber.from('1000000')}`);
    });
  });

  describe('Mint', () => {
    it('should mint token if owner', async () => {
      const transaction = await token.mint(this.owner.address, ethers.BigNumber.from('1000000'));

      await transaction.wait(1);
      const ownerBalance = `${await (token.balanceOf(this.owner.address))}`;

      assert.equal(ownerBalance, `${ethers.BigNumber.from('2000000')}`);
    });

    it('should not mint token if not owner', async () => {
      await expect(token.connect(this.addr1).mint(this.owner.address, ethers.BigNumber.from('1000000'))).to.be.revertedWith('Ownable: caller is not the owner');
    });
  });
});