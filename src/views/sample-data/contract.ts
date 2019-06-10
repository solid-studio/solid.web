export const SAMPLE_CONTRACT = `pragma solidity ^0.5.3;

contract SimpleStorage {
                
uint256 value;
                
    constructor() public {
        value = 1000;
    }
    
    function getValue() public view returns(uint256){
        return value;
    }
}`