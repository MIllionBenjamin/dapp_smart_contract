import React, { useState, useContext, useEffect } from 'react';
import {Table, Card, Form, Input, Button, message } from 'antd';
import SmartContractContext from '../../stores/smartContractContext';


// React functional component for Get Car form.
function GetCarForm() {
	const [form] = Form.useForm();

	const { CarRentalSmartContractContract } = useContext(SmartContractContext); // Get CarRentalSmartContract contract instance defined in the smartContractContext.

	// Get new borrower entry in to the User Identity smart contract.
	// values parameter contains the submitted form field values and captured using their names later.
	const getCar = async (values) => {
		try {
			const accounts = await window.ethereum.enable(); // Get the selected account from the metamask plugin.
			// Call the getBorrower method of the User Identity contract.
			// SocialSecurityID, wallter getress, user name will pass as parameters to the functions.
			// Smart contract function will call using selected account from the metamask.
			let getResult = await CarRentalSmartContractContract.methods.getCarInfo(values.carName).call();
			console.log(getResult);
			alert(JSON.stringify({"carName": getResult[0],
					"needDeposit": getResult[1],
				"dailyRent": getResult[2]}));
			message.success('Car is get successfully!');
		} catch (err) {
			message.error('Error occured while geting Car!');
			console.log(err);
		}
	};

	return (

		<Card title="Get Car Form">
			<Form
				form={form}
				labelCol={{ lg: 4, xl: 3, xxl: 2 }}
				wrapperCol={{ lg: 16, xl: 14, xxl: 10 }}
				layout="horizontal"
				size="default"
				labelAlign="left"
				onFinish={getCar} // createBorrower function will execute when user submits the form. Form field values will pass as a parameter to the function.
			>
				{/* name property will use to capture the form filed values when user submits the form */}
				<Form.Item label="Car Name" name="carName" rules={[{ required: true, message: 'Please input Car Name!' }]}>
					<Input
						style={{ width: '100%' }}
						placeholder="Enter Car Name"
					/>
				</Form.Item>
				
				<Form.Item wrapperCol={{
					lg: { span: 14, offset: 4 },
					xl: { span: 14, offset: 3 },
					xxl: { span: 14, offset: 2 } }}
				>
					{/* Form submit button */}
					<Button type="primary" htmlType="submit">Get Car</Button>
				</Form.Item>
			</Form>
		</Card>

		
	);
}

export default GetCarForm;
