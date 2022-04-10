import React from 'react';
import { Row, Col } from 'antd';
import AddCarForm from '../../components/carManagement/AddCarForm';

// React coponent to render Broker creation form.
function AddCar() {
	return (
		<Row gutter={[16, 16]}>
			<Col span={24}>
				<AddCarForm />
			</Col>
		</Row>
	);
}

export default AddCar;
