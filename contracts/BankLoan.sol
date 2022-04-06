// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./UserIdentity.sol";
import "./MicroToken.sol";
import "./carRentalSmartContract.sol";

contract BankLoan{

    //Now only Borrower Loans.
    enum LoanState{
        
        BORROWER_SIGNED,
        BANK_APPROVED, 
        BANK_REJECTED,
        
       
        ONGOING, 
        DEFAULT, 
        CLOSE
    }
    
    struct Loan{
        uint id;
        uint amount;
        uint months;
        uint interest;
        string planId;
        LoanState state;
        //Now only Borrower Loans.
        //address broker;
        address borrower;
        //uint brokerFee;
        bool bankApprove;
        bool isBorrowerSigned;
    }
    
    //Now only Borrower Loans.
    event loanRequest(
        uint id,
        uint amount,
        uint months,
        uint interest,
        string planId,
        LoanState state,
        
        address borrower,
        
        bool bankApprove,
        bool isBorrowerSigned
    );
    
    address public admin;
    UserIdentity public identitySC;
    MicroToken public tokenSC;  
    CarRental public carRentalSC;
    Loan[] public loans;
    
    // identitySC and tokenSC are default the bank address. 
    // carCompanyAddress is the address of the car company (normally not the bank).
    constructor (address userIdentityContractAddress, address microTokenContractAddress) {
        admin = msg.sender; // Ganache Account 1, the Bank
        // The bank is also the UserIdentity administrator
        identitySC = UserIdentity(userIdentityContractAddress);
        tokenSC = MicroToken(microTokenContractAddress);
        //require(identitySC.admin == admin, "User Identity Admin must be the same as the bank admin!");
        //require(tokenSC.admin == admin, "Token Admin must be the same as the bank admin!");
        
    }
    
    modifier isAdmin()
    {
        require(msg.sender == admin, "Must be Admin!");
        _;
    }



    /*
    Token Movement
     */
    // Bank transfer token as salary to the borrower, otherwise the borrower will not be able to pay the loan.
    function transferSalaryto(address _to, uint _value) public payable isAdmin() {
        tokenSC.transfer(_to, _value);
    }


    /*
        Loan
     */
    modifier isBorrower()
    {
        // Now only borrower can request loan
        require(identitySC.verifyIsBorrower(msg.sender), "Borrower Only");
        _;
    }

    modifier isLoanBorrower(uint _loanId){
        bool isValid = false;
        for(uint i=0; i< loans.length; i++)
        {
            if(loans[i].id == _loanId && loans[i].borrower == msg.sender)
            {
                isValid = true;
                break;
            }
        }
        require(isValid);
        _;
    }
    
    modifier isValidLoan(uint _loanId)
    {
        bool isValid = false;
        for(uint i=0; i< loans.length; i++)
        {
            if(loans[i].id == _loanId)
            {
                isValid = true;
                break;
            }
        }
        require(isValid);
        _;
    }
    
    modifier isLoanIn(uint _loanId, LoanState _state)
    {
        bool isValid = false;
        for(uint i=0; i< loans.length; i++)
        {
            if(loans[i].id == _loanId && loans[i].state == _state)
            {
                isValid = true;
                break;
            }
        }
        require(isValid);
        _;
    }

    function applyLoan(uint _amount, uint _months, uint _interest, string memory _planId) 
        public isBorrower()
    {
        // Borrower Loan Directly. The first status of loan is BORROWER_SIGNED
        Loan memory l = Loan(loans.length + 1, _amount, _months, _interest, _planId, LoanState.BORROWER_SIGNED, msg.sender, false, false);
        
        loans.push(l);
        
        emit loanRequest(l.id, l.amount, l.months, l.interest, l.planId,
            l.state, l.borrower, l.bankApprove, l.isBorrowerSigned );
    }

    // Borrower Loan Directly, no need to sign
    /*    
    function signByBorrower(uint _loanId) public isLoanBorrower(_loanId) isValidLoan(_loanId) isLoanIn(_loanId, LoanState.REQUESTED)
    {
        for (uint i = 0; i < loans.length; i++) {
            if (loans[i].id == _loanId) {
                loans[i].isBorrowerSigned = true;
                loans[i].state = LoanState.BORROWER_SIGNED;
                break;
            }
        }
    }
    */
    
    function approveLoan(uint _loanId) payable public isAdmin() isValidLoan(_loanId) isLoanIn(_loanId, LoanState.BORROWER_SIGNED)
    {
        for (uint i = 0; i < loans.length; i++) {
            if (loans[i].id == _loanId) {
                loans[i].bankApprove = true;
                loans[i].state = LoanState.BANK_APPROVED;
                break;
            }
        }
    }
    
    function rejectLoan(uint _loanId) public isAdmin() isValidLoan(_loanId) isLoanIn(_loanId, LoanState.BORROWER_SIGNED)
    {
        for (uint i = 0; i < loans.length; i++) {
            if (loans[i].id == _loanId) {
                loans[i].bankApprove = false;
                loans[i].state = LoanState.BANK_REJECTED;
                break;
            }
        }
    }

    
    function confirmTokenTrasferToBorrower(uint _loanId) public isAdmin() isValidLoan(_loanId) isLoanIn(_loanId, LoanState.BANK_APPROVED)
    {
        for (uint i = 0; i < loans.length; i++) {
            if (loans[i].id == _loanId) {

                if (tokenSC.transferFrom(msg.sender, loans[i].borrower, loans[i].amount)) {
                    loans[i].state = LoanState.ONGOING;
                }

                break;
            }
        }
    }
    
    function closeLoan(uint _loanId) public isAdmin() isValidLoan(_loanId) isLoanIn(_loanId, LoanState.ONGOING)
    {
        
        for (uint i = 0; i < loans.length; i++) {
            if (loans[i].id == _loanId) {
                // borrower can return money to cloase the loan, or bank can let the borrower return money to close the loan
                require(loans[i].borrower == msg.sender || admin == msg.sender, "Must be the borrower of this loan or the bank admin.");
                if (tokenSC.transferFrom(loans[i].borrower, admin, loans[i].amount + loans[i].interest * loans[i].months)) {
                    loans[i].state = LoanState.CLOSE;
                }

                break;
            }
        }
    }
    
    function markAsDefaulted(uint _loanId) public isAdmin() isValidLoan(_loanId) isLoanIn(_loanId, LoanState.ONGOING)
    {
        for (uint i = 0; i < loans.length; i++) {
            if (loans[i].id == _loanId) {
                loans[i].state = LoanState.DEFAULT;
                break;
            }
        }
    }

    function viewLoan(uint _loanId) public view returns(Loan memory loan)
    {
        for (uint i = 0; i < loans.length; i++) {
            if (loans[i].id == _loanId) {
                return (loans[i]);
            }
        }
    }
    
    function getLoans() public view returns(Loan [] memory)
    {
        return loans;
    }  
}
