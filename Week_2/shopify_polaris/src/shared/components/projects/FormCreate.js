import { useCallback, useState } from "react";
import {
  Button,
  Form,
  FormLayout,
  TextField,
} from "@shopify/polaris";

import { useAppDispatch, useAppSelector } from "@avada/shared/hooks/useRedux";
import { addTodo } from "@avada/shared/store/slice";
import { fetchAsync } from "@avada/core/fetch";

const FormCreate = (props) => {
  const { todos } = useAppSelector((state) => state.appSlice);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const handleChange = useCallback((newValue) => setTitle(newValue), []);
  async function handleSubmit() {
    const body = {
      id: todos[todos.length - 1].id + 1,
      title: title,
      status: 2, //Default "INCOMPLETE"
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_deleted: false,
    };
    await fetchAsync("/todos", "POST", body);
    dispatch(addTodo(body));
    props.setIsToggle(false);
  }
  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <TextField
          value={title}
          onChange={handleChange}
          label="Title"
          type="text"
          autoComplete="off"
          placeholder="Avada SaSS"
          suffix="@Avada"
        />
        <div className="w-full flex justify-end items-end">
          <Button submit variant="primary">
            Add
          </Button>
        </div>
      </FormLayout>
    </Form>
  );
};

export default FormCreate;
