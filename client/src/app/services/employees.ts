import { Employee } from '@prisma/client';
import { api } from './api';

export const employeesApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getAllEmployees: builder.query<Employee[], void>({
			query: () => ({ url: '/employees', method: 'GET' }),
		}),
		getEmployee: builder.query<Employee, string>({
			query: (id) => ({ url: `employees/${id}`, method: 'GET' }),
		}),
		editEmployee: builder.mutation<string, Employee>({
			query: (employee) => ({
				url: `employee/edit/${employee.id}`,
				method: 'PUT',
			}),
		}),
		removeEmployee: builder.mutation<string, string>({
			query: (id) => ({
				url: `employee/remove/${id}`,
				method: 'POST',
				body: { id },
			}),
		}),
		addEmployee: builder.mutation<Employee, Employee>({
			query: (employee) => ({
				url: `employee/add`,
				method: 'POST',
				body: employee,
			}),
		}),
	}),
});

export const {
	useGetAllEmployeesQuery,
	useGetEmployeeQuery,
	useRemoveEmployeeMutation,
	useEditEmployeeMutation,
	useAddEmployeeMutation,
} = employeesApi;

export const {
	endpoints: {
		getAllEmployees,
		getEmployee,
		editEmployee,
		removeEmployee,
		addEmployee,
	},
} = employeesApi;
