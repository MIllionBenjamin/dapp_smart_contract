import React, { useState, useContext, useEffect } from 'react';
import {Table, Card, Form, Input, Button, message } from 'antd';
import SmartContractContext from '../../stores/smartContractContext';

function RentCarForm() {
	const { CarRentalSmartContractContract } = useContext(SmartContractContext); 

	const rentCar = async (values) => {
		try {
			const accounts = await window.ethereum.enable(); // Get the selected account from the metamask plugin.

			await CarRentalSmartContractContract.methods.customerRentCar(
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
				onFinish={rentCar} 
			>
				{/* Name property value(amount) will use to capture the Input field value when submit the form */}
				<Form.Item label="carName" name="carName" rules={[{ required: true, message: 'Please enter car name!' }]}>
					<Input
						style={{ width: '100%' }}
						placeholder="Enter car name"
					/>
				</Form.Item>
				
				<Form.Item label="rentDay" name="rentDay" rules={[{ required: true, message: 'Please enter rent day!' }]}>
					<Input
						min="0"
						style={{ width: '100%' }}
						placeholder="Enter rent day"
					/>
				</Form.Item>

				
				<Form.Item wrapperCol={{
					lg: { span: 14, offset: 3 },
					xl: { span: 14, offset: 2 },
					xxl: { span: 14, offset: 3 } }}
				>
					{/* Form submit button */}
					<Button type="primary" htmlType="submit">Rent Car</Button>
				</Form.Item>
			</Form>
		</Card>
	);
}

export default RentCarForm;