import { Toast, Frame } from "@shopify/polaris";
import { useState, useCallback } from "react";

/**
 *
 * @component ToastPolaris
 *
 * @param {object} props - ToastPolaris Component Properties
 * @param {Function} props.setActive - To mount/unmount the toast
 * @param {boolean} props.active
 * @param {Node.Element} props.activator - Node.Element Trigger
 * @param {Node.Element} props.messeage - Toast Section
 * @param {string} props.title - Title Of Toast
 *
 * @returns {JSX.Element}
 */
const ToastPolaris = (props) => {
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const toastMarkup = active ? (
    <Toast content={props.messeage} onDismiss={toggleActive} />
  ) : null;

  return (
    <div className="max-h-[250px]">
      <Frame>
        {props.activator}
        {toastMarkup}
      </Frame>
    </div>
  );
};

export default ToastPolaris;
