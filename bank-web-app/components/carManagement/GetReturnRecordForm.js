import React, { useState, useContext, useEffect } from 'react';
import {Table, Card, Form, Input, Button, message } from 'antd';
import SmartContractContext from '../../stores/smartContractContext';


// React functional component for Get Car form.
function GetReturnReocrd() {
	const [form] = Form.useForm();

	const { CarRentalSmartContractContract } = useContext(SmartContractContext); // Get CarRentalSmartContract contract instance defined in the smartContractContext.

	// Get new borrower entry in to the User Identity smart contract.
	// values parameter contains the submitted form field values and captured using their names later.
	const getReturnRecord = async (values) => {
		try {
			const accounts = await window.ethereum.enable(); // Get the selected account from the metamask plugin.
			// Call the getBorrower method of the User Identity contract.
			// SocialSecurityID, wallter getress, user name will pass as parameters to the functions.
			// Smart contract function will call using selected account from the metamask.
			let getResult = await CarRentalSmartContractContract.methods.getCustomerReturnCarRecord(values.returnId).call();
			console.log(getResult);
			alert(JSON.stringify({"returnRecordId": getResult[0],
					"rentRecordId": getResult[1],
				"carName": getResult[3],
                "returnTimeStamp": getResult[4],
                "rentFee": getResult[5]}));
			message.success('successfully!');
		} catch (err) {
			message.error('Error occured while geting Car!');
			console.log(err);
		}
	};

	return (

		<Card title="Get Returned Record Form">
			<Form
				form={form}
				labelCol={{ lg: 4, xl: 3, xxl: 2 }}
				wrapperCol={{ lg: 16, xl: 14, xxl: 10 }}
				layout="horizontal"
				size="default"
				labelAlign="left"
				onFinish={getReturnRecord} // createBorrower function will execute when user submits the form. Form field values will pass as a parameter to the function.
			>
				{/* name property will use to capture the form filed values when user submits the form */}
				<Form.Item label="returnId" name="returnId" rules={[{ required: true, message: 'Please input returnId!' }]}>
					<Input
						style={{ width: '100%' }}
						placeholder="Enter returnId"
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

export default GetReturnReocrd;
