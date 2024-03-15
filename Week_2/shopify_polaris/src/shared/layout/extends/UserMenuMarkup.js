import { TopBar } from "@shopify/polaris";
import { useCallback, useState } from "react";
/**
 *
 * @component UserMenuMarkup
 *
 * @param {object} props - Component properties
 * @param {actions: {{item}:{content: string; icon: React.ReactNode}[]}[]; name: string; initials: string} userMarkup - Required properties
 *
 * @returns {JSX.Element}
 */
const UserMenuMarkup = (props) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const toggleIsUserMenuOpen = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    []
  );
  return (
    <TopBar.UserMenu
      actions={props.userMarkup.actions}
      name={props.userMarkup.name}
      initials={props.userMarkup.initials}
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
    />
  );
};

export default UserMenuMarkup;
