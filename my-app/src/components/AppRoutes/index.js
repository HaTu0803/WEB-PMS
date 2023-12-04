import { Routes, Route, Navigate } from 'react-router-dom';

  import Dashboard from '../../pages/Dashboard'
  import Category from '../../pages/ParcelManagement/Category'
  import CreateOrder from '../../pages/ParcelManagement/createOrder'
  import Login from '../Login/Login'
  import EditOrder from '../../pages/ParcelManagement/editOrder'

function AppRoutes(){
  
    return (
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/QLBP/Danhmuc" element={<Category />} />
      <Route path="/QLBP/Taodonhang" element={<CreateOrder />} />
      <Route path="/QLBP/Capnhatdonhang/:mailID" element={<EditOrder />} />
      {/* Add more routes as needed */}
      <Route path="*" element={<Navigate to="/" />} />
      </Routes>
        
    );
   
}

export default AppRoutes;