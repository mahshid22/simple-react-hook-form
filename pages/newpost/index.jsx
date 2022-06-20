import { useContext } from "react";
import axios from "axios";
import Layout from "@/components/layout";
import Box from "@mui/material/Box";
import PostFrom from "@/components/postFrom";
import SubmitButton from "@/components/submitButton";
import InputText from "@/components/inputText";
import Alert from "@/components/alertMessage";
import PageHead from "@/components/Head";
import removeEmpty from "utils/removeEmptyFromObject";
import { FormContext } from "@/context/formContex";
import { AlertContext } from "@/context/alertCotex";
import { ResultContext } from "@/context/resultContext";
import styles from "../../styles/PostForm.module.scss";
import { FormProvider, useForm } from "react-hook-form";
const defaultValues = {
  name: "",
  mobile: "",
  description: "",
};
export default function NewPost() {
  const formContext = useContext(FormContext);
  const { setLoading } = formContext;
  const { setResult, result } = useContext(ResultContext);
  const { setShowSubmitResult, setAlertMsg, setAlertMsgType } =
    useContext(AlertContext);
  const { handleSubmit, control } = useForm(defaultValues);

  const onSubmit = (data) => {
    console.log(data);
    console.log(result);
    if (
      JSON.stringify(data) !== JSON.stringify(result) &&
      Object.keys(removeEmpty(data)).length
    ) {
      setLoading(true);
      setShowSubmitResult(false);
      axios
        .post("https://jsonplaceholder.typicode.com/posts", data, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((result) => {
          delete result.data.id;
          let res = { ...result.data };
          setShowSubmitResult(true);
          setLoading(false);
          setAlertMsg("you're message was submited successfully");
          setAlertMsgType("success");
          if (Object.keys(removeEmpty(result)).length) setResult(res);
        })
        .catch(() => {
          setShowSubmitResult(true);
          setLoading(false);
          setAlertMsg("you're message was NOT submited.");
          setAlertMsgType("error");
        });
    } else {
      setAlertMsg(" Duplicate or Empty information");
      setAlertMsgType("error");
      setShowSubmitResult(true);
    }
  };
  const handleSubmit2 = (form, result) => {
    if (
      JSON.stringify(form) !== JSON.stringify(result) &&
      Object.keys(removeEmpty(form)).length
    ) {
      setLoading(true);
      setShowSubmitResult(false);
      axios
        .post("https://jsonplaceholder.typicode.com/posts", form, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((result) => {
          delete result.data.id;
          let res = { ...result.data };
          setShowSubmitResult(true);
          setLoading(false);
          setAlertMsg("you're message was submited successfully");
          setAlertMsgType("success");
          if (Object.keys(removeEmpty(result)).length) setResult(res);
        })
        .catch(() => {
          setShowSubmitResult(true);
          setLoading(false);
          setAlertMsg("you're message was NOT submited.");
          setAlertMsgType("error");
        });
    } else {
      setAlertMsg(" Duplicate or Empty information");
      setAlertMsgType("error");
      setShowSubmitResult(true);
    }
  };

  return (
    <Box
      className={styles.formPaper}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2>New Post</h2>
      <PostFrom>
        <InputText name="name" label="name" control={control} />
        <InputText name="mobile" label="mobile" control={control} />
        <InputText
          name="description"
          label="description"
          multiline
          rows={4}
          control={control}
        />
        <SubmitButton />
      </PostFrom>
      <Alert />
    </Box>
  );
}
NewPost.getLayout = function getLayout(page) {
  return (
    <Layout>
      <PageHead header="Submit new post" />
      {page}
    </Layout>
  );
};
