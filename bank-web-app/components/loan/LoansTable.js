import React, { useState, useContext, useEffect } from 'react';
import { Table, Tag, Card, message, Modal, Form, Space, Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import UserContext from '../../stores/userContext';
import SmartContractContext from '../../stores/smartContractContext';

function LoansTable() {
	// Following properties will captured from userContext and smartContractContext.
	// user - selected user role form the top right corner of the bank web app.
	// Smart contract instances - Micro Token, Bank Loan and User Identity.
	const { user } = useContext(UserContext);
	const { MicroTokenContract, BankLoanContract, UserIdentityContract } = useContext(SmartContractContext);

	const { confirm } = Modal;

	// Define Bank Loan states.
	// These states should be in order as defined in the Bank Loan smart contract.
	const state = ['BORROWER_SIGNED', 'BANK_APPROVED', 'BANK_REJECTED', 'ONGOING',
		'DEFAULT', 'CLOSE'];

	//const [isBrokerTransferModalVisible, setIsBrokerTransferModalVisible] = useState(false);
	const [isBorrowerTransferModalVisible, setIsBorrowerTransferModalVisible] = useState(false);
	const [loanRecord, setLoanRecord] = useState({});
	const [tokenTransferStep, setTokenTransferStep] = useState(0);
	const [payments, setPayments] = useState([]);
	const [data, setData] = useState([]);

	const borrowers = {};


	const getBorrowers = async () => {
		const response = await UserIdentityContract.methods.getAllBorrowers().call();
		for (let i = 0; i < response.length; i++) {
			borrowers[response[i].walletAddress] = response[i].name;
		}
	};



	const getLoans = async () => {
		try {
			const response = await BankLoanContract.methods.getLoans().call();

			setData([]);

			console.log(response)
			for (let i = 0; i < response.length; i++) {
				const row = {
					//key: response[i].id,
					id: response[i].id,
					amount: response[i].amount,
					period: response[i].months,
					interest: response[i].interest,
					planId: response[i].planId,
					//borrowerName: borrowers[response[i].borrower],
					borrower: response[i].borrower,
					status: response[i].state,
					bankApprove: response[i].bankApprove,
					isBorrowerSigned: response[i].isBorrowerSigned,
				};

				setData((prev) => {
					return [...prev, row];
				});
			}
		} catch (err) {
			console.log(err);
			message.error('Error occured while loading current Loans');
		}
	};

	const loadData = async () => {
		await getBorrowers();
		await getLoans();
	};



	/*
	const confirmTokenTrasferToBorrower = async (loanId) => {
		try {
			const accounts = await window.ethereum.enable();
			await BankLoanContract.methods.confirmTokenTrasferToBorrower(loanId).send({ from: accounts[0] });
			message.success(`Loan ${loanId} updated`);
			loadData();
		} catch (err) {
			console.log(err);
			message.error('Error occured while updating Loan');
		}
	};
	*/
	const transferTokensToBorrower = async () => {
		try {
			const accounts = await window.ethereum.enable();
			await setTokenTransferStep(1);
			await BankLoanContract.methods.confirmTokenTrasferToBorrower(loanRecord.id).send({
				from: accounts[0] });
			message.success("Loan " + loanRecord.id + " updated");
			message.success('Token transferred successfully');
			
			
			//await confirmTokenTrasferToBorrower(loanRecord.id);
			await setTokenTransferStep(0);
			await setIsBorrowerTransferModalVisible(false);
		} catch (err) {
			console.log(err);
			await setTokenTransferStep(0);
			message.error('Error occured while transferring tokens');
		}
	};

	const approveLoan = async (loanId) => {
		try {
			const accounts = await window.ethereum.enable();
			await BankLoanContract.methods.approveLoan(loanId).send({ from: accounts[0] });
			message.success(`Loan ${loanId} approved`);
			loadData();
		} catch (err) {
			message.error('Error occured while approving the Loan');
		}
	};

	const confirmLoanApprove = (loanId) => {
		confirm({
			content: `Approve Loan ${loanId} ?`,
			okText: 'Approve Loan',
			onOk: () => approveLoan(loanId),
		});
	};

	const rejectLoan = async (loanId) => {
		try {
			const accounts = await window.ethereum.enable();
			await BankLoanContract.methods.rejectLoan(loanId).send({ from: accounts[0] });
			message.success(`Loan ${loanId} rejected`);
			loadData();
		} catch (err) {
			message.error('Error occured while rejecting the Loan');
		}
	};

	const confirmLoanReject = (loanId) => {
		confirm({
			icon: <CloseCircleOutlined style={{ color: 'red' }} />,
			content: `Reject Loan ${loanId} ?`,
			okText: 'Reject Loan',
			okButtonProps: {
				type: 'danger',
			},
			onOk: () => rejectLoan(loanId),
		});
	};

	const signLoan = async (loanId) => {
		try {
			const accounts = await window.ethereum.enable();
			await BankLoanContract.methods.signByBorrower(loanId).send({ from: accounts[0] });
			message.success(`Loan ${loanId} signed`);
			loadData();
		} catch (err) {
			console.log(err);
			message.error('Error occured while signing Loan');
		}
	};

	const closeLoan = async (loanId) => {
		try {
			const accounts = await window.ethereum.enable();
			await BankLoanContract.methods.closeLoan(loanId).send({ from: accounts[0] });
			message.success(`Loan ${loanId} updated`);
			loadData();
		} catch (err) {
			console.log(err);
			message.error('Error occured while updating Loan');
		}
	};

	const markAsDefaulted = async (loanId) => {
		try {
			const accounts = await window.ethereum.enable();
			await BankLoanContract.methods.markAsDefaulted(loanId).send({ from: accounts[0] });
			message.success(`Loan ${loanId} updated`);
			loadData();
		} catch (err) {
			console.log(err);
			message.error('Error occured while updating Loan');
		}
	};

	


	const showBorrowerTransferModal = (row) => {
		setLoanRecord(row);
		setIsBorrowerTransferModalVisible(true);
	};

	const handleCancel = () => {
		setIsBorrowerTransferModalVisible(false);
	};

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
		},
		{
			title: 'Amount',
			dataIndex: 'amount',
		},
		{
			title: 'Period',
			dataIndex: 'period',
		},
		{
			title: 'Interest %',
			dataIndex: 'interest',
		},
		{
			title: 'Plan ID',
			dataIndex: 'planId',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			render: tag => {
				let color = 'geekblue';
				if (tag === '2' || tag === '4') {
					color = 'red';
				} else if (tag === '1' || tag === '3') {
					color = 'green';
				}
				console.log(tag)
				return (
					<Tag color={color} key={tag}>
						{state[parseInt(tag)]}
					</Tag>
				);
			},
		},
	];
	console.log(user.role)
	if (user.role === 'bank') {
		
		columns.push({
			title: 'Action',
			dataIndex: '',
			render: (record) => {
				let actionBlock = '';
				console.log(record.status)
				if (record.status === '0') {
					actionBlock =
						<Space>
							<Button type="primary" ghost onClick={() => confirmLoanApprove(record.id)}> Approve </Button>
							<Button type="primary" danger ghost onClick={() => confirmLoanReject(record.id)}> Reject </Button>
						</Space>;
				} else if (record.status === '1') {
					actionBlock =
						<Button type="primary" ghost onClick={() => showBorrowerTransferModal(record)}>
							Transfer Tokens to Borrower
						</Button>;
				} else if (record.status === '3') {
					actionBlock =
						<Space>
							<Button type="primary" ghost onClick={() => closeLoan(record.id)}> Close </Button>
							<Button type="primary" danger ghost onClick={() => markAsDefaulted(record.id)}> Defaulted </Button>
						</Space>;
				}
				return actionBlock;
			},
		});
	}

	useEffect(() => {
		loadData();
		const emitter = BankLoanContract.events.loanRequest({ fromBlock: 'latest' }, (error, response) => {
			const result = response.returnValues;

			const row = {
				id: result.id,
				amount: result.amount,
				period: result.months,
				interest: result.interest,
				planId: result.planId,
				status: result.state,

				borrower: result.borrower,



				
			};

			setData((prev) => {
				return [...prev, row];
			});
		});

		return () => {
			emitter.unsubscribe();
		};
	}, []);

	const expandedRowRender = (record) => {
		const expandedPayments = payments.filter(item => item.loanId == record.id);

		const expandedPaymentColumns = [
			{ title: 'Payment ID', dataIndex: '_id' },
			{ title: 'Amount', dataIndex: 'amount' },
			{ title: 'Transaction Hash', dataIndex: 'transactionHash' },
		];

		return (
			<>
				<Form
					labelCol={{
						lg: 6,
						xl: 6,
						xxl: 3,
					}}
					wrapperCol={{
						lg: 12,
						xl: 12,
						xxl: 16,
					}}
					layout="horizontal"
					size="default"
					labelAlign="left"
				>
					<Form.Item label="Borrower Address" style={{ marginBottom: '0px' }}>
						<span>{record.borrower}</span>
					</Form.Item>

				</Form>
				<Table
					columns={expandedPaymentColumns}
					dataSource={expandedPayments}
					pagination={false}
				/>
			</>
		);
	};

	return (
		<>
			<Card title="Loans">
				<Table
					pagination="true"
					columns={columns}
					dataSource={data}
					expandable={{
						expandedRowRender,
					}}
				/>
			</Card>
			<Modal
				title={`Transfer Tokens to Broker - Loan Id ${loanRecord.id}`}
				width={700}
				onCancel={handleCancel}
				footer={null}
			>
				
				{
					tokenTransferStep === 1 &&
					<span>Updating the Loan State</span>
				}
			</Modal>
			<Modal
				title={`Transfer Tokens to Borrower - Loan Id ${loanRecord.id}`}
				visible={isBorrowerTransferModalVisible}
				width={700}
				onCancel={handleCancel}
				footer={null}
			>
				{
					tokenTransferStep === 0 &&
					<Form
						labelCol={{
							lg: 6,
							xl: 5,
							xxl: 5,
						}}
						wrapperCol={{
							lg: 20,
							xl: 20,
							xxl: 20,
						}}
						layout="horizontal"
						size="default"
						labelAlign="left"
						onFinish={transferTokensToBorrower}
					>
						<Form.Item label="Borrower Name" style={{ marginBottom: '0px' }}>
							<span> { loanRecord.borrowerName } </span>
						</Form.Item>
						<Form.Item label="Borrower Address" style={{ marginBottom: '0px' }}>
							<span> { loanRecord.borrower } </span>
						</Form.Item>
						<Form.Item label="Amount">
							<span> { loanRecord.amount } </span>
						</Form.Item>
						<Form.Item wrapperCol={{
							lg: { span: 14, offset: 6 },
							xl: { span: 14, offset: 5 },
							xxl: { span: 14, offset: 5 } }}
						>
							<Space direction="horizontal">
								<Button onClick={() => handleCancel()}>Cancel</Button>
								<Button type="primary" htmlType="submit">Transfer Tokens</Button>
							</Space>
						</Form.Item>
					</Form>
				}
				{
					tokenTransferStep === 1 &&
					<span>Updating the Loan State</span>
				}
			</Modal>
		</>
	);
}

export default LoansTable;
