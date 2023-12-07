import "./App.css";
import "./index.css";

import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/ParcelManagement/Category";
import CreateOrder from "./pages/ParcelManagement/createOrder";
import EditOrder from "./pages/ParcelManagement/editOrder";
import Login from "./components/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="QLBP/Danhmuc" element={<Category />} />
          <Route path="QLBP/Taodonhang" element={<CreateOrder />} />
          <Route path="QLBP/Capnhatdonhang/:mailID" element={<EditOrder />} />
          <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );

  // <ThemeCustomization>
  //   <ScrollTop>
  //     <Routes />
  //   </ScrollTop>
  // </ThemeCustomization>
}

export default App;
