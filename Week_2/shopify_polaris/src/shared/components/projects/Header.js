import * as React from "react";
import { useCallback, useState } from "react";
import {
  Box,
  Thumbnail,
  TextField,
  Icon,
  Card,
  Grid,
  Text,
} from "@shopify/polaris";
import {
  NotificationIcon,
  OrderIcon,
  SearchIcon,
} from "@shopify/polaris-icons";
import useBreakPoint from "@avada/shared/hooks/useBreakPoint";

const Header = () => {
  const breakpoint = useBreakPoint()
  const [textFieldValue, setTextFieldValue] = useState();
  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    []
  );
  return (
    <Box background="bg-fill-inverse" padding="200">
      <div className="w-full grid grid-cols-4 justify-between items-center gap-5">
        <div className="ml-2 md:ml-6 col-span-1">
          <Thumbnail source="./logoAvada.png" alt="Avada" />
        </div>
        <div className="col-span-2">
          <TextField
            type="string"
            value={textFieldValue}
            onChange={handleTextFieldChange}
            prefix={<Icon source={SearchIcon} tone="base" />}
            placehoder="Search"
            placeholder="Search"
            autoComplete="off"
          />
        </div>
        <div className="col-span-1 grid grid-cols-1 md:grid-cols-5 justify-end items-end md:gap-3 gap-1">
          <div className="hidden col-span-1 h-full md:col-span-2 md:flex justify-center items-center gap-2">
          <Box background="bg-fill-info" padding="200" borderRadius="100">
            <Icon source={NotificationIcon} tone="base" />
          </Box>
          <Box background="bg-fill-info" padding="200" borderRadius="100">
            <Icon source={OrderIcon} tone="base" />
          </Box>
          </div>
          <div className="col-span-1 md:col-span-3 bg-transparent md:bg-[#1A1A1A] pl-2 w-full grid grid-cols-1 md:grid-cols-3 justify-between items-center rounded-md">
            <div className="col-span-2 hidden md:block">
              <Text tone="text-inverse">{breakpoint === "md" ? "Thuan" : "Thuan Vu Van"}</Text>
            </div>
            <div className="flex justify-end items-end">
            <Thumbnail
              size="small"
              source="https://avatars.githubusercontent.com/u/88172491?v=4"
              alt="ThuanVV"
            />
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};
export default Header;
