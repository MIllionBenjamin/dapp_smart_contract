import React from 'react';
import { Row, Col } from 'antd';
import GetdepositrecordForm from '../../components/carManagement/Getdepositrecord';

// React coponent to render Broker creation form.
function Getdeposit() {
	return (
		<Row gutter={[16, 16]}>
			<Col span={24}>
				<GetdepositrecordForm/>
			</Col>
		</Row>
	);
}

export default Getdeposit;
