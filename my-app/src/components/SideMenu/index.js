import "./index.css";
import { Input, Space, Menu, Image } from "antd";
import { MenuUnfoldOutlined, DashboardOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// function getItem(label, key, icon, children, type) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//     type,
//   };
// }
// const items = [
//   getItem('Dashboard', '/', <DashboardOutlined />),
//   getItem('QUẢN LÝ BƯU PHẨM', '/QLBP', <MenuUnfoldOutlined />, [
//     getItem('Danh mục', '/QLBP/Danhmuc'),
//     getItem('Tạo đơn hàng', '/QLBP/Taodonhang'),
//   ]),
// ];
// const onClick = (e) => {
//   console.log('click', e);
// };
function SideMenu() {
  const { Search } = Input;
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const navigate = useNavigate();
  return (
    <div className="sider-style" style={{ width: 256 }}>
      {/* <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}

      </Button> */}
      <Image
        width={256}
        src="https://khachhang-dev.247post.vn/img/logo_v2.png"
        alt="logo"
      />
      <Space direction="vertical">
        <Search
          placeholder="Tìm kiếm danh mục"
          onSearch={onSearch}
          style={{
            width: 256,
          }}
        />
      </Space>
      <div className="Menu-style">
      <Menu
        onClick={(item) => {
          navigate(item.key);
        }}
        items={[
          {
            label: "DASHBOARD",
            icon: <DashboardOutlined />,
            key: "/",
          },
          {
            label: "QUẢN LÝ BƯU PHẨM",
            icon: <MenuUnfoldOutlined />,
            children: [
              {
                label: "Danh mục",
                key: "/QLBP/Danhmuc",
              },
              {
                label: "Tạo đơn hàng",
                key: "/QLBP/Taodonhang",
              },
            ],
          },
        ]}
        defaultSelectedKeys={["/"]}
        // defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
      />
        </div>
      
    </div>
  );
}

export default SideMenu;
