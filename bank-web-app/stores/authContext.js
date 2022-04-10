import React, { createContext, useState } from 'react';

import Web3 from 'web3';
import MicroTokenArtifact from '../../blockchain/build/contracts/MicroToken.json';
import BankLoanArtifact from '../../blockchain/build/contracts/BankLoan.json';
import UserIdentityArtifact from '../../blockchain/build/contracts/UserIdentity.json';
import CarRentalSmartContractArtifact from '../../blockchain/build/contracts/CarRentalSmartContract.json';


const AuthContext = createContext({
	user: null,
	userRole: null,
	login: () => {},
});

export const AuthContextProvider = ({ children }) => {
	const users = [
		{
			name: 'Leonard Hofstadter',
			role: 'broker',
			color: '#87d068',
		},
		{
			name: 'Sheldon Cooper',
			role: 'bank',
			color: '#8193E7',
		},
		{
			name: 'Rajesh Koothrapali',
			role: 'borrower',
			color: '#80e5a3',
		},
		{
			name: 'ABCCompany',
			role: 'carCompany',
			color: '#e5809b',
		}
	];

	const [user, setUser] = useState(users[0]);

	const login = (role) => {
		if (role === 'bank') {
			setUser(users[1]);
		} else if (role === 'borrower') {
			setUser(users[2]);
		}
		else if (role === 'carCompany') {
			setUser(users[3]);
		}
	};
	const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545');

	// Smart Contract Addresses
	const microTokenAddress = MicroTokenArtifact.networks[5777].address;
	const userIdentityAddress = UserIdentityArtifact.networks[5777].address;
	const bankLoanAddress = BankLoanArtifact.networks[5777].address;
	const carRentalSmartContractAddress = CarRentalSmartContractArtifact.networks[5777].address;

	const UserIdentity = new web3.eth.Contract(UserIdentityArtifact.abi, userIdentityAddress);
	const MicroToken = new web3.eth.Contract(MicroTokenArtifact.abi, microTokenAddress);
	const BankLoan = new web3.eth.Contract(BankLoanArtifact.abi, bankLoanAddress);
	const CarRentalSmartContract = new web3.eth.Contract(CarRentalSmartContractArtifact.abi, carRentalSmartContractAddress);

	const context = { user, login, web3, MicroToken, UserIdentity, BankLoan, CarRentalSmartContract };

	return (
		<AuthContext.Provider value={context}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
