import CardTodo from "@avada/shared/components/projects/CardTodo";
import { Text, Button, Spinner } from "@shopify/polaris";
import PaginationPolaris from "./shared/components/shopify_polaris/Pagination";

const Todo = (props) => {
  return (
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
          onClick={() => props.setIsShowFormCreate(!props.isShowFormCreate)}
        >
          Create
        </Button>
      </div>
      <div className="w-full min-h-[300px] md:min-h-[450px]">
        {props.todos.length > 1 ? (
          props.todos.map((item, idx) => {
            return <CardTodo key={idx} data={item} />;
          })
        ) : (
          <Spinner accessibilityLabel="Small spinner example" size="small" />
        )}
      </div>
      <PaginationPolaris label={`${props.todos.length} records / page`} />
    </div>
  );
};

export default Todo;
