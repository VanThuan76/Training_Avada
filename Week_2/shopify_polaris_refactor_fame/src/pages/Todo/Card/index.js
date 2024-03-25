import {
  Badge,
  InlineStack,
  ResourceItem,
  Text,
  Tooltip,
} from "@shopify/polaris";

import ListButtonAction from "@avada/pages/Todo/Card/ListButtonAction";
import { converDateToDate } from "@avada/helpers/utils/convertDate";
import { TODOES_STATUS } from "@avada/constant/table";
import { convertStatusToString } from "@avada/helpers/utils/convertStatusToString";
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
  const filterActions = props.data.is_deleted
    ? []
    : props.data.status === 2
    ? TODOES_STATUS.slice(1, 4)
    : props.data.status === 1
    ? TODOES_STATUS.filter((status) => status !== "COMPLETE")
    : TODOES_STATUS;

  return (
    <ResourceItem id={props.data.id}>
      <InlineStack columns={2} wrap="false" align="space-between">
        {!props.data.is_deleted ? (
          <Tooltip
            dismissOnMouseOut
            content={`Created at: ${converDateToDate(props.data.created_at)}`}
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
        ) : (
          <Text
            variant="headingSm"
            as="p"
            textDecorationLine="line-through"
            tone="critical"
          >
            {props.data.title}
          </Text>
        )}
        <InlineStack columns={3} gap="200" wrap={true} blockAlign="center">
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
            dispatch={props.dispatch}
            setIsAction={props.setIsAction}
          />
        </InlineStack>
      </InlineStack>
      {props.data.is_deleted && (
        <Text alignment="end" fontWeight="regular" variant="headingXs" as="p">
          Deleted at: {converDateToDate(props.data.updated_at)}
        </Text>
      )}
    </ResourceItem>
  );
};

export default CardTodo;
