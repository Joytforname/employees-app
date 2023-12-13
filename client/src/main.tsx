import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Paths } from './paths';
import Register from './pages/register';
import Login from './pages/Login';
import './index.css';
import { ConfigProvider, theme } from 'antd';
import { store } from './app/store';

const router = createBrowserRouter([
	{
		path: Paths.home,
		element: <div>home</div>,
	},
	{
		path: Paths.login,
		element: <Login />,
	},
	{
		path: Paths.register,
		element: <Register />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>
				<RouterProvider router={router} />
			</ConfigProvider>
		</Provider>
	</React.StrictMode>
);
