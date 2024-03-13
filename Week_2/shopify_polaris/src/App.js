import { useEffect, useState } from "react";
import { Text, Button, Spinner, Page, Bleed } from "@shopify/polaris";

import FormCreate from "@avada/shared/components/projects/FormCreate";
import { fetchAsync } from "@avada/core/fetch";
import { useAppDispatch, useAppSelector } from "@avada/shared/hooks/useRedux";
import { changeTodos, confirm, getTodo } from "@avada/shared/store/slice";
import ListButtonAction from "@avada/shared/components/projects/ListButtonAction";
import { TODOES_STATUS } from "@avada/shared/constant";
import LayoutPolaris from "@avada/shared/components/Layout";
import ModalPolaris from "@avada/shared/components/shopify_polaris/Modal";
import CardTodo from "@avada/shared/components/projects/CardTodo";
import PaginationPolaris from "@avada/shared/components/shopify_polaris/Pagination";

const App = () => {
  const dispatch = useAppDispatch();
  const { todos, checkbox, isConfirmed } = useAppSelector(
    (state) => state.appSlice
  );
  const [changeTodo, setChangeTodo] = useState([]);
  const [limit, setLimit] = useState(5);
  const [count, setCount] = useState(0);
  const [isShowFormCreate, setIsShowFormCreate] = useState(false);
  useEffect(() => {
    const getLimitFromUrl = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const limitParam = urlParams.get("limit");
      return limitParam ? parseInt(limitParam, 10) : 5;
    };
    const limit = getLimitFromUrl();
    setLimit(limit);
    
    const getData = async () => {
      try {
        const res = await fetchAsync(`/todos?limit=${limit}`);
        setCount(res.count);
        dispatch(getTodo(res.data));
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [limit]);
  useEffect(() => {
    dispatch(changeTodos(changeTodo));
  }, [changeTodo.length > 0]);

  return (
    <LayoutPolaris>
      <Page fullWidth>
        <Bleed marginBlock={"200"}>
          <div className="w-full flex flex-col justify-center items-center gap-5">
            <div className="w-full flex justify-between items-center">
              <Text
                variant="heading2xl"
                fontSize={{ xs: "32px", sm: "28px", md: "24px" }}
                as="h2"
              >
                Todoes Avada
              </Text>
              <Button
                type="button"
                onClick={() => setIsShowFormCreate(!isShowFormCreate)}
              >
                Create
              </Button>
            </div>
            <div className="w-full min-h-[300px] md:min-h-[450px]">
              {todos.length > 1 ? (
                todos.map((item, idx) => {
                  return <CardTodo key={idx} data={item} />;
                })
              ) : (
                <Spinner
                  accessibilityLabel="Small spinner example"
                  size="small"
                />
              )}
              <PaginationPolaris
                label={`5 records / page`}
                setLimit={setLimit}
                limit={limit}
                isNext={count >= limit}
              />
            </div>
          </div>
          {/* //Modal Extend */}
          {isShowFormCreate && (
            <ModalPolaris
              title="Create Todo"
              body=<FormCreate setIsToggle={setIsShowFormCreate} />
              active={isShowFormCreate}
              setActive={setIsShowFormCreate}
            />
          )}
          {checkbox.length > 1 && (
            <div className="absolute p-3 md:p-5 bottom-0 left-0 w-full min-h-[70px] flex flex-col md:flex-row justify-center items-center gap-3 bg-gray-700 dark:bg-gray-200">
              <ListButtonAction
                data={checkbox}
                actions={TODOES_STATUS}
                setChangeDataAction={setChangeTodo}
                setIsAction={() => dispatch(confirm(isConfirmed))}
              />
            </div>
          )}
        </Bleed>
      </Page>
    </LayoutPolaris>
  );
};

export default App;
