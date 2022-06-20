import { useState, createContext } from "react";

const FormContext = createContext({});
const FormProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <FormContext.Provider value={{ loading, setLoading }}>
      {children}
    </FormContext.Provider>
  );
};

export { FormProvider, FormContext };
