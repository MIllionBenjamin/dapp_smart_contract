import React from 'react';
import { Row, Col } from 'antd';
import LoanForm from '../../components/loan/LoanForm';

// React functional component display loan application form and loan plans table
function ApplyLoans() {
	return (
		<>
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<LoanForm />
				</Col>
			</Row>
		</>
	);
}

export default ApplyLoans;
