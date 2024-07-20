// contracts/FashionVoting.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FashionVoting {
    struct FashionLook {
        string imageUrl;
        uint voteCount;
    }

    mapping(uint => FashionLook) public fashionLooks;
    uint public fashionLookCount;

    function addFashionLook(string memory _imageUrl) public {
        fashionLookCount++;
        fashionLooks[fashionLookCount] = FashionLook(_imageUrl, 0);
    }

    function voteFashionLook(uint _lookId) public {
        require(_lookId > 0 && _lookId <= fashionLookCount, "Invalid fashion look ID");
        fashionLooks[_lookId].voteCount++;
    }

    function getTopFashionLooks() public view returns (FashionLook[] memory) {
        FashionLook[] memory topLooks = new FashionLook[](fashionLookCount);
        for (uint i = 1; i <= fashionLookCount; i++) {
            topLooks[i - 1] = fashionLooks[i];
        }
        return topLooks;
    }
}
