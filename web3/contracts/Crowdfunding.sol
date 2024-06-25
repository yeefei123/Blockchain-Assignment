// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Import KTY token contract ABI
import "./KTY.sol"; // Assuming KTYToken.sol contains the KTY token contract code and ABI

contract Crowdfunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string images;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns = 0;

    // Address of KTY token contract
    address public ktyTokenAddress;
    KTYToken public ktyToken; // Instance of KTYToken contract

    constructor(address _ktyTokenAddress) {
        ktyTokenAddress = _ktyTokenAddress;
        ktyToken = KTYToken(_ktyTokenAddress);
    }

    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _images) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];
        require(_deadline > block.timestamp, "The deadline should be a date in the future.");
        
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.images = _images;
        numberOfCampaigns++;
        
        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id, uint256 _amount) public {
        Campaign storage campaign = campaigns[_id];
        
        // Transfer KTY tokens from sender to this contract
        require(ktyToken.transferFrom(msg.sender, address(this), _amount), "Token transfer failed");

        campaign.donators.push(msg.sender);
        campaign.donations.push(_amount);
        campaign.amountCollected += _amount;
    }

    function getDonators(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }

        return allCampaigns;
    }

    // Function to retrieve the balance of KTY tokens held by this contract
    function getKTYBalance() public view returns (uint256) {
        return ktyToken.balanceOf(address(this));
    }
}
