import React from 'react';
import { Row, Col } from 'antd';
import GetCarForm from '../../components/carManagement/GetCarForm';

// React coponent to render Broker creation form.
function GetCar() {
	return (
		<Row gutter={[16, 16]}>
			<Col span={24}>
				<GetCarForm />
			</Col>
		</Row>
	);
}

export default GetCar;
