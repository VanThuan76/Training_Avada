import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useQuery from "@avada/hooks/api/useQuery";
import { parseURLSearch } from "@avada/helpers/utils/parseUrl";

/**
 *
 * @param {url: string, defaultParams: {page: number; size: number; sorts: {field: string; direction: 'desc' | 'asc'}}} ctx
 * @returns {{data, isLoading, refetch, currentPage, paginationConfig, onSortChange}}
 */

const usePagination = (ctx) => {
  const { defaultParams, defaultData, url } = ctx;
  const { page, size, sorts } = defaultParams;
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(page);
  const queryString = parseURLSearch("page", location, sorts);

  const onSortChange = (param = "page | size", value) => {
    const queryParams = new URLSearchParams(location.search);
    const oldQuery = Object.fromEntries(queryParams.entries());
    if (value === undefined) {
      delete oldQuery[param];
    } else {
      oldQuery[param] = value;
    }
    if (param !== "page") {
      oldQuery.page = "1";
    }
    navigate({
      pathname: location.pathname,
      search: new URLSearchParams(oldQuery).toString(),
    });
    refetch();
  };
  const handlePrevious = () => {
    const newPage = currentPage - 1;
    setCurrentPage(newPage);
    navigate({
      search: `?page=${currentPage}`,
    });
    refetch();
  };
  const handleNext = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    navigate({
      search: `?page=${currentPage}`,
    });
    refetch();
  };
  const { data, isLoading, refetch } = useQuery({
    name: "PAGINATION",
    defaultData: defaultData,
    url: `${url}${queryString}`,
    onSuccess: () =>
      navigate({
        pathname: location.pathname,
        search: queryString,
      }),
  });
  const paginationConfig = {
    hasNext: currentPage < data.totalPage,
    hasPrevious: currentPage !== 1,
    onNext: () => handleNext(),
    onPrevious: () => handlePrevious(),
    label: `5 records / page`,
    type: "table",
  };
  return {
    data,
    isLoading,
    refetch,
    currentPage,
    paginationConfig,
    onSortChange,
  };
};

export default usePagination;
