import React, { useState, useContext, useEffect } from 'react';
import {Table, Card, Form, Input, Button, message } from 'antd';
import SmartContractContext from '../../stores/smartContractContext';

function RentForm() {
	const { CarContract } = useContext(SmartContractContext); 

	const createRentRequest = async (values) => {
		try {
			const accounts = await window.ethereum.enable(); // Get the selected account from the metamask plugin.

			await createRentRequest.methods.customerRentCar(
				values.carName,
				values.rentDay,

			).send({ from: accounts[0] }); // Meta mask will return the selected account as an array. This array contains only one account address.
			message.success('New rent requested successfully');
		} catch (err) {
			console.log(err);
			message.error('Error creating rent request');
		}
	};

	return (
		<Card title="Rent Car Form">
			<Form
				labelCol={{ lg: 3, xl: 2, xxl: 3 }}
				wrapperCol={{ lg: 14, xl: 12, xxl: 10 }}
				layout="horizontal"
				size="default"
				labelAlign="left"
				onFinish={createRentRequest} 
			>
				{/* Name property value(amount) will use to capture the Input field value when submit the form */}
				<Form.Item label="carName" name="carName" rules={[{ required: true, message: 'Please enter car name!' }]}>
					<Input
						style={{ width: '100%' }}
						placeholder="Enter car name"
					/>
				</Form.Item>
				
				<Form.Item label="rentDay" name="rentDay" rules={[{ required: true, message: 'Please enter rent day!' }]}>
					<InputNumber
						min="0"
						style={{ width: '100%' }}
						placeholder="Enter rent day rate"
					/>
				</Form.Item>

				
				<Form.Item wrapperCol={{
					lg: { span: 14, offset: 3 },
					xl: { span: 14, offset: 2 },
					xxl: { span: 14, offset: 3 } }}
				>
					{/* Form submit button */}
					<Button type="primary" htmlType="submit">Request Loan</Button>
				</Form.Item>
			</Form>
		</Card>
	);
}

export default RentForm;