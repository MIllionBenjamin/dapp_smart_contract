import React from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';

import { useRouter } from 'next/router';

// Menu for the Bank users. These menu items will be displayed on the left panel for the Bank users.
// Routing handles through the Next.js.
// When user clicks on a menu item it will load the component in to the browser.
// router.push(<path to the component resides in the pages directory>)
function BankMenu() {
	const router = useRouter();
	const { SubMenu } = Menu;

	return (
		<Menu
			mode="inline"
			defaultSelectedKeys={['/bank-loans']}
			style={{ height: '100%', borderRight: 0 }}
		>
			{/* When clicks the Loans menu item it will load the component placed inside the 'pages/common/loans' javascript file. */}
			<Menu.Item key="/bank-loans" onClick={() => router.push('/common/loans')}>
				Loans
			</Menu.Item>

			<SubMenu key="/borrowers" title="Borrowers">
				<Menu.Item key="/add-borrowers" onClick={() => router.push('/bank/add-borrowers')}>Add Borrower</Menu.Item>
				<Menu.Item key="/view-borrowers" onClick={() => router.push('/bank/view-borrowers')}>View Borrowers</Menu.Item>
			</SubMenu>


			<Menu.Item key="/balance" onClick={() => router.push('/common/balance')}>
				Balance
			</Menu.Item>

			<Menu.Item key="/transfer" onClick={() => router.push('/common/transfer')}>
				Transfer
			</Menu.Item>
			<Menu.Item key="/info" onClick={() => router.push('/common/info')}>
				Info
			</Menu.Item>
		</Menu>
	);
}

export default BankMenu;
