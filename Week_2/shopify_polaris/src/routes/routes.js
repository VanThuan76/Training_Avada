import React from "react";
import { Routes, Route } from "react-router-dom";
import ToDoPage from "@avada/pages/Todo";
import Page404 from "@avada/pages/404";
import Page500 from "@avada/pages/500";
import HomePage from "@avada/pages/Home";

const RoutesConfig = () => (
    <Routes>
      <Route index path="/" element={<HomePage />} />
      <Route exact path="todoes" element={<ToDoPage />} />
      <Route path="*" element={<Page404 />} />
      <Route path="500" element={<Page500 />} />
    </Routes>
);

export default RoutesConfig;
