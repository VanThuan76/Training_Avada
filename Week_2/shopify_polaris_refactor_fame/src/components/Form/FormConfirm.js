import { useReducer } from "react";
import { Button, Form, FormLayout } from "@shopify/polaris";

import { reducerSlice } from "@avada/actions/storeActions";
import { initialState } from "@avada/reducers/store";
import { updateTodo } from "@avada/actions/todo";
import useMutation from "@avada/hooks/api/useMutation";
/**
 * Form confirm to change status TODO
 * @param {object[]} props
 * @return {JSX.Element}
 */
const FormConfirm = (props) => {
  const mutate = useMutation();
  const handleSubmit = async () => {
    if (!props.data) return;
    const updatedTodos = props.data.map((todo) => ({
      ...todo,
      status: todo.status,
      updated_at: new Date(),
      is_deleted: todo.status === 0 ? true : false,
    }));
    try {
      for (const todo of updatedTodos) {
        const response = await mutate.put(`${process.env.REACT_APP_API_URL}/todos/${todo.id}`, todo);
        if (response.status !== 200) {
          throw new Error("Something went wrong");
        }
      }
      updateTodo(props.dispatch, updatedTodos);
      props.setSelectedItems([])
      props.setIsToggle(false);
    } catch (error) {
      console.error("Error updating todos:", error);
      throw error;
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <Button submit variant="primary">
          Are you sure!
        </Button>
      </FormLayout>
    </Form>
  );
};

export default FormConfirm;
