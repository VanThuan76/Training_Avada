import { TopBar, ActionList, Icon } from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";
import SecondaryMenuMarkup from "@avada/layout/extends/SecondaryMenuMarkup";
import UserMenuMarkup from "@avada/layout/extends/UserMenuMarkup";
import { NotificationIcon, SidekickIcon } from "@shopify/polaris-icons";
import { useDebounce } from "@avada/hooks/useDebounce";
import useQuery from "@avada/hooks/api/useQuery";
import { useNavigate, useLocation } from "react-router-dom";
import { parseURLSearch } from "@avada/helpers/utils/parseUrl";

const HeaderBar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSidekickOpen, setIsSidekickOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchDebouce = useDebounce(searchValue, 300)
  const queryString = parseURLSearch("page", location.search, [
    { field: "search", direction: searchValue },
  ]);
  const { data, isLoading, refetch } = useQuery({
    name: "SEARCH",
    defaultData: [{ content: "" }],
    url: `${process.env.REACT_APP_API_URL}/todos${queryString}`,
    enabled: searchDebouce === searchValue && searchValue !== "",
    onSuccess: () =>{
      navigate({
        pathname: location.pathname,
        search: queryString,
      })
    }
  });
  const toggleNotification = useCallback(
    () => setIsNotificationOpen((isNotificationOpen) => !isNotificationOpen),
    []
  );
  const toggleSidekickOpen = useCallback(
    () => setIsSidekickOpen((isSidekickOpen) => !isSidekickOpen),
    []
  );

  const handleSearchResultsDismiss = useCallback(() => {
    setIsSearchActive(false);
    setSearchValue("");
  }, []);

  const handleSearchChange = useCallback((value) => {
    setSearchValue(value);
    setIsSearchActive(value.length > 0);
  }, []);

  useEffect(() => {
    if (searchDebouce) {
      refetch();
    }
  }, [searchDebouce]);

  const menuMarkups = [
    {
      icon: <Icon source={SidekickIcon} />,
      contents: [{ content: ":>" }],
      open: isSidekickOpen,
      onOpen: toggleSidekickOpen,
      onClose: toggleSidekickOpen,
    },
    {
      icon: <Icon source={NotificationIcon} />,
      contents: [{ content: ":<" }],
      open: isNotificationOpen,
      onOpen: toggleNotification,
      onClose: toggleNotification,
    },
  ];
  const userMarkup = {
    name: "Vu Van Thuan",
    initials: "T",
    actions: [],
  };
  return (
    <TopBar
      showNavigationToggle
      userMenu={<UserMenuMarkup userMarkup={userMarkup} />}
      secondaryMenu={<SecondaryMenuMarkup menuMarkups={menuMarkups} />}
      searchResultsVisible={isSearchActive}
      searchField={
        <TopBar.SearchField
          onChange={handleSearchChange}
          value={searchValue}
          placeholder="Search"
          showFocusBorder
        />
      }
      searchResults={<ActionList items={data.data && data.data.map(item => ({content: item.title}))} />}
      onSearchResultsDismiss={handleSearchResultsDismiss}
      {...props}
    />
  );
};
export default HeaderBar;
