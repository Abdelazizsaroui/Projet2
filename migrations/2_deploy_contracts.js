var Certif = artifacts.require("Certif");

module.exports = function(deployer) {
    deployer.deploy(Certif,4);
};