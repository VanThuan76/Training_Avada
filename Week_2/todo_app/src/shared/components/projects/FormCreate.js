import { useState } from "react";
import Input from "@avada/shared/components/common/Input";
import Button from "@avada/shared/components/common/Button";
import { useAppDispatch, useAppSelector } from "@avada/shared/hooks/useRedux";
import { addTodo } from "@avada/shared/store/slice";
import { fetchAsync } from "@avada/core/fetch";

const FormCreate = (props) => {
  const { todos } = useAppSelector((state) => state.appSlice);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const body = {
      id: todos[todos.length - 1].id + 1,
      title: title,
      status: 2, //Default "INCOMPLETE"
      created_at: new Date(),
      updated_at: new Date(),
      is_deleted: false
    }
    //FIXME: Refactor
    const res = await fetchAsync('/todos', 'POST', body);
    if(res.status === 201) {
      dispatch(addTodo(body))
      props.setIsToggle(false)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        label="Title"
        type="text"
        placeholder="Avada SaSS"
      />
      <Button
        type="submit"
        title="Add"
        className="bg-black text-white mt-5 self-end"
      />
    </form>
  );
};

export default FormCreate;
