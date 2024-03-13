import { useEffect, useState } from "react";
import CardTodo from "@avada/shared/components/projects/CardTodo";
import Button from "@avada/shared/components/common/Button";
import Modal from "@avada/shared/components/common/Modal";
import FormCreate from "@avada/shared/components/projects/FormCreate";
import Toast from "@avada/shared/components/common/Toast";
import { fetchAsync } from "@avada/core/fetch";
import { useAppDispatch, useAppSelector } from "@avada/shared/hooks/useRedux";
import { changeTodos, confirm, getTodo } from "@avada/shared/store/slice";
import ListButtonAction from "@avada/shared/components/projects/ListButtonAction";
import { TODOS_STATUS } from "./shared/constant";

const App = () => {
  const dispatch = useAppDispatch();
  const [changeTodo, setChangeTodo] = useState([])
  const { todos, checkbox, isConfirmed } = useAppSelector((state) => state.appSlice);
  const [isShowFormCreate, setIsShowFormCreate] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchAsync("/todos");
        dispatch(getTodo(res.data));
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);
  useEffect(() => {
    dispatch(changeTodos(changeTodo))
  }, [changeTodo.length > 0])
  return (
    <main className="grid grid-cols-1 md:justify-between md:items-center md:place-content-center h-full my-auto mx-4 md:mx-8 lg:mx-16">
      <div className="mb-5 md:mb-10 w-full flex flex-col md:flex-row justify-end items-end md:gap-5">
        <div className="w-full flex flex-col justify-start items-start gap-3">
          <img
            src="./logoAvada.png"
            width={100}
            height={100}
            className="w-[100px] h-[100px] z-50"
            alt="Avada"
          />
          <h1 className="font-bold text-2xl md:text-4xl text-center">
            Todos Avada
          </h1>
        </div>
        <Button
          type="button"
          title="Create"
          className="bg-black text-white"
          onClick={() => setIsShowFormCreate(!isShowFormCreate)}
        />
      </div>
      <div className="w-full min-h-[300px] md:min-h-[450px]">
        {todos.length > 1 ? (
          todos.map((item, idx) => {
            return <CardTodo key={idx} data={item} />;
          })
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
      {isShowFormCreate && (
        <Modal
          title="Create Todo"
          body=<FormCreate setIsToggle={setIsShowFormCreate} />
          isToggle={isShowFormCreate}
          setIsToggle={setIsShowFormCreate}
        />
      )}
      {checkbox.length > 1 && (
        <div className="absolute p-3 md:-5 bottom-5 left-0 w-full min-h-[70px] flex flex-col md:flex-row justify-center items-center gap-3 bg-gray-700 dark:bg-gray-200">
          <ListButtonAction
            data={checkbox}
            actions={TODOS_STATUS}
            setChangeDataAction={setChangeTodo}
            setIsAction={() => dispatch(confirm(isConfirmed))}
          />
        </div>
      )}
      <Toast status="success" title="Get data successfully" />
    </main>
  );
};

export default App;
