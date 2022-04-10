import React from 'react';
import { Row, Col } from 'antd';
import ReturnForm from '../../components/carManagement/ReturnForm';


function ReturnCars() {
	return (
		<>
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<ReturnForm />
				</Col>
			</Row>
		</>
	);
}

export default ReturnCars;