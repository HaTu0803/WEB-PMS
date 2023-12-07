import { Outlet } from "react-router-dom";
import SideMenu from "../../components/SideMenu";
import Header from "../../components/Header";
import "./MainLayout.css";

const MainLayout = () => {
  return (
    <div className="container-wrapper">
      <div className="content-col-left">
        <SideMenu />
      </div>
      <div className="content-col-right">
        <Header />
        <div className="content-style">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
