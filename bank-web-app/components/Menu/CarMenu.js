import React from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';

import { useRouter } from 'next/router';

// Menu for the Car users. These menu items will be displayed on the left panel for the Car users.
// Routing handles through the Next.js.
// When user clicks on a menu item it will load the component in to the browser.
// router.push(<path to the component resides in the pages directory>)
function CarMenu() {
	const router = useRouter();
	const { SubMenu } = Menu;

	return (
		<Menu
			mode="inline"
			defaultSelectedKeys={['/add-car']}
			style={{ height: '100%', borderRight: 0 }}
		>
			{/* When clicks the Loans menu item it will load the component placed inside the 'pages/common/loans' javascript file. */}
			<Menu.Item key="/add-car" onClick={() => router.push('/carCompany/add-car')}>
				Add Car
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

export default CarMenu;
