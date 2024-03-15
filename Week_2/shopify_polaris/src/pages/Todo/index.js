import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LegacyCard,
  ResourceList,
  Page,
  Bleed,
  Scrollable,
} from "@shopify/polaris";

import FormCreate from "@avada/shared/components/projects/FormCreate";
import { fetchAsync } from "@avada/core/fetch";
import { useAppDispatch, useAppSelector } from "@avada/shared/hooks/useRedux";
import {
  changeTodos,
  confirm,
  getTodo,
  setLoading,
} from "@avada/shared/store/slice";
import { TODOES_STATUS } from "@avada/shared/constant";
import ModalPolaris from "@avada/shared/components/shopify_polaris/Modal";
import CardTodo from "@avada/shared/components/projects/CardTodo";
import FormConfirm from "@avada/shared/components/projects/FormConfirm";
import { sortByDate } from "@avada/shared/utils/sortByDate";
import { getQueryUrl } from "@avada/shared/utils/getCurrentQuery";

const ToDoPage = () => {
  const dispatch = useAppDispatch();
  const { todos, isConfirmed, isLoading, todosChanged, search } =
    useAppSelector((state) => state.appSlice);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [changeTodo, setChangeTodo] = useState([]);
  const [limit, setLimit] = useState(
    parseInt(searchParams.get("limit"), 10) || 5
  );
  const [sort, setSort] = useState("desc");
  const [count, setCount] = useState(0);
  const [isShowFormCreate, setIsShowFormCreate] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState("DATE_MODIFIED_DESC");
  const handlePrevious = () => {
    const newLimit = limit - 5;
    setLimit(newLimit);
    navigate({
      search: `?limit=${newLimit}`,
    });
  };
  const handleNext = () => {
    const newLimit = limit + 5;
    setLimit(newLimit);
    navigate({
      search: `?limit=${newLimit}`,
    });
  };
  const handlerBulkActions = () => {
    const actions = ["INCOMPLETE", "COMPLETE", "DELETE"];
    const handlerChangeMultiple = (data) => {
      dispatch(confirm(isConfirmed));
      const todosChanged = data.filter(
        (todo) => selectedItems.find((item) => item === todo.id) && todo
      );
      dispatch(changeTodos(todosChanged));
    };
    return actions.map((action) => {
      return {
        content: action,
        onAction: () => {
          const data = todos.map((todo) => ({
            ...todo,
            status: action === "INCOMPLETE" ? 2 : action === "COMPLETE" ? 1 : 0,
          }));
          handlerChangeMultiple(data);
        },
      };
    });
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchAsync(
          `/todos?limit=${limit}&orderBy=${sort}&search=${search}`
        );
        if (res.status === 200) {
          setCount(res.count);
          dispatch(getTodo(res.data));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [limit, sort]);

  useEffect(() => {
    dispatch(changeTodos(changeTodo));
  }, [changeTodo]);

  return (
    <Page
      fullWidth
      title="Table Todo"
      primaryAction={{
        content: "Create",
        onAction: () => setIsShowFormCreate(!isShowFormCreate),
      }}
    >
      <Bleed marginBlock={"200"}>
        <Scrollable style={{ height: "500px" }}>
          <LegacyCard>
            <ResourceList
              loading={isLoading}
              resourceName={{ singular: "todo", plural: "todoes" }}
              items={isLoading ? [] : todos}
              renderItem={(todo) => {
                return (
                  <CardTodo
                    data={todo}
                    actions={TODOES_STATUS}
                    setChangeDataAction={setChangeTodo}
                    setIsAction={() => dispatch(confirm(isConfirmed))}
                  />
                );
              }}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              bulkActions={handlerBulkActions()}
              sortValue={sortValue}
              sortOptions={[
                { label: "Newest update", value: "desc" },
                { label: "Oldest update", value: "asc" },
              ]}
              onSortChange={(selected) => {
                setSort(selected);
                setSortValue(selected);
                dispatch(
                  getTodo(sortByDate({ data: todos, orderBy: selected }))
                );
                navigate({
                  pathname: location.pathname,
                  search: getQueryUrl({
                    location,
                    query: "orderBy",
                    value: selected,
                  }),
                });
              }}
              pagination={{
                hasNext: count >= limit,
                hasPrevious: limit !== 5,
                onNext: () => handleNext(),
                onPrevious: () => handlePrevious(),
                label: "5 records / page",
                type: "table",
              }}
            />
          </LegacyCard>
        </Scrollable>
      </Bleed>
      {isShowFormCreate && (
        <ModalPolaris
          title="Create Todo"
          body=<FormCreate setIsToggle={setIsShowFormCreate} />
          active={isShowFormCreate}
          setActive={setIsShowFormCreate}
        />
      )}
      {isConfirmed && (
        <ModalPolaris
          title="Confirm again!"
          body={
            <FormConfirm
              setIsToggle={() => dispatch(confirm(isConfirmed))}
              data={todosChanged}
            />
          }
          active={isConfirmed}
          setActive={() => dispatch(confirm(isConfirmed))}
        />
      )}
    </Page>
  );
};

export default ToDoPage;
