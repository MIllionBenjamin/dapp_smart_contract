import React, { useContext } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import SmartContractContext from '../../stores/smartContractContext';

// React functional component for Add Car form.
function AuditDepositForm() {
	const [form] = Form.useForm();

	const { CarRentalSmartContractContract } = useContext(SmartContractContext); // Get CarRentalSmartContract contract instance defined in the smartContractContext.

	// Add new borrower entry in to the User Identity smart contract.
	// values parameter contains the submitted form field values and captured using their names later.
	const auditDeposit = async (values) => {
		try {
			const accounts = await window.ethereum.enable(); // Get the selected account from the metamask plugin.
			// Call the addBorrower method of the User Identity contract.
			// SocialSecurityID, wallter address, user name will pass as parameters to the functions.
			// Smart contract function will call using selected account from the metamask.
			await CarRentalSmartContractContract.methods.ABCAuditDeposit(values.returnRecordId, values.damageFixFeeHere).send({ from: accounts[0] });
			message.success('Deposit Audited Successfully!');
		} catch (err) {
			message.error('Error occured while Auditing Deposit!');
			console.log(err);
		}
	};

	return (

		<Card title="Audit Deposit Form">
			<Form
				form={form}
				labelCol={{ lg: 4, xl: 3, xxl: 2 }}
				wrapperCol={{ lg: 16, xl: 14, xxl: 10 }}
				layout="horizontal"
				size="default"
				labelAlign="left"
				onFinish={auditDeposit} // createBorrower function will execute when user submits the form. Form field values will pass as a parameter to the function.
			>
				{/* name property will use to capture the form filed values when user submits the form */}
				<Form.Item label="Return Record ID" name="returnRecordId" rules={[{ required: true, message: 'Please input returnRecordId!' }]}>
					<Input
						style={{ width: '100%' }}
						placeholder="Enter returnRecordId"
					/>
				</Form.Item>
				<Form.Item label="Damage Fix Fee Here" name="damageFixFeeHere" rules={[{ required: true, message: 'Please input damageFixFeeHere!' }]}>
					<Input
						style={{ width: '100%' }}
						placeholder="Enter Car Daily Rent"
					/>
				</Form.Item>

				<Form.Item wrapperCol={{
					lg: { span: 14, offset: 4 },
					xl: { span: 14, offset: 3 },
					xxl: { span: 14, offset: 2 } }}
				>
					{/* Form submit button */}
					<Button type="primary" htmlType="submit">Audit Deposit</Button>
				</Form.Item>
			</Form>
		</Card>
	);
}

export default AuditDepositForm;
