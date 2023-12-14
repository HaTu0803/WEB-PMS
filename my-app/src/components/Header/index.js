import "./index.css";
import { DownOutlined } from "@ant-design/icons";
import { Input, Space, Badge, Dropdown, Avatar, Typography } from "antd";
import { Link } from "react-router-dom";
const { Search } = Input;

function Header() {
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const items = [
    {
      label: <a>Hồ sơ cá nhân</a>,
      key: "0",
    },
    {
      label: <a>Chính sách bảo mật</a>,
      key: "1",
    },
    {
      label: <a>Báo lỗi</a>,
      key: "2",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Link to="/" style={{ color: "red" }}>
          Đăng xuất
        </Link>
      ),
      key: "3",
      danger: true,
    },
  ];
  return (
    <div className="header-style" >
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
        placement="bottomRight"
      >
        <div className="dropdown-wrapper">
          <Avatar src="https://i.pravatar.cc/300" size={60}></Avatar>
          <div className="user-info-navbar">
            <p>Manager</p>
            <p>Admin</p>
          </div>
          <DownOutlined className="arrow-user-navbar" />
        </div>
      </Dropdown>
    </div>
  );
}

export default Header;
