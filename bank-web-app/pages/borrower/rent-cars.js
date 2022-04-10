import React from 'react';
import { Row, Col } from 'antd';
import RentForm from '../../components/carManagement/RentForm';


function RentCars() {
	return (
		<>
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<RentForm />
				</Col>
			</Row>
		</>
	);
}

export default RentCars;