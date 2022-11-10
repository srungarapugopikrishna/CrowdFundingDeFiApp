// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CrowdFundingApp is ERC721URIStorage{
    //contractOwner is the address that created the smart contract
    address payable contractOwner;

    // //postOwner is the address that posts on the platform
    // address payable postOwner;

    //The fee charged by the platform to publish a post.
    uint256 platformCharge = 0.01 ether;

    using Counters for Counters.Counter;
    //_tokenIds variable has the most recent minted tokenId
    Counters.Counter private _postIdCounter;

    struct Post{
        uint256 postId;
        address payable contractOwner;
        address payable postOwner;
        uint256 funding;
        string postDescription;
        bool postStatus;
        uint256 timestamp;
    }

    //the event emitted when a post is successfully listed
    event ListPost (
        uint256 indexed postId,
        address contractOwner,
        address postOwner,
        uint256 funding,
        string postDescription,
        bool postStatus,
        uint256 timestamp

    );

    //This mapping maps postId to Post info and is helpful when retrieving details about a Post 
    mapping(uint256 => Post) private postIdToPostMap;

    constructor() ERC721("CrowdFundingApp", "CFA") {
        contractOwner = payable(msg.sender);
    }

    function createPost(uint256 funding, string memory postDescription) public payable returns(uint){
        require(msg.value >= platformCharge, "PLatform charge requirement doesn't meet");

        require(funding > 0, "Fund atleast a positive amount");

        // INcrement the postId counter, which is keeping track of the number for created Posts.
        _postIdCounter.increment();
        uint256 newPostId = _postIdCounter.current();

        //Mint the Post with postId newPostId to the address who called createPost
        _safeMint(msg.sender, newPostId);

        postIdToPostMap[newPostId] = Post(
            newPostId,
            payable(address(this)),
            payable(msg.sender),
            0,
            postDescription,
            true,
            block.timestamp
        );

        _transfer(msg.sender, address(this), newPostId);

        //Emit the event for successful transfer. Frontend parses this and displays it
        emit ListPost(
            newPostId, 
            address(this), 
            msg.sender, 
            funding, 
            postDescription, 
            true, 
            block.timestamp
        );

        return newPostId;
    }

    function getAllPosts() public view returns (Post[] memory){
        uint postCount = _postIdCounter.current();
        Post[] memory allPosts = new Post[](postCount);
        uint currentIndex = 0;
        uint currentPostId;

        for(uint i=0;i<postCount;i++){
            currentPostId = i+1;
            Post storage currentPost = postIdToPostMap[currentPostId];
            allPosts[currentIndex] = currentPost;
            currentIndex == 1;
        }

        return allPosts;
    }

    function fundAPost(uint256 postId) public payable{
        postIdToPostMap[postId].funding += msg.value;
        //Transfering user given fund(msg.sender) to the contract.
        payable(address(this)).transfer(msg.value);

    }

    function withdrawPostFunds(uint256 postId) public payable{
        address postOwner = postIdToPostMap[postId].postOwner;
        require(msg.sender == postOwner, "You are not authorized to withdraw these funds...");
        require(postIdToPostMap[postId].funding > 0, "You have no funding amount avaialble");

        payable(contractOwner).transfer(platformCharge);

        payable(postOwner).transfer(postIdToPostMap[postId].funding);
        postIdToPostMap[postId].funding = 0;
    }
}

