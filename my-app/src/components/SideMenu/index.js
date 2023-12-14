import "./index.css";
import { Input, Space, Menu, Image } from "antd";
import { MenuUnfoldOutlined, DashboardOutlined, OrderedListOutlined, InfoCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SideMenu() {
  const { Search } = Input;
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const navigate = useNavigate();
  return (
    <div className="sider-style">
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
        width={250}
        src="https://khachhang-dev.247post.vn/img/logo_v2.png"
        alt="logo"
      />
      <Space direction="vertical">
        <Search
          placeholder="Tìm kiếm danh mục"
          onSearch={onSearch}
          style={{
            width: 250,
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
            label: "Dashboard",
            icon: <DashboardOutlined />,
            key: "/home/dashboard",
          },
          {
            label: "Quản lý bưu phẩm ",
            icon: <OrderedListOutlined />,
            children: [
              {
                label: "Danh mục",
                key: "/home/QLBP/Danhmuc",
              },
              {
                label: "Tạo đơn hàng",
                key: "/home/QLBP/Taodonhang",
              },
            ],
          },
          {
            label: "Thông tin khách hàng",
            icon: <InfoCircleOutlined />,
            key: "/home/QLKH/Danhsach",
          },
        ]}
        
        defaultSelectedKeys={["/home/QLBP/Danhmuc"]}
        // defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
      />
        </div>
      
    </div>
  );
}

export default SideMenu;
