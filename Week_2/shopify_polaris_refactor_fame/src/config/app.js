import HomePage from "@avada/pages/Home";
import ToDoPage from "@avada/pages/Todo";
import { HomeIcon, ListBulletedIcon } from "@shopify/polaris-icons";

export const logo = {
  topBarSource:
    "https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png",
  width: 86,
  url: "#",
  accessibilityLabel: "Shopify",
};
export const titleSidebar = "Avada Web App Todo";
export const routerSidebarConfig = {
  routes: [
    {
      lable: "Home",
      path: "/",
      icon: HomeIcon,
      element: <HomePage />,
    },
    {
      lable: "Todo",
      path: "/todoes",
      icon: ListBulletedIcon,
      element: <ToDoPage />,
    },
  ],
};
