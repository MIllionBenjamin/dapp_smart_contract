import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Create context and set default values.
const UserContext = createContext({
	user: null,
	login: () => {},
});

export const UserContextProvider = ({ children }) => {
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
		}, 
		{
			name: 'Guest',
			role: 'public',
			color: '#8193E7',
		},
	];

	const [user, setUser] = useState(users[1]);

	const router = useRouter();

	useEffect(() => {
		// Router will update according to the selected user role.
		if (user.role === 'bank') {
			router.push('/common/loans');
		} else if (user.role === 'borrower') {
			router.push('/borrower/apply-loans');
		} else if (user.role === 'carCompany') {
			router.push('/carCompany/add-car');
		}
	}, [user]); // useEffect will execute when user context value changes.

	const login = (role) => {
		if (role === 'bank') {
			setUser(users[1]);
		} else if (role === 'borrower') {
			setUser(users[2]);
		} else if (role === 'carCompany') {
			setUser(users[3]);
		}
	};

	const context = { user, login };

	return (
		<UserContext.Provider value={context}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;
