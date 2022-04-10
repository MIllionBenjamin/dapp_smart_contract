import React from 'react';
import { Row, Col } from 'antd';
import GetBalanceForm from '../../components/transfer/GetBalanceForm';

// React coponent to render Broker creation form.
function GetBalance() {
	return (
		<Row gutter={[16, 16]}>
			<Col span={24}>
				<GetBalanceForm />
			</Col>
		</Row>
	);
}

export default GetBalance;
