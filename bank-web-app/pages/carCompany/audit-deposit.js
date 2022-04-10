import React from 'react';
import { Row, Col } from 'antd';
import AuditDepositForm from '../../components/carManagement/AuditDepositForm';

// React coponent to render Broker creation form.
function AuditDeposit() {
	return (
		<Row gutter={[16, 16]}>
			<Col span={24}>
				<AuditDepositForm />
			</Col>
		</Row>
	);
}

export default AuditDeposit;
