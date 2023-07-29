import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Contract } from 'ethers';

describe('MyToken', function() {

    let MyToken: Contract;

    beforeEach(async () => {
        const[owner] = await ethers.getSigners();

        const TokenFactory = await ethers.getContractFactory('MyToken');
        MyToken = await TokenFactory.deploy(1000, { from: owner.address });
        await MyToken.deployed();
    });

    it('Should set the right totalSupply', async function() {
        const totalSupply = await MyToken.totalSupply();
        expect(totalSupply).to.equal(1000);
    });

    it('Should transfer transfer tokens correctly', async function(){
        const [owner, addr1] = await ethers.getSigners();

        await MyToken.transfer(addr1.address, 50);
        const addr1Balance = await MyToken.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(50);

        const ownerBalance = await MyToken.balanceOf(owner.address);
        expect(ownerBalance).to.equal(950);
    });

    it('Should fail if sender doenst have enough tokens', async function() {
        const [owner, addr1] = await ethers.getSigners();
        const initialOwnerBalance = await MyToken.balanceOf(owner.address);

        await expect(
            MyToken.connect(addr1).transfer(owner.address, 1)
          ).to.be.revertedWith('Not enough tokens');

        expect(await MyToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });
})