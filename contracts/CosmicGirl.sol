// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

// imports
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol"; // for adding some token Ids
import "@openzeppelin/contracts/utils/Strings.sol"; // converting int to str
import "@openzeppelin/contracts/utils/Base64.sol"; // work with our SVGs

contract ChainBattles is ERC721URIStorage {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Chain Battles", "CBTLS") {}

    function mint() public {
        _tokenIds.increment(); // because the original number of count is zero
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
    }
}
