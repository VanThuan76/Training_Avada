import { Button, Layout, TopBar } from "@shopify/polaris";
import { useState } from "react";
import Header from "@avada/shared/components/projects/Header";
import TopBarPolaris from "@avada/shared/components/shopify_polaris/TopBar";
/**
 *
 * @component Layout
 *
 * @param {object} props - Component properties
 * @param {Node.Element} props.children
 *
 * @returns {JSX.Element} A button element with the specified properties.
 */
const LayoutPolaris = (props) => {
  const [isFullscreen, setFullscreen] = useState(true);
  return (
    <div className="w-full h-full mx-auto">
      {/* <Header />  //Header Customization */}
      <TopBarPolaris />
      <div style={{ padding: "1rem" }}>
        {!isFullscreen && (
          <Button onClick={() => setFullscreen(true)}>Go Fullscreen</Button>
        )}
        <Layout>
          {props.children && <Layout.Section>{props.children}</Layout.Section>}
        </Layout>
      </div>
    </div>
  );
};
export default LayoutPolaris;
