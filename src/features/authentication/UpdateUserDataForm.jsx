import { useState } from "react";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdateUser } from "./useUpdateUser";
import Spinner from "../../ui/Spinner";
import { useUser } from "./useUser";

function UpdateUserDataForm({ nickname }) {
  const { user, isLoading } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const [nick, setNick] = useState(nickname);

  if (isLoading) return <Spinner />;

  function handleSubmit(e) {
    e.preventDefault();
    if (!nick) return;
    updateUser(
      {
        nickname: nick,
      },
      {
        onSuccess: () => {
          e.target.reset();
        },
      },
    );
  }

  function handleCancel() {
    setNick(user.nickname);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={user.email} disabled />
      </FormRow>

      <FormRow label="Nickname">
        <Input
          type="text"
          value={nick}
          onChange={(e) => setNick(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
