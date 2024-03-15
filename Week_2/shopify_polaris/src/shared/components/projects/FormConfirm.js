import { Button, Form, FormLayout } from "@shopify/polaris";

import { fetchAsync } from "@avada/core/fetch";
import { useAppDispatch } from "@avada/shared/hooks/useRedux";
import { updateTodo } from "@avada/shared/store/slice";
/**
 * Form confirm to change status TODO
 * @param {object[]} props - data TODO
 * @return {JSX.Element}
 */
const FormConfirm = (props) => {
  const dispatch = useAppDispatch();
  async function handleSubmit() {
    const updatedTodos = props.data.map((todo) => ({
      ...todo,
      status: todo.status,
      updated_at: new Date().toISOString(),
      is_deleted: todo.status === 0 ? true : false,
    }));
    try {
      for (const todo of updatedTodos) {
        const res = await fetchAsync(`/todos/${todo.id}`, "PUT", todo);
        if (res.status !== 200) {
          throw new Error("Something went wrong");
        }
      }
      dispatch(updateTodo(updatedTodos));
      props.setIsToggle(false);
    } catch (error) {
      console.error("Error updating todos:", error);
    }
  }
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
