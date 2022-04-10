import React from 'react';
import { Row, Col } from 'antd';
import GetReturnReocrd from '../../components/carManagement/GetReturnRecordForm';

// React coponent to render Broker creation form.
function GetReturnReocrd() {
	return (
		<Row gutter={[16, 16]}>
			<Col span={24}>
				<GetReturnReocrd />
			</Col>
		</Row>
	);
}

export default GetReturnReocrd;