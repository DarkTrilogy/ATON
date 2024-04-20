import { useNavigate } from "react-router-dom";

import { useLogin } from "./useLogin";
import { useSignup } from "./useSignup";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import { useForm } from "react-hook-form";
import { FormRowVertical } from "../../ui/FormRowVertical";

export let loginOfCurrentUser;

function LoginForm() {
  const { signIn, isLoading: signinLoading } = useLogin();
  const { isLoading: signupLoading } = useSignup();
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const navigate = useNavigate();

  function onSubmit({ login, password }, e) {
    e.preventDefault();
    const action = e.nativeEvent.submitter.innerText;
    if (action === "Log in") {
      console.log(login, password);
      if (!login || !password) return;
      loginOfCurrentUser = login;
      signIn(
        { login, password },
        {
          onSettled: () => {
            reset();
          },
        },
      );
    } else if (action === "Register") {
      if (!login || !password) return;
      navigate("/register");
    }
  }

  return (
    <Form onSubmit={handleSubmit((data, e) => onSubmit(data, e))}>
      <FormRowVertical label="Login" error={errors?.login?.message}>
        <Input
          type="login"
          id="login"
          disabled={signinLoading}
          {...register("login", {
            required: "Поле не может быть пустым",
          })}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" error={errors?.login?.message}>
        <Input
          type="password"
          id="password"
          disabled={signinLoading}
          {...register("password", {
            required: "Поле не может быть пустым",
          })}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={signinLoading}>
          {!signinLoading ? "Log in" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
      <FormRowVertical type="register" className="text-teal-950">
        <Button size="register" variation="register" disabled={signupLoading}>
          {!signupLoading ? "Register" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
