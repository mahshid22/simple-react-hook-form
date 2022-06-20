import { useContext } from "react";
import Button from "@mui/material/Button";
import { FormContext } from "@/context/formContex";

const SubmitButton = () => {
  const { loading } = useContext(FormContext);

  return (
    <Button variant="contained" type="dubmit" disabled={loading}>
      Submit
    </Button>
  );
};
export default SubmitButton;
