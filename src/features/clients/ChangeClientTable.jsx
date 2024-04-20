import { useMoveBack } from "../../hooks/useMoveBack";

import ButtonText from "../../ui/ButtonText";
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import { useAddClient } from "./useAddClient";
import { FormRowVertical, Option, Select } from "../../ui/FormRowVertical";
import { useClient } from "./useClient";
import Spinner from "../../ui/Spinner";
import { useLocalization } from "../../context/LocalizationContext";

function ChangeClientTable() {
  const moveBack = useMoveBack();
  const { isLoading: isLoading2, client } = useClient();
  const { isLoading, addClient } = useAddClient();
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;
  const { language } = useLocalization();

  if (isLoading2) return <Spinner />;

  console.log("client123", client);

  function onSubmit({
    accountNumber,
    lastName,
    firstName,
    middleName,
    birthDate,
    inn,
    status,
  }) {
    const request = {
      accountNumber,
      lastName,
      firstName,
      middleName,
      birthDate,
      inn,
      status,
    };
    addClient(request);
    moveBack();
  }

  return (
    <>
      <Heading as="h4">
        {language === "en"
          ? "Change client details"
          : "Изменить детали клиента"}
      </Heading>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRowVertical
          label="Account number"
          error={errors?.accountNumber?.message}
        >
          <Input
            type="text"
            id="accountNumber"
            disabled={isLoading}
            defaultValue={client.accountNumber}
            {...register("accountNumber", {
              required: "Поле не может быть пустым",
            })}
          />
        </FormRowVertical>
        <FormRowVertical
          label={language === "en" ? "Last name" : "Фамилия"}
          error={errors?.lastName?.message}
        >
          <Input
            type="text"
            id="lastName"
            disabled={isLoading}
            defaultValue={client.lastName}
            {...register("lastName", {
              required:
                language === "en"
                  ? "The field must be filled"
                  : "Поле не может быть пустым",
            })}
          />
        </FormRowVertical>
        <FormRowVertical
          label={language === "en" ? "First name" : "Имя"}
          error={errors?.firstName?.message}
        >
          <Input
            type="text"
            id="firstName"
            disabled={isLoading}
            defaultValue={client.firstName}
            {...register("firstName", {
              required:
                language === "en"
                  ? "The field must be filled"
                  : "Поле не может быть пустым",
            })}
          />
        </FormRowVertical>
        <FormRowVertical
          label={language === "en" ? "Middle name" : "Отчество"}
          error={errors?.middleName?.message}
        >
          <Input
            type="text"
            id="middleName"
            disabled={isLoading}
            defaultValue={client.middleName}
            {...register("middleName", {
              required:
                language === "en"
                  ? "The field must be filled"
                  : "Поле не может быть пустым",
            })}
          />
        </FormRowVertical>
        <FormRowVertical
          label={language === "en" ? "Birth date" : "День рождения"}
          error={errors?.birthDate?.message}
        >
          <Input
            type="text"
            id="birthDate"
            disabled={isLoading}
            defaultValue={client.birthDate}
            {...register("birthDate", {
              required:
                language === "en"
                  ? "The field must be filled"
                  : "Поле не может быть пустым",
            })}
          />
        </FormRowVertical>
        <FormRowVertical
          label={language === "en" ? "INN" : "ИНН"}
          error={errors?.inn?.message}
        >
          <Input
            type="text"
            id="inn"
            disabled={isLoading}
            defaultValue={client.inn}
            {...register("inn", {
              required:
                language === "en"
                  ? "The field must be filled"
                  : "Поле не может быть пустым",
            })}
          />
        </FormRowVertical>
        <FormRowVertical
          label={language === "en" ? "Status" : "Статус"}
          error={errors?.status?.message}
        >
          <Select
            id="status"
            disabled={isLoading}
            defaultValue={client.status} // Используйте value вместо defaultValue
            {...register("status")}
          >
            <Option value="">
              {language === "en" ? "Select status" : "Выбрать статус"}
            </Option>
            <Option value="IN_WORK">
              {language === "en" ? "In work" : "В работе"}
            </Option>
            <Option value="REJECT">
              {language === "en" ? "Reject" : "Отказ"}
            </Option>
            <Option value="DEAL_CLOSED">
              {language === "en" ? "Deal is closed" : "Сделка закрыта"}
            </Option>
          </Select>
        </FormRowVertical>
        <FormRowVertical>
          <Button size="large" disabled={isLoading}>
            {language === "en" ? "Confirm" : "Подтвердить"}
          </Button>
        </FormRowVertical>
        <FormRowVertical>
          <ButtonText onClick={moveBack}>
            &larr; {language === "en" ? "Back" : "Назад"}
          </ButtonText>
        </FormRowVertical>
      </Form>
    </>
  );
}

export default ChangeClientTable;
