// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Crowdfunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 amountCollected;
        string images;
        uint256[] milestoneIds;
    }

    struct Milestone {
        uint256 id;
        uint256 campaignId;
        string milestonetitle;
        string milestonedescription;
        uint256 targetAmt;
        uint256 startDate;
        uint256 endDate;
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => Milestone) public milestones;
    uint256 public numberOfCampaigns = 0;
    uint256 public numberOfMilestones = 0;
    
    address public ktyTokenAddress;

    constructor(address _ktyTokenAddress) {
        ktyTokenAddress = _ktyTokenAddress;
    }

    function createCampaign(
        string memory _title,
        string memory _description,
        uint256 _target,
        string memory _images,
        Milestone[] memory _milestones // Array of milestones
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];
        
        campaign.owner = msg.sender;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.amountCollected = 0;
        campaign.images = _images;

        // Create milestones and link them to the campaign
        for (uint256 i = 0; i < _milestones.length; i++) {
            Milestone storage milestone = milestones[numberOfMilestones];
            milestone.id = numberOfMilestones;
            milestone.campaignId = numberOfCampaigns;
            milestone.milestonetitle = _milestones[i].milestonetitle;
            milestone.milestonedescription = _milestones[i].milestonedescription;
            milestone.targetAmt = _milestones[i].targetAmt;
            milestone.startDate = _milestones[i].startDate;
            milestone.endDate = _milestones[i].endDate;

            campaign.milestoneIds.push(numberOfMilestones);
            numberOfMilestones++;
        }

        numberOfCampaigns++;
        
        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id, uint256 _amount) public {
        require(_id < numberOfCampaigns, "Campaign does not exist");

        // Transfer KTY tokens from sender to this contract
        // Replace with your actual token transfer mechanism
        // Example: require(KTYToken(ktyTokenAddress).transferFrom(msg.sender, address(this), _amount), "Token transfer failed");

        Campaign storage campaign = campaigns[_id];
        campaign.amountCollected += _amount;

        // Track donor if needed
        // campaign.donators.push(msg.sender);
        // campaign.donations.push(_amount);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }

        return allCampaigns;
    }

    function getMilestones(uint256 _campaignId) public view returns (Milestone[] memory) {
        uint256[] memory milestoneIds = campaigns[_campaignId].milestoneIds;
        Milestone[] memory allMilestones = new Milestone[](milestoneIds.length);

        for (uint256 i = 0; i < milestoneIds.length; i++) {
            Milestone storage milestone = milestones[milestoneIds[i]];
            allMilestones[i] = milestone;
        }

        return allMilestones;
    }
}
