import { useState } from "react";
import CardTodo from "@avada/shared/components/projects/CardTodo";
import Button from "@avada/shared/components/common/Button";
import Modal from "@avada/shared/components/common/Modal";
import FormCreate from "@avada/shared/components/projects/FormCreate";
import {fakeData} from "@avada/shared/mock/mock"

const App = () => {
  const [isShowFormCreate, setIsShowFormCreate] = useState(false);

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
        {fakeData.map((item, idx) => {
          return <CardTodo key={idx} data={item} />;
        })}
      </div>
      {isShowFormCreate && (
        <Modal
          title="Create Todo"
          body=<FormCreate />
          isToggle={isShowFormCreate}
          setIsToggle={setIsShowFormCreate}
        />
      )}
    </main>
  );
};

export default App;
