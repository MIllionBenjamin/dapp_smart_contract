import React, { useContext } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import SmartContractContext from '../../stores/smartContractContext';

// React functional component for Add Car form.
function AddCarForm() {
	const [form] = Form.useForm();

	const { CarRentalSmartContractContract } = useContext(SmartContractContext); // Get CarRentalSmartContract contract instance defined in the smartContractContext.

	// Add new borrower entry in to the User Identity smart contract.
	// values parameter contains the submitted form field values and captured using their names later.
	const addCar = async (values) => {
		try {
			const accounts = await window.ethereum.enable(); // Get the selected account from the metamask plugin.
			// Call the addBorrower method of the User Identity contract.
			// SocialSecurityID, wallter address, user name will pass as parameters to the functions.
			// Smart contract function will call using selected account from the metamask.
			await CarRentalSmartContractContract.methods.ABCAddCar(values.carName, values.carDailyRent, values.number).send({ from: accounts[0] });
			message.success('Car is added successfully!');
		} catch (err) {
			message.error('Error occured while adding Car!');
			console.log(err);
		}
	};

	return (

		<Card title="Add Car Form">
			<Form
				form={form}
				labelCol={{ lg: 4, xl: 3, xxl: 2 }}
				wrapperCol={{ lg: 16, xl: 14, xxl: 10 }}
				layout="horizontal"
				size="default"
				labelAlign="left"
				onFinish={addCar} // createBorrower function will execute when user submits the form. Form field values will pass as a parameter to the function.
			>
				{/* name property will use to capture the form filed values when user submits the form */}
				<Form.Item label="Car Name" name="carName" rules={[{ required: true, message: 'Please input Car Name!' }]}>
					<Input
						style={{ width: '100%' }}
						placeholder="Enter Car Name"
					/>
				</Form.Item>
				<Form.Item label="Car DailyRent" name="carDailyRent" rules={[{ required: true, message: 'Please input Car DailyRent!' }]}>
					<Input
						style={{ width: '100%' }}
						placeholder="Enter Car Daily Rent"
					/>
				</Form.Item>
				<Form.Item label="Car Number" name="number" rules={[{ required: true, message: 'Please input Car Number!' }]}>
					<Input
						style={{ width: '100%' }}
						placeholder="Enter Car Number"
					/>
				</Form.Item>
				<Form.Item wrapperCol={{
					lg: { span: 14, offset: 4 },
					xl: { span: 14, offset: 3 },
					xxl: { span: 14, offset: 2 } }}
				>
					{/* Form submit button */}
					<Button type="primary" htmlType="submit">Add Car</Button>
				</Form.Item>
			</Form>
		</Card>
	);
}

export default AddCarForm;
