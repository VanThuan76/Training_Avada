import { TopBar, ActionList, Icon } from "@shopify/polaris";
import { useState, useCallback } from "react";
import SecondaryMenuMarkup from "@avada/shared/layout/extends/SecondaryMenuMarkup";
import UserMenuMarkup from "@avada/shared/layout/extends/UserMenuMarkup";
import { NotificationIcon, SidekickIcon } from "@shopify/polaris-icons";

const TopBarPolaris = (props) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSidekickOpen, setIsSidekickOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
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
    console.log(value)
    setIsSearchActive(value.length > 0);
  }, []);

  const searchResultsMarkup = (
    <ActionList
      items={[
        { content: "Shopify help center" },
        { content: "Community forums" },
      ]}
    />
  );
  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchChange}
      value={searchValue}
      placeholder="Search"
      showFocusBorder
    />
  );

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
    name: "Stellar Interiors",
    initials: "T",
    actions: []
  }
  return (
    <TopBar
      showNavigationToggle
      userMenu={<UserMenuMarkup userMarkup={userMarkup}/>}
      secondaryMenu={<SecondaryMenuMarkup menuMarkups={menuMarkups} />}
      searchResultsVisible={isSearchActive}
      searchField={searchFieldMarkup}
      searchResults={searchResultsMarkup}
      onSearchResultsDismiss={handleSearchResultsDismiss}
      {...props}
    />
  );
};
export default TopBarPolaris;
