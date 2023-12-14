import { Row } from 'antd';
import Layout from '../../components/layout';
import EmployeeForm from '../../components/employee-form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import { useAddEmployeeMutation } from '../../app/services/employees';
import { Employee } from '@prisma/client';
import { Paths } from '../../paths';
import { isErrorWithMessage } from '../../utils/is-error-with-message';

const AddEmployee = () => {
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const user = useSelector(selectUser);
	const [addEmployee] = useAddEmployeeMutation()
	const handleAddEmployee = async (data: Employee) => {
		try {
			await addEmployee(data).unwrap();
			navigate(`${Paths.status}/created`)
		} catch (err) {
			const mbErr = isErrorWithMessage(err);
			if(mbErr) {
				setError(err.data.message)
			} else {
				console.log('err', data )
				setError('Что-то пошло не так')
			}
		}
	};

	useEffect(() => {
		if (!user) {
			navigate('/login')
		}
	}, [navigate, user])

	return (
		<Layout>
			<Row align='middle' justify='center'>
				<EmployeeForm
					title='Добавить сотрудника'
					btnText='Добавить'
					onFinish={handleAddEmployee}
					error={error}
				/>
			</Row>
		</Layout>
	);
};

export default AddEmployee;
