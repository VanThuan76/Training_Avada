import { Button, Sheet } from "@shopify/polaris";
import { XIcon } from "@shopify/polaris-icons";
/**
 * @param props
 * @return {React.ReactNode}
 */
const SheetWrapper = (props) => {
  return (
    <Sheet
      open={props.sheetActive}
      onClose={props.toggleSheetActive}
      {...props}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          position: "relative",
        }}
      >
        <div
          style={{
            alignItems: "center",
            borderBottom: "1px solid #DFE3E8",
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem",
            width: "100%",
          }}
        >
          {props.children}
          <div style={{ position: "absolute", top: 5, right: 5 }}>
            <Button
              accessibilityLabel="Cancel"
              icon={XIcon}
              onClick={() => props.toggleSheetActive}
              variant="plain"
            />
          </div>
        </div>
      </div>
    </Sheet>
  );
};

export default SheetWrapper;
