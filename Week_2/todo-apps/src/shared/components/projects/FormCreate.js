import { useState } from "react";
import Input from "@avada/shared/components/common/Input";
import Button from "@avada/shared/components/common/Button";

const FormCreate = () => {
  const [title, setTitle] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    console.log(title);
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
