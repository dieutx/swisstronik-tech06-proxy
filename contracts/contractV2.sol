// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract V2 {
   uint public number;

   function initialValue(uint _num) external {
       number=_num;
   }

   function increase() external {
       number += 1;
   }

   function decrease() external {
       number -= 1;
   }
}
