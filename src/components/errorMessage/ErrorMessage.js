import { Alert } from "../../components/ui/alert";

const ErrorMessage = ({title = "No data yet"}) => {
  return (
    <Alert status="error" title={title}/>
  )
}

export default ErrorMessage;