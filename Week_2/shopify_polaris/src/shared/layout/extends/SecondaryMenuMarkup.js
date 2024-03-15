import { TopBar, InlineGrid } from "@shopify/polaris";
/**
 *
 * @component SecondaryMenuMarkup
 *
 * @param {object} props - Component properties
 * @param {{icon: React.ReactNode; contents: {{string}[] content}; open: boolean; onOpen: function, onClose: function }} menuMarkups - Required
 *
 * @returns {JSX.Element}
 */
const SecondaryMenuMarkup = (props) => {
  return (
    <InlineGrid columns={props.menuMarkups.length}>
      {props.menuMarkups.map((menuMarkup, idx) => {
        return (
          <TopBar.Menu
            key={idx}
            activatorContent={<span>{menuMarkup.icon}</span>}
            open={menuMarkup.open}
            onOpen={menuMarkup.onOpen}
            onClose={menuMarkup.onClose}
            actions={[
              {
                items: menuMarkup.contents,
              },
            ]}
          />
        );
      })}
    </InlineGrid>
  );
};

export default SecondaryMenuMarkup;
