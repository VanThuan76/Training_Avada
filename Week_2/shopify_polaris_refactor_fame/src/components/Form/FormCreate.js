import { useCallback, useReducer, useState } from "react";
import { Button, Form, FormLayout, TextField } from "@shopify/polaris";

import { reducerSlice } from "@avada/actions/storeActions";
import { initialState } from "@avada/reducers/store";
import { addTodo } from "@avada/actions/todo";
import useMutation from "@avada/hooks/api/useMutation";
/**
 * Form create todo
 * @param {{setIsToggle: Function}} props
 * @return {JSX.Element}
 */
const FormCreate = (props) => {
  const [state, dispatch] = useReducer(reducerSlice, initialState);
  const [title, setTitle] = useState("");
  const mutate = useMutation();
  const handleChange = useCallback((newValue) => setTitle(newValue), []);
  async function handleSubmit() {
    const body = {
      title: title,
      status: 2, //Default "INCOMPLETE"
      created_at: new Date(),
      updated_at: new Date(),
      is_deleted: false,
    };
    const response = await mutate.post(
      `${process.env.REACT_APP_API_URL}/todos`,
      body,
    );
    if (response.status === 201) {
      addTodo(dispatch, body);
      props.setIsToggle(false);
    }
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
        <Button submit variant="primary">
          Add
        </Button>
      </FormLayout>
    </Form>
  );
};

export default FormCreate;
