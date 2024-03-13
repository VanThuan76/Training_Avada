import { Button } from "@shopify/polaris";
import * as React from "react";

/**
 *
 * @component ListButtonAction
 *
 * @param {object} props - Component properties
 * @param {string[]} props.actions - List actions
 * @param {object | object[]} props.data - Data for to change
 * @param {Function} props.setChangeDataAction - Get proerty change action
 * @param {Function} props.setIsAction - Set boolean for action to trigger
 *
 * @returns {JSX.Element}
 */
const ListButtonAction = (props) => {
  return (
    <React.Fragment>
      {props.actions &&
        props.actions.map((status, idx) => (
          <Button
            key={idx}
            tone={
              status === "INCOMPLETE"
                ? "warning"
                : status === "COMPLETE"
                ? "success"
                : "critical"
            }
            onClick={() => {
              if (props.data.length === 0) {
                props.setChangeDataAction(
                  [
                    {
                      ...props.data,
                      status:
                        status === "INCOMPLETE"
                          ? 2
                          : status === "COMPLETE"
                          ? 1
                          : 0,
                    },
                  ].flat()
                );
              } else {
                const newData = props.data.map((todo) => {
                  return {
                    ...todo,
                    status: status === "INCOMPLETE" ? 2 : status === "COMPLETE" ? 1 : 0,
                  };
                });
                props.setChangeDataAction(newData);
              }
              props.setIsAction(true);
            }}
          >{status}</Button>
        ))}
    </React.Fragment>
  );
};

export default ListButtonAction;
