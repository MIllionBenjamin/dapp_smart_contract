import React from 'react';
import { Row, Col } from 'antd';
import GetRentRecordForm from '../../components/carManagement/GetRentRecordForm';

// React coponent to render Broker creation form.
function GetRentRecord() {
	return (
		<Row gutter={[16, 16]}>
			<Col span={24}>
				<GetRentRecordForm />
			</Col>
		</Row>
	);
}

export default GetRentRecord;
