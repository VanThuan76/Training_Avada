import { fetchAsync } from "@avada/core/fetch";
import Button from "@avada/shared/components/common/Button";
import { useAppDispatch } from "@avada/shared/hooks/useRedux";
import { updateTodo } from "@avada/shared/store/slice";
/**
 * Form confirm to change status TODO
 * @param {object[]} props - data TODO
 * @return {JSX.Element}
 */
const FormConfirm = (props) => {
  const dispatch = useAppDispatch();
  async function handleSubmit(e) {
    e.preventDefault();
    const updatedTodos = props.data.map((todo) => ({
      ...todo,
      status: todo.status,
      updated_at: new Date(),
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
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col justify-start items-start gap-3"
    >
      <Button
        type="submit"
        title="Are you sure"
        className="bg-black dark:bg-white text-white dark:text-dark hover:bg-gray-700"
      ></Button>
    </form>
  );
};

export default FormConfirm;
