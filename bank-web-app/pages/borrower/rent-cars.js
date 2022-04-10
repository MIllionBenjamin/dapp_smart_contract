import React from 'react';
import { Row, Col } from 'antd';
import RentCarForm from '../../components/carManagement/RentCarForm';


function RentCars() {
	return (
		<>
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<RentCarForm />
				</Col>
			</Row>
		</>
	);
}

export default RentCars;