import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Paths } from './paths';
import Register from './pages/register';
import Login from './pages/Login';
import Employees from './pages/employees';
import './index.css';
import { ConfigProvider, theme } from 'antd';
import { store } from './app/store';
import Auth from './features/auth/auth';
import AddEmployee from './pages/add-employee';
import Status from './pages/status';
import Employee from './pages/employee';
import EditEmployee from './pages/edit-employee';

const router = createBrowserRouter([
	{
		path: Paths.home,
		element: <Employees />,
	},
	{
		path: Paths.login,
		element: <Login />,
	},
	{
		path: Paths.register,
		element: <Register />,
	},
	{
		path: Paths.employeeAdd,
		element: <AddEmployee />,
	},
	{
		path: `${Paths.status}/:status`,
		element: <Status />,
	},
	{
		path: `${Paths.employee}/:id`,
		element: <Employee />,
	},
	{
		path: `${Paths.employeeEdit}/:id`,
		element: <EditEmployee />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
				<Auth>
					<RouterProvider router={router} />
				</Auth>
			</ConfigProvider>
		</Provider>
	</React.StrictMode>
);
