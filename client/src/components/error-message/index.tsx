import { Alert } from "antd";

type Props = {
	message?: string
}

const ErrorMessage = ({message}: Props) => {
	return (message ?  <Alert message={message} type='error'></Alert> : null)
}
 
export default ErrorMessage;