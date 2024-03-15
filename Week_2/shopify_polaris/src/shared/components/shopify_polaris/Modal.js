import { Frame, Modal } from "@shopify/polaris";
import { useCallback } from "react";

/**
 *
 * @component ModalPolaris
 *
 * @param {object} props - ModalPolaris Component Properties
 * @param {Function} props.setActive - To mount/unmount the modal
 * @param {boolean} props.active
 * @param {Node.Element} props.activator - Node.Element Trigger
 * @param {Node.Element} props.body - Modal Section
 * @param {string} props.title - Title Of Modal
 *
 * @returns {JSX.Element}
 */
const ModalPolaris = (props) => {
  const handleChange = useCallback(
    () => props.setActive(!props.active),
    [props.active]
  );

  return (
    <Frame>
      <Modal
        activator={props.activator}
        open={props.active}
        onClose={handleChange}
        title={props.title}
      >
        <Modal.Section>{props.body}</Modal.Section>
      </Modal>
    </Frame>
  );
};
export default ModalPolaris;
