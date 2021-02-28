// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;


contract Certif {
    
    string[] certif;
    
    function getCertif() public view returns (string[] memory) {
        return certif;
    }

    function addCertif(string memory value) public {
        certif.push(value);
    }
    
    function getLength() public view returns (uint) {
        return certif.length;
    }

}