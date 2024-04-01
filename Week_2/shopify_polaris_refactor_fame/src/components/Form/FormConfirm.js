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
  let index = 0;
  const handleSubmit = async () => {
    if (!props.data) return;
    const updatedTodos = props.data.map((todo) => ({
      status: todo.status,
      is_deleted: todo.status === 0 ? true : false,
    }));
    if (props.data.length > 1) {
      const ids = props.data.map((todo) => todo.id);
      const todos = {
        ids: ids,
        todos: { ...updatedTodos[0] },
      };
      try {
        const response = await mutate.put(
          `${process.env.REACT_APP_API_URL}/todos`,
          todos
        );
        updateTodo(
          props.dispatch,
          props.data.map((todo) => ({
            ...todo,
            status: todo.status,
            is_deleted: todo.status === 0 ? true : false,
          }))
        );
        props.setSelectedItems([]);
        props.setIsToggle(false);
      } catch (error) {
        console.error("Error updating todos:", error);
        throw error;
      }
    } else {
      try {
        for (const todo of updatedTodos) {
          const response = await mutate.put(
            `${process.env.REACT_APP_API_URL}/todos/${props.data[index].id}`,
            todo
          );
          if (response.status !== 200) {
            throw new Error("Something went wrong");
          }
          index++;
        }
        updateTodo(
          props.dispatch,
          props.data.map((todo) => ({
            ...todo,
            status: todo.status,
            is_deleted: todo.status === 0 ? true : false,
          }))
        );
        props.setSelectedItems([]);
        props.setIsToggle(false);
      } catch (error) {
        console.error("Error updating todos:", error);
        throw error;
      }
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
