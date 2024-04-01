import {
  Badge,
  Button,
  InlineGrid,
  InlineStack,
  ResourceItem,
  Text,
  TextContainer,
} from "@shopify/polaris";
import { useState } from "react";
import * as React from "react";
import ListButtonAction from "@avada/pages/Todo/Card/ListButtonAction";
import { converDateToDate } from "@avada/helpers/utils/convertDate";
import { TODOES_STATUS } from "@avada/constant/table";
import { convertStatusToString } from "@avada/helpers/utils/convertStatusToString";

import SheetWrapper from "@avada/components/SheetWrapper";
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
  const [sheetActive, setSheetActive] = useState(false);
  const handleOpenSheet = () => {
    setSheetActive(true);
  };
  const handleCloseSheet = () => {
    setSheetActive(false);
  };
  const filterActions = props.data.is_deleted
    ? []
    : props.data.status === 2
    ? TODOES_STATUS.slice(1, 4)
    : props.data.status === 1
    ? TODOES_STATUS.filter((status) => status !== "COMPLETE")
    : TODOES_STATUS;

  return (
    <React.Fragment>
      <ResourceItem id={props.data.id}>
        <InlineStack columns={2} wrap="false" align="space-between">
          {!props.data.is_deleted ? (
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
          <Button onClick={handleOpenSheet}>Detail</Button>
        </InlineStack>
      </ResourceItem>
      <SheetWrapper open={sheetActive} onClose={handleCloseSheet}>
        <InlineStack columns={1} gap="400" wrap={true} blockAlign="center">
          <TextContainer>
            <Text variant="headingMd" as="h2">
              Look up detail todo - {props.data.title}
            </Text>
            {props.data.is_deleted ? (
              <Text
                fontWeight="regular"
                variant="headingXs"
                as="span"
                tone="subdued"
              >
                Deleted at: {converDateToDate(props.data.updated_at)}
              </Text>
            ) : (
              <Text
                fontWeight="regular"
                variant="headingXs"
                as="span"
                tone="subdued"
              >
                Created at: {converDateToDate(props.data.created_at)}
              </Text>
            )}
          </TextContainer>
          <InlineGrid columns={2} gap="200">
            <Text tone="subdued" as="span">
              Status current:
            </Text>
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
          </InlineGrid>
          <InlineStack columns={2} gap="200" wrap={true} blockAlign="center">
            <ListButtonAction
              data={[props.data]}
              actions={filterActions}
              dispatch={props.dispatch}
              setIsAction={props.setIsAction}
            />
          </InlineStack>
        </InlineStack>
      </SheetWrapper>
    </React.Fragment>
  );
};

export default CardTodo;
