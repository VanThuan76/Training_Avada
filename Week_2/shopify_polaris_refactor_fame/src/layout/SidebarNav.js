import { routerSidebarConfig, titleSidebar } from "@avada/config/app";
import { Navigation } from "@shopify/polaris";
import { useNavigate, useLocation } from "react-router-dom";

const SidebarNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <Navigation location="/">
      <Navigation.Section
        separator
        title={titleSidebar}
        items={routerSidebarConfig.routes.map((route, idx) => {
          return {
            key: idx,
            label: route.lable,
            icon: route.icon && route.icon,
            url: route.path,
            onClick: () => navigate(route.path),
            selected: pathname === route.path,
          };
        })}
      />
    </Navigation>
  );
};

export default SidebarNav;
