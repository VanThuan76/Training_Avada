import { useCallback, useEffect, useReducer, useState } from "react";
import {
  LegacyCard,
  ResourceList,
  Page,
  Bleed,
  Scrollable,
  Modal,
} from "@shopify/polaris";

import FormCreate from "@avada/components/Form/FormCreate";
import FormConfirm from "@avada/components/Form/FormConfirm";
import usePagination from "@avada/hooks/api/usePagination";
import CardTodo from "@avada/pages/Todo/Card";
import {
  DEFAULT_PARAMS,
  SORT_OPTIONS,
  TODOES_STATUS,
} from "@avada/constant/table";
import {
  reducerSlice,
  setChangeTodos,
  setConfirm,
} from "@avada/actions/storeActions";
import { initialState } from "@avada/reducers/store";
import { getTodo } from "@avada/actions/todo";

const ToDoPage = () => {
  const [state, dispatch] = useReducer(reducerSlice, initialState);
  const { isConfirmed, todosChanged, isLoading: loadingState } = state;
  const [isShowFormCreate, setIsShowFormCreate] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState(DEFAULT_PARAMS.sorts[0].direction); //Default
  const {
    data: todos,
    paginationConfig,
    onSortChange,
  } = usePagination({
    url: `${process.env.REACT_APP_API_URL}/todos`,
    defaultData: [],
    defaultParams: DEFAULT_PARAMS,
  });

  useEffect(() => {
    if(todos.data && todos.data.length > 0){
      getTodo(dispatch, todos.data)
    }
  }, [todos.data]);

  const handlerBulkActions = () => {
    const actions = ["INCOMPLETE", "COMPLETE", "DELETE"];
    const handlerChangeMultiple = (data) => {
      setConfirm(dispatch, isConfirmed);
      const todosChange = data.filter(
        (todo) => selectedItems.find((item) => item === todo.id) && todo
      );
      setChangeTodos(dispatch, todosChange);
    };
    return actions.map((action) => {
      return {
        content: action,
        onAction: () => {
          const data = todos.data.map((todo) => ({
            ...todo,
            status: action === "INCOMPLETE" ? 2 : action === "COMPLETE" ? 1 : 0,
          }));
          handlerChangeMultiple(data);
        },
      };
    });
  };
  const handleClose = useCallback(
    () => setIsShowFormCreate(!isShowFormCreate),
    [isShowFormCreate]
  );
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
              loading={loadingState}
              resourceName={{ singular: "todo", plural: "todoes" }}
              items={loadingState ? [] : state.todos}
              renderItem={(todo) => {
                return (
                  <CardTodo
                    data={todo}
                    actions={TODOES_STATUS}
                    dispatch={dispatch}
                    setIsAction={() => setConfirm(dispatch, isConfirmed)}
                  />
                );
              }}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              bulkActions={handlerBulkActions()}
              sortValue={sortValue}
              sortOptions={SORT_OPTIONS}
              onSortChange={(selected) => {
                onSortChange('updated_at', selected)
                setSortValue(selected)
              }}
              pagination={paginationConfig}
            />
          </LegacyCard>
        </Scrollable>
      </Bleed>
      <Modal open={isShowFormCreate} onClose={handleClose} title="Create Todo">
        <Modal.Section>
          <FormCreate setIsToggle={setIsShowFormCreate} />
        </Modal.Section>
      </Modal>
      <Modal
        open={isConfirmed}
        onClose={() => setConfirm(dispatch, isConfirmed)}
        title="Confirm again!"
      >
        <Modal.Section>
          <FormConfirm
            setIsToggle={() => setConfirm(dispatch, isConfirmed)}
            data={todosChanged}
            dispatch={dispatch}
            setSelectedItems={setSelectedItems}
          />
        </Modal.Section>
      </Modal>
    </Page>
  );
};

export default ToDoPage;
