import Header from "./components/Header/index";
import SideMenu from "./components/SideMenu/index";
import Content from "./components/Content/index";
import Footer from "./components/Footer/index";
import Login from "./components/Login/Login";
import "./App.css";
import {theme, Space,Layout} from "antd";

  function App() {
  
    return <div>
     <Layout className="flex-row">
      <SideMenu> </SideMenu>
      <Layout>
        <Header></Header>
        <Content></Content>
      </Layout>
    </Layout>
   <Login></Login>

    </div>


  // <ThemeCustomization>
  //   <ScrollTop>
  //     <Routes />
  //   </ScrollTop>
  // </ThemeCustomization>

}

export default App;
