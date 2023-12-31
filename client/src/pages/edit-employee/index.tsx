import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	useEditEmployeeMutation,
	useGetEmployeeQuery,
} from '../../app/services/employees';
import Layout from '../../components/layout';
import { Row } from 'antd';
import EmployeeForm from '../../components/employee-form';
import { Employee } from '@prisma/client';
import { Paths } from '../../paths';
import { isErrorWithMessage } from '../../utils/is-error-with-message';
import Loading from '../loading';

const EditEmployee = () => {
	const navigate = useNavigate();
	const params = useParams<{ id: string }>();
	const [error, setError] = useState('');
	const { data, isLoading } = useGetEmployeeQuery(params.id || '');
	const [editEmployee] = useEditEmployeeMutation();
	const handleEditUser = async (employee: Employee) => {
		if (isLoading) {
			return <Loading/>;
		}
		try {
			const editedEmployee = {
				...data,
				...employee,
			};
			await editEmployee(editedEmployee).unwrap();
			navigate(`${Paths.status}/updated`);
		} catch (err) {
			const mbErr = isErrorWithMessage(err);
			mbErr ? setError(err.data.message) : setError('Что-то пошло не так');
		}
	};
	return (
		<Layout>
			<Row align='middle' justify='center'>
				<EmployeeForm
					title='Редактирование данных'
					btnText='Редактировать'
					employee={data}
					error={error}
					onFinish={handleEditUser}
				/>
			</Row>
		</Layout>
	);
};

export default EditEmployee;
