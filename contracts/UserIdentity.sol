// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract UserIdentity{
    
    //Now only Borrower Loans.
    // Must have a 'NORMAL' as default value, otherwise the default null value is 'BORROWER'
    enum Role {NORMAL, BORROWER }
    
    struct User{
        uint id; 
        string socialSecurityId; // each property has an unique social security id
        address walletAddress;
        string name;
        Role role;
    }
    
    address public admin;
    
    uint public borrowersCount = 0;
    //uint private brokersCount = 0;

    mapping(address => User) public borrowers;
    //mapping(address => User) private brokers;
    
    address[] public borrowersAddresses;
    // address[] private brokersAddresses;
    
    // add parameter to the constructor
    constructor()
    {
        admin = msg.sender; // Ganache Account 1, the Bank
    }
    
    modifier isAdmin()
    {
        require(admin == msg.sender, 'Admin Only');
        _;
    }
    
    
    function verifyIsBorrower(address _address) public view returns(bool)
    {
        bool isValid = false;
        isValid = borrowers[_address].role == Role.BORROWER;
        return isValid;
    }
    
    function addBorrower(string memory _socialSecurityId, address _address, string memory _name) 
        public isAdmin()
    {
        borrowersCount = borrowersCount + 1;
        User memory user = User(borrowersCount, _socialSecurityId, _address, _name,  Role.BORROWER );
        borrowers[_address] = user;
        borrowersAddresses.push(_address);
    }
    
    
    function getAllBorrowers() public view returns (User[] memory){
        User[] memory ret = new User[](borrowersCount);
        for (uint i = 0; i < borrowersCount; i++) {
            ret[i] = borrowers[borrowersAddresses[i]];
        }
        return ret;
    }
}
