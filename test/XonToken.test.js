const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Xon", () => {
    let owner
    let bob
    let alice
    let XonContract


    beforeEach(async () => {
        [owner, bob, alice] = await ethers.getSigners();
        XonContract = await  ethers.deployContract("XonToken", ["Xon Token", "XON", 18, 1000])
        
    })

    describe("Deployment", () => {
        it("Should assign the total supply of tokens to the owner", async () => {
            const ownerBalance = await XonContract.balanceOf(owner.address)
            expect(await XonContract.totalSupply()).to.equal(ownerBalance)
        })
    });
});


