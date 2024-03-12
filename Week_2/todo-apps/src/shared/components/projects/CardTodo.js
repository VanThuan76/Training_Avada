import { TODOS_STATUS } from "@avada/shared/constant/index";
import Tag from "@avada/shared/components/common/Tag";
import Button from "../common/Button";
import { converDateToDate } from "@avada/shared/utils/convertDate";

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
  const filterActions = props.data.is_deleted ? [] : TODOS_STATUS;
  return (
    <div
      className={`w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center flex-wrap min-h-[50px] px-2 md:px-4 py-2 border-b border-b-black ${props.className}`}
    >
      <div className="w-full flex justify-start items-center gap-3">
        {!props.data.is_deleted && (
          <input
            type="checkbox"
            className="border border-black rounded-md w-[15px] h-[15px] cursor-pointer text-center"
          ></input>
        )}
        <p
          className={`text-md md:text-xl font-medium ${
            props.data.is_deleted && "line-through"
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
          />
        ))}
        {props.data.is_deleted && <p className="text-sm md:text-md">Delete at: {converDateToDate(props.data.updated_at)}</p>}
      </div>
    </div>
  );
};

export default CardTodo;
