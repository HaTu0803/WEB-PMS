import {
    Routes,
    Route
  } from "react-router-dom";

  import Dashboard from '../../pages/Dashboard'
  import Category from '../../pages/ParcelManagement/Category'
  import CreateOrder from '../../pages/ParcelManagement/createOrder'

function AppRoutes(){
  
    return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/QLBP/Danhmuc" element={<Category />} />
        <Route path="/QLBP/Taodonhang" element={<CreateOrder />} />

      </Routes>
        
    );
   
}

export default AppRoutes;