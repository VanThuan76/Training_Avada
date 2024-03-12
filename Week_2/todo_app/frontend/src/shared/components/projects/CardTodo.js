import { useState } from "react";
import { TODOS_STATUS } from "@avada/shared/constant/index";
import Tag from "@avada/shared/components/common/Tag";
import { converDateToDate } from "@avada/shared/utils/convertDate";
import { useAppDispatch } from "@avada/shared/hooks/useRedux";
import Modal from "@avada/shared/components/common/Modal";
import { chooseTodo } from "@avada/shared/store/slice";

/**
 *
 * @component CardTodo
 *
 * @param {object} props - Component properties
 * @param {string} props.title - The text displayed on the button. Required.
 *
 * @returns {JSX.Element} A button element with the specified properties.
 */
const CardTodo = (props) => {
  const [isAction, setIsAction] = useState(false);
  const dispatch = useAppDispatch();
  const filterActions = props.data.is_deleted
    ? []
    : props.data.status === 2
    ? TODOS_STATUS.slice(1, 4)
    : props.data.status === 1
    ? TODOS_STATUS.filter((status) => status !== "COMPLETE")
    : TODOS_STATUS;

  const handleUpdateStatus = (status, id) => {
    console.log(status);
    console.log(id);
  };

  return (
    <div
      className={`w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center flex-wrap min-h-[50px] px-2 md:px-4 py-2 border-b border-b-black ${props.className}`}
    >
      <div className="w-full flex justify-start items-center gap-3">
        {!props.data.is_deleted && (
          <input
            onClick={() => dispatch(chooseTodo(props.data))}
            type="checkbox"
            className="border border-black rounded-md w-[15px] h-[15px] cursor-pointer text-center"
          ></input>
        )}
        <p
          className={`text-md md:text-xl font-medium ${
            props.data.is_deleted && "line-through"
          } ${
            props.data.status === 0
              ? "text-red-500"
              : props.data.status === 1
              ? "text-green-500"
              : props.data.status === 2
              ? "text-yellow-500"
              : ""
          }`}
        >
          {props.data.title}
        </p>
      </div>
      <div className="w-full flex flex-wrap justify-end items-center gap-2">
        {filterActions.map((status, idx) => (
          <Tag
            key={idx}
            title={status}
            color={
              status === "INCOMPLETE"
                ? "yellow"
                : status === "COMPLETE"
                ? "green"
                : ""
            }
            onClick={() => {
              handleUpdateStatus(status, props.data.id)
              setIsAction(!isAction)
            }}
          />
        ))}
        {props.data.is_deleted && (
          <p className="text-sm md:text-md">
            Deleted at: {converDateToDate(props.data.updated_at)}
          </p>
        )}
      </div>
      {isAction && (
        <Modal
          title="Confirm again!"
          body={<></>}
          isToggle={isAction}
          setIsToggle={setIsAction}
        />
      )}
    </div>
  );
};

export default CardTodo;
