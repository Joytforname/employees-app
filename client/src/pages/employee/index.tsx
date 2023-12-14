import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
	useGetEmployeeQuery,
	useRemoveEmployeeMutation,
} from '../../app/services/employees';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import Layout from '../../components/layout';
import { Descriptions, Divider, Modal, Space } from 'antd';
import CustomButton from '../../components/custom-button';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ErrorMessage from '../../components/error-message';
import { Paths } from '../../paths';
import { isErrorWithMessage } from '../../utils/is-error-with-message';

const Employee = () => {
	const navigate = useNavigate();
	const [error, setError] = useState('');
	const params = useParams<{ id: string }>();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { data, isLoading } = useGetEmployeeQuery(params.id || '');
	const [removeEmployee] = useRemoveEmployeeMutation();
	const user = useSelector(selectUser);
	if (isLoading) {
		return <span>Loading</span>;
	}
	if (!data) {
		return <Navigate to='/' />;
	}

	const modalSwitch = () => {
		return isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
	};

	const handleDeleteUser = async () => {
		modalSwitch();
		try {
			await removeEmployee(data.id).unwrap();
			navigate(`${Paths.status}/deleted`);
		} catch (err) {
			const mbErr = isErrorWithMessage(err);
			if (mbErr) {
				setError(err.data.message);
			} else {
				setError('Что-то пошло не так');
			}
		}
	};
	return (
		<Layout>
			<Descriptions title='Данные сотрудника' bordered={true}>
				<Descriptions.Item
					label='Имя'
					span={3}
				>{`${data.firstName} ${data.lastName}`}</Descriptions.Item>
				<Descriptions.Item label='Возраст' span={3}>
					{data.age}
				</Descriptions.Item>
				<Descriptions.Item label='Адрес' span={3}>
					{data.address}
				</Descriptions.Item>
			</Descriptions>
			{user?.id === data.userId && (
				<>
					<Divider orientation='left'>Действия</Divider>
					<Space>
						<Link to={`/employee/edit/${data.id}`}>
							<CustomButton
								shape='round'
								type='default'
								icon={<EditOutlined />}
							>
								Редактировать
							</CustomButton>
						</Link>
						<CustomButton
							shape='round'
							danger
							onClick={modalSwitch}
							icon={<DeleteOutlined />}
						>
							Удалить
						</CustomButton>
					</Space>
				</>
			)}
			<ErrorMessage message={error} />
			<Modal
				title='Подтвердите действие'
				open={isModalOpen}
				onOk={handleDeleteUser}
				onCancel={modalSwitch}
				okText='Подтвердить'
				cancelText='Отменить'
			>
				Вы действительно хотите удалить сотрудника?
			</Modal>
		</Layout>
	);
};

export default Employee;
