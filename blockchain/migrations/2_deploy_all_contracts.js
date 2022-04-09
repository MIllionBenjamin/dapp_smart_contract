
// First deploy MicroToken and UserIdentity
// Then deploy Bankloan and CarRentalSmartContract based on the MicroToken and UserIdentity
const MicroToken = artifacts.require("MicroToken");
const UserIdentity = artifacts.require("UserIdentity");
const BankLoan = artifacts.require("BankLoan");
const CarRentalSmartContract = artifacts.require("CarRentalSmartContract");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(MicroToken);
  const microTokenInstance = await MicroToken.deployed();

  console.log(microTokenInstance.address);

  await deployer.deploy(UserIdentity);
  const userIdentityInstance = await UserIdentity.deployed();

  console.log(userIdentityInstance.address);

  await deployer.deploy(BankLoan, microTokenInstance.address, userIdentityInstance.address);

  await deployer.deploy(CarRentalSmartContract, microTokenInstance.address, userIdentityInstance.address);

};
