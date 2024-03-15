import RoutesConfig from "@avada/routes/routes";
import { BrowserRouter } from "react-router-dom";
import LayoutPolaris from "./shared/layout/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <LayoutPolaris>
        <RoutesConfig />
      </LayoutPolaris>
    </BrowserRouter>
  );
};

export default App;
