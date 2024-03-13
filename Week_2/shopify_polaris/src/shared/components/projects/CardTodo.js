import { memo, useEffect, useState } from "react";
import { Badge, Checkbox, Text, Tooltip } from "@shopify/polaris";

import FormConfirm from "@avada/shared/components/projects/FormConfirm";
import ListButtonAction from "@avada/shared/components/projects/ListButtonAction";
import { converDateToDate } from "@avada/shared/utils/convertDate";
import { useAppDispatch, useAppSelector } from "@avada/shared/hooks/useRedux";
import { TODOES_STATUS } from "@avada/shared/constant/index";
import { changeTodos, chooseTodo, confirm } from "@avada/shared/store/slice";
import ModalPolaris from "@avada/shared/components/shopify_polaris/Modal";
import { convertStatusToString } from "@avada/shared/utils/convertStatusToString";
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
  const [changeTodo, setChangeTodo] = useState([]);
  const { isConfirmed, todosChanged, checkbox } = useAppSelector(
    (state) => state.appSlice
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(changeTodos(changeTodo));
  }, [changeTodo.length > 0]);
  const filterActions = props.data.is_deleted
    ? []
    : props.data.status === 2
    ? TODOES_STATUS.slice(1, 4)
    : props.data.status === 1
    ? TODOES_STATUS.filter((status) => status !== "COMPLETE")
    : TODOES_STATUS;
  return (
    <div
      className={`w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center flex-wrap min-h-[50px] px-2 md:px-4 py-2 border-b border-b-black ${props.className}`}
    >
      <div className="w-full flex justify-start items-center gap-3">
        {!props.data.is_deleted ? (
          <Checkbox
            label={
              <Tooltip
                dismissOnMouseOut
                content={`Created at: ${converDateToDate(
                  props.data.created_at
                )}`}
              >
                <Text fontWeight="bold" as="span">
                  <Text
                    variant="headingSm"
                    as="p"
                    tone={
                      props.data.status === 1
                        ? "success"
                        : props.data.status === 2
                        ? "caution"
                        : ""
                    }
                  >
                    {props.data.title}
                  </Text>
                </Text>
              </Tooltip>
            }
            checked={checkbox.find((item) => item.id === props.data.id)}
            onChange={() => dispatch(chooseTodo(props.data))}
          />
        ) : (
          <Text
            variant="headingSm"
            as="p"
            textDecorationLine="line-through"
            tone="critical"
          >{props.data.title}</Text>
        )}
      </div>
      <div className="w-full flex flex-wrap justify-end items-center gap-2">
        <Badge
          tone={
            props.data.status === 2
              ? "warning"
              : props.data.status === 1
              ? "success"
              : "critical"
          }
        >
          {convertStatusToString(props.data.status)}
        </Badge>
        <ListButtonAction
          data={[props.data]}
          actions={filterActions}
          setChangeDataAction={setChangeTodo}
          setIsAction={() => dispatch(confirm(isConfirmed))}
        />
        {props.data.is_deleted && (
          <Text variant="headingSm" as="p">
            Deleted at: {converDateToDate(props.data.updated_at)}
          </Text>
        )}
      </div>
      {isConfirmed && (
        <ModalPolaris
          title="Confirm again!"
          body={
            <FormConfirm
              setIsToggle={() => dispatch(confirm(isConfirmed))}
              data={todosChanged}
            />
          }
          active={isConfirmed}
          setActive={() => dispatch(confirm(isConfirmed))}
        />
      )}
    </div>
  );
};

export default memo(CardTodo);
