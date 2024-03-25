import { useCallback, useState, useReducer } from "react";
import { Frame } from "@shopify/polaris";
import HeaderBar from "@avada/layout/HeaderBar";
import FooterBar from "@avada/layout/FooterBar";
import SidebarNav from "@avada/layout/SidebarNav";
import LoadingMarkup from "@avada/layout/extends/LoadingMarkup";
import { logo } from "@avada/config/app";
import { reducerSlice } from "@avada/actions/storeActions";
import { initialState } from "@avada/reducers/store";
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
  const [state, dispatch] = useReducer(reducerSlice, initialState);
  const [isSidebar, setIsSidebar] = useState(false);
  const toggleSidebar = useCallback(() => setIsSidebar(!isSidebar), []);
  const pageMarkup = state.isLoading ? <LoadingMarkup /> : props.children;
  return (
    <Frame
      logo={logo}
      globalRibbon={<FooterBar />}
      topBar={<HeaderBar onNavigationToggle={toggleSidebar} />}
      navigation={<SidebarNav />}
      showMobileNavigation={isSidebar}
      onNavigationDismiss={toggleSidebar}
    >
      {props.children}
    </Frame>
  );
};
export default LayoutPolaris;
