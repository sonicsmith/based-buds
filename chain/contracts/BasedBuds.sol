// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract BasedBuds is ERC721 {
    uint256 private _nextTokenId;

    constructor(address initialOwner) ERC721("BasedBuds", "BDBD") {}

    function safeMint(address to) public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public pure override returns (string memory) {
        return
            string.concat(
                "https://based-buddies.vercel.app/api/tokens/",
                Strings.toString(tokenId)
            );
    }
}
