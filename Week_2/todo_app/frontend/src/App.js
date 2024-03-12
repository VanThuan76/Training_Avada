import { useEffect, useState } from "react";
import CardTodo from "@avada/shared/components/projects/CardTodo";
import Button from "@avada/shared/components/common/Button";
import Modal from "@avada/shared/components/common/Modal";
import FormCreate from "@avada/shared/components/projects/FormCreate";
import Toast from "@avada/shared/components/common/Toast";
import { fetchAsync } from "@avada/core/fetch";
import { useAppDispatch, useAppSelector } from "@avada/shared/hooks/useRedux";
import { getTodo } from "@avada/shared/store/slice";

const App = () => {
  const { todos } = useAppSelector((state) => state.appSlice);
  const dispatch = useAppDispatch();
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
  return (
    <main className="grid grid-cols-1 justify-between items-center place-content-center h-full my-auto mx-4 md:mx-8 lg:mx-16">
      <div className="mb-10 w-full flex flex-col md:flex-row justify-between items-center gap-5">
        <h1 className="font-bold text-2xl md:text-4xl text-center">
          Todos Avada
        </h1>
        <Button
          type="button"
          title="Create"
          className="bg-black text-white"
          onClick={() => setIsShowFormCreate(!isShowFormCreate)}
        />
      </div>
      <div className="w-full h-[200px] md:min-h-[450px]">
        {todos &&
          todos.map((item, idx) => {
            return <CardTodo key={idx} data={item} />;
          })}
      </div>
      {isShowFormCreate && (
        <Modal
          title="Create Todo"
          body=<FormCreate
            setIsToggle={setIsShowFormCreate}
          />
          isToggle={isShowFormCreate}
          setIsToggle={setIsShowFormCreate}
        />
      )}
      <Toast status="success" title="Test" />
      <img
        src="./logoAvada.png"
        width={100}
        height={100}
        className="w-[100px] h-[100px] absolute top-5 left-5 md:top-10 md:left-10 z-50"
        alt="Avada"
      />
    </main>
  );
};

export default App;
