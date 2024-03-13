import Tag from "@avada/shared/components/common/Tag";

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
    <>
      {props.actions &&
        props.actions.map((status, idx) => (
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
          />
        ))}
    </>
  );
};

export default ListButtonAction;
