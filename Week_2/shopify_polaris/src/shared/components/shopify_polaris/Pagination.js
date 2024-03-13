import { Pagination } from "@shopify/polaris";
import React from "react";

/**
 *
 * @component PaginationPolaris
 *
 * @param {object} props - PaginationPolaris Component Properties
 *
 * @returns {JSX.Element}
 */
const PaginationPolaris = (props) => {
  const handlePrevious = () => {
    const newLimit = Math.max(props.limit - 5, 1);
    props.setLimit(newLimit);
    updateUrl(newLimit);
  };
  const handleNext = () => {
    props.setLimit(props.limit + 5);
    updateUrl(props.limit + 5);
  };

  const updateUrl = (newLimit) => {
    const baseUrl = window.location.origin + window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("limit", newLimit);
    const newUrl = `${baseUrl}?${searchParams.toString()}`;
    window.history.pushState({}, "", newUrl);
  };

  return (
    <div className="max-w-[300px] mx-auto mt-3">
      <Pagination
        onPrevious={handlePrevious}
        onNext={handleNext}
        type="table"
        hasNext={props.isNext}
        label={props.label}
      />
    </div>
  );
};
export default PaginationPolaris;
