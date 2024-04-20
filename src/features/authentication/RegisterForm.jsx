import { useSignup } from "./useSignup";
import { useLogin } from "./useLogin";

import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormRowVertical } from "../../ui/FormRowVertical";

function RegisterForm() {
  const navigate = useNavigate();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const { isLoading: loginLoading } = useLogin();
  const { signup, isLoading: signupLoading } = useSignup();

  function onSubmit({ login, password, fio }, e) {
    e.preventDefault();
    console.log("login", login, "password", password, "fio", fio);
    const action = e.nativeEvent.submitter.innerText;
    switch (action) {
      case "Enter":
        if (!fio || !login || !password) return;
        const request = {
          login: login,
          password: password,
          fio,
        };
        signup(request, {
          onSettled: () => {
            reset();
          },
        });
        break;
      case "Go back to log in":
        navigate("/login");
        break;
      default:
        break;
    }
  }

  function handleBackToLogin() {
    navigate("/login");
  }

  return (
    <Form onSubmit={handleSubmit((data, e) => onSubmit(data, e))}>
      <FormRowVertical label="Login" error={errors?.login?.message}>
        <Input
          type="text"
          id="login"
          disabled={signupLoading}
          {...register("login", {
            required: "Поле не может быть пустым",
            minLength: {
              value: 4,
              message: "Длина логина должна быть минимум 4 символа",
            },
            maxLength: {
              value: 32,
              message: "Длина логина должна быть максимум 32 символов",
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical label="FIO" error={errors?.fio?.message}>
        <Input
          type="text"
          id="fio"
          disabled={loginLoading}
          {...register("fio", {
            required: "Поле не может быть пустым",
          })}
        />
      </FormRowVertical>

      <FormRowVertical label="Password" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={loginLoading}
          {...register("password", {
            required: "Поле не может быть пустым",
            minLength: {
              value: 8,
              message: "Длина пароля должна быть минимум 8 символов",
            },
            maxLength: {
              value: 20,
              message: "Длина пароля должна быть максимум 64 символов",
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical
        label="Repeat password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={loginLoading}
          {...register("passwordConfirm", {
            required: "Поле не может быть пустым",
            validate: (value) =>
              value === getValues().password || "Пароли должны совпадать",
          })}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button size="large" disabled={loginLoading}>
          {!loginLoading ? "Enter" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
      <FormRowVertical
        type="register"
        className="text-teal-950"
        onClick={handleBackToLogin}
      >
        <Button
          size="register"
          variation="register"
          disabled={signupLoading}
          onClick={handleBackToLogin}
        >
          {!signupLoading ? "Go back to log in" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default RegisterForm;
