import { useCallback, useState } from "react";
import { Frame } from "@shopify/polaris";
import TopBar from "@avada/shared/layout/TopBar";
import FooterBar from "@avada/shared/layout/FooterBar";
import SidebarNav from "@avada/shared/layout/SidebarNav";
import LoadingMarkup from "@avada/shared/layout/extends/LoadingMarkup";
import { useAppSelector } from "@avada/shared/hooks/useRedux";
import { logo } from "@avada/core/config";
/**
 *
 * @component Layout
 *
 * @param {object} props - Component properties
 * @param {React.Node} props.children
 *
 * @returns {JSX.Element}
 */
const LayoutPolaris = (props) => {
  const { isLoading } = useAppSelector((state) => state.appSlice);
  const [isSidebar, setIsSidebar] = useState(false);
  const toggleSidebar = useCallback(() => setIsSidebar(!isSidebar), []);
  const pageMarkup = isLoading ? <LoadingMarkup /> : props.children;
  return (
    <Frame
      logo={logo}
      globalRibbon={<FooterBar />}
      topBar={<TopBar onNavigationToggle={toggleSidebar} />}
      navigation={<SidebarNav />}
      showMobileNavigation={isSidebar}
      onNavigationDismiss={toggleSidebar}
    >
      {props.children}
    </Frame>
  );
};
export default LayoutPolaris;
