// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/ERC20Vote.sol";

contract Crowdfunding is ERC20Vote {
    struct Proposal {
        uint256 id;
        address creator;
        string description;
        uint256 votingDeadline;
        bool executed;
        uint256 yesVotes;
        uint256 noVotes;
        mapping(address => bool) voted;
    }

    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public voted;

    constructor(
        address _defaultAdmin,
        string memory _name,
        string memory _symbol
    )
        ERC20Vote(
            _defaultAdmin,
            _name,
            _symbol
        )
    {}

    function createProposal(string memory _description, uint256 _votingPeriodInDays) external {
        require(_votingPeriodInDays > 0, "Voting period must be greater than zero");
        uint256 proposalId = proposalCount++;
        uint256 votingDeadline = block.timestamp + (_votingPeriodInDays * 1 days);

        proposals[proposalId] = Proposal({
            id: proposalId,
            creator: msg.sender,
            description: _description,
            votingDeadline: votingDeadline,
            executed: false,
            yesVotes: 0,
            noVotes: 0
        });

        emit ProposalCreated(proposalId, msg.sender, _description, votingDeadline);
    }

    function vote(uint256 _proposalId, bool _supportsProposal) external {
        Proposal storage proposal = proposals[_proposalId];
        require(!proposal.executed, "Proposal already executed");
        require(block.timestamp <= proposal.votingDeadline, "Voting period has ended");
        require(!proposal.voted[msg.sender], "Already voted");

        if (_supportsProposal) {
            proposal.yesVotes++;
        } else {
            proposal.noVotes++;
        }

        proposal.voted[msg.sender] = true;
        emit VoteCasted(_proposalId, msg.sender, _supportsProposal);
    }

    function executeProposal(uint256 _proposalId) external {
        Proposal storage proposal = proposals[_proposalId];
        require(!proposal.executed, "Proposal already executed");
        require(block.timestamp > proposal.votingDeadline, "Voting period has not ended");

        // Simple majority (more yes votes than no votes) to execute proposal
        if (proposal.yesVotes > proposal.noVotes) {
            // Execute proposal logic here
            proposal.executed = true;
            emit ProposalExecuted(_proposalId);
        } else {
            emit ProposalRejected(_proposalId);
        }
    }

    event ProposalCreated(uint256 indexed proposalId, address indexed creator, string description, uint256 votingDeadline);
    event VoteCasted(uint256 indexed proposalId, address indexed voter, bool supportsProposal);
    event ProposalExecuted(uint256 indexed proposalId);
    event ProposalRejected(uint256 indexed proposalId);
}
