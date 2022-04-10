import React, { useState, useContext, useEffect } from 'react';
import {Table, Card, Form, Input, Button, message } from 'antd';
import SmartContractContext from '../../stores/smartContractContext';


// React functional component for Get Car form.
function ReturnCarForm() {
	const [form] = Form.useForm();

	const { CarRentalSmartContractContract } = useContext(SmartContractContext); // Get CarRentalSmartContract contract instance defined in the smartContractContext.

	// Get new borrower entry in to the User Identity smart contract.
	// values parameter contains the submitted form field values and captured using their names later.
	const returnCar = async (values) => {
		try {
			const accounts = await window.ethereum.enable(); // Get the selected account from the metamask plugin.
			// Call the getBorrower method of the User Identity contract.
			// SocialSecurityID, wallter getress, user name will pass as parameters to the functions.
			// Smart contract function will call using selected account from the metamask.
			console.log(accounts)
			await CarRentalSmartContractContract.methods.customerReturnCar(values.rentId).send({ from: accounts[0] });
			console.log(accounts)
			message.success('Car is returned successfully!');
		} catch (err) {
			message.error('Error occured while returning Car!');
			console.log(err);
		}
	};

	return (

		<Card title="Return Car Form">
			<Form
				form={form}
				labelCol={{ lg: 4, xl: 3, xxl: 2 }}
				wrapperCol={{ lg: 16, xl: 14, xxl: 10 }}
				layout="horizontal"
				size="default"
				labelAlign="left"
				onFinish={returnCar} // createBorrower function will execute when user submits the form. Form field values will pass as a parameter to the function.
			>
				{/* name property will use to capture the form filed values when user submits the form */}
				<Form.Item label="rentId" name="rentId" rules={[{ required: true, message: 'Please input rent id!' }]}>
					<Input
						style={{ width: '100%' }}
						placeholder="Enter rent id"
					/>
				</Form.Item>
				
				<Form.Item wrapperCol={{
					lg: { span: 14, offset: 4 },
					xl: { span: 14, offset: 3 },
					xxl: { span: 14, offset: 2 } }}
				>
					{/* Form submit button */}
					<Button type="primary" htmlType="submit">Return Car</Button>
				</Form.Item>
			</Form>
		</Card>

		
	);
}

export default ReturnCarForm;
