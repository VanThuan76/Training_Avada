import { TextField } from "@shopify/polaris";
import { useState, useCallback } from "react";

/**
 *
 * @component TextFieldPolaris
 *
 * @param {object} props - TextField Component properties
 * @param {string} props.lable
 *
 * @returns {JSX.Element}
 */
export function TextFieldPolaris(props) {
  const [value, setValue] = useState("");
  const handleChange = useCallback((newValue) => setValue(newValue), []);

  return (
    <TextField
      value={value}
      autoComplete="off"
      {...props}
    />
  );
}
