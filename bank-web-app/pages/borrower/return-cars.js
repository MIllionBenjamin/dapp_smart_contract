import React from 'react';
import { Row, Col } from 'antd';
import ReturnCarForm from '../../components/carManagement/ReturnCarForm';


function ReturnCars() {
	return (
		<>
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<ReturnCarForm />
				</Col>
			</Row>
		</>
	);
}

export default ReturnCars;