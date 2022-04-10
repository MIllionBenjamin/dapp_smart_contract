import React from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';

import { useRouter } from 'next/router';

// Menu for Borrowers
function BorrowerMenu() {
	const router = useRouter();

	return (
		<Menu
			mode="inline"
			defaultSelectedKeys={['/transfer']}
			style={{ height: '100%', borderRight: 0 }}
		>
			<Menu.Item key="/apply-loans" onClick={() => router.push('/borrower/apply-loans')}>
				Apply Loan
			</Menu.Item>
			<Menu.Item key="/loans" onClick={() => router.push('/common/loans')}>
				Loans
			</Menu.Item>

			<Menu.Item key="/balance" onClick={() => router.push('/common/balance')}>
				Balance
			</Menu.Item>

			<Menu.Item key="/rent-cars" onClick={() => router.push('/borrower/rent-cars')}>
				Rent Cars
			</Menu.Item>
			
			<Menu.Item key="/return-cars" onClick={() => router.push('/borrower/return-cars')}>
				Return Cars
			</Menu.Item>


			<Menu.Item key="/rent-record" onClick={() => router.push('/common/rentRecords')}>
				Rent Record
			</Menu.Item>

			<Menu.Item key="/return-record" onClick={() => router.push('/common/return-record')}>
				Return Record
			</Menu.Item>

			<Menu.Item key="/audit-record" onClick={() => router.push('/common/deposit-record')}>
				Audit Record
			</Menu.Item>

			<Menu.Item key="/car-info" onClick={() => router.push('/common/cars')}>
				Car Info
			</Menu.Item>

			<Menu.Item key="/info" onClick={() => router.push('/common/info')}>
				Info
			</Menu.Item>
		</Menu>
	);
}

export default BorrowerMenu;
