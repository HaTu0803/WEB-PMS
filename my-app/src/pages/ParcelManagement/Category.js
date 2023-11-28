import React, { useState } from "react";
import "./Category.css";
import { Col, Row, Button, Form, Input, Select, Table } from "antd";
import dayjs from "dayjs";
import { DatePicker, Space } from "antd";
import { Typography } from "antd";
// import Theme from '../../themes/theme';
const { RangePicker } = DatePicker;
const { Option } = Select;

// const Todos = () => {
//   const [todos, setTodos] = useState([]);
//   useEffect(() => {
//     fetchData();
//   }, []);
// };

// const fetchData = async () => {
//   setTodos(await getTodosAPI());
// };
const onRangeChange = (dates, dateStrings) => {
  if (dates) {
    console.log("Chọn ngày: ", dates[0], ", to: ", dates[1]);
    console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
  } else {
    console.log("Clear");
  }
};

const rangePresets = [
  {
    label: "7 ngày trước",
    value: [dayjs().add(-7, "d"), dayjs()],
  },
  {
    label: "14 ngày trước",
    value: [dayjs().add(-14, "d"), dayjs()],
  },
  {
    label: "30 ngày trước",
    value: [dayjs().add(-30, "d"), dayjs()],
  },
];

const options = [
  {
    value: "1",
    label: "Not Identified",
  },
  {
    value: "2",
    label: "Closed",
  },
  {
    value: "3",
    label: "Communicated",
  },
  {
    value: "4",
    label: "Identified",
  },
  {
    value: "5",
    label: "Resolved",
  },
  {
    value: "6",
    label: "Cancelled",
  },
];

const services = [
  {
    ServiceTypeID: "DE",
    ServiceTypeName: "Chuyển phát nhanh",
  },
  {
    ServiceTypeID: "DF",
    ServiceTypeName: "Chuyển phát tiết kiệm",
  },
  {
    ServiceTypeID: "ED",
    ServiceTypeName: "Dịch vụ COD nhanh",
  },
  {
    ServiceTypeID: "EE",
    ServiceTypeName: "Economy Quốc tế",
  },
  {
    ServiceTypeID: "EF",
    ServiceTypeName: "Dịch vụ COD tiết kiệm",
  },
];

function Filter() {
  // const {greyColors} = Theme();
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <div>
      <Typography.Title level={3}>DANH MỤC</Typography.Title>
      <div>
        <Form
          labelCol={{
            span: 12,
          }}
          wrapperCol={{
            span: 20,
          }}
          layout="horizontal"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          style={{
            maxWidth: 1000,
          }}
        >
          <Row gutter={[16]}>
            <Col className="gutter-row" span={8}>
              <Form.Item label="Từ ngày - Đến ngày" name="dateRange">
                <RangePicker presets={rangePresets} onChange={onRangeChange} />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item label="Trạng thái" name="status">
                <Select
                  showSearch
                  style={{
                    width: 200,
                  }}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                >
                  {options.map((opt) => (
                    <Option key={opt.value} value={opt.value}>
                      {opt.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item label="Dịch vụ" name="service">
                <Select
                  showSearch
                  style={{
                    width: 200,
                    // color: greyColors[500]
                  }}
                  placeholder="Chọn dịch vụ"
                  optionFilterProp="children"
                  filterOption={(input, service) =>
                    (service?.ServiceTypeID ?? "").includes(input)
                  }
                >
                  {services.map((service) => (
                    <Option
                      key={service.ServiceTypeID}
                      value={service.ServiceTypeID}
                    >
                      {service.ServiceTypeID}-{service.ServiceTypeName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16]}>
            <Col className="gutter-row" span={8}>
              <Form.Item label="Mã khách hàng" name="customerId">
                <Select
                  showSearch
                  style={{
                    width: 540,
                  }}
                  placeholder=""
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                >
                  {options.map((opt) => (
                    <Option key={opt.value} value={opt.value}>
                      {opt.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" offset={10} span={4}>
              <Form.Item label="Tình trạng" name="customerStatus">
                <Select
                  showSearch
                  style={{
                    width: 200,
                  }}
                  placeholder=""
                  optionFilterProp="children"
                  filterOption={(input, service) =>
                    (service?.ServiceTypeID ?? "").includes(input)
                  }
                >
                  {services.map((service) => (
                    <Option
                      key={service.ServiceTypeID}
                      value={service.ServiceTypeID}
                    >
                      {service.ServiceTypeID}-{service.ServiceTypeName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16]}>
            <Col className="gutter-row" offset={2} span={4}>
              <Form.Item label="Input" name="input">
                <Input
                  showSearch
                  style={{
                    width: 880,
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div></div>
    </div>
  );
}

const columns = [
  {
    title: "Ngày nhận",
    dataIndex: "CreatedDate",
    sorter: true,
    // render: (name) => `${name.first} ${name.last}`,
    width: 100,
    fixed: "top",
    fixed: "left",
  },
  {
    title: "Giờ",
    dataIndex: "CreatedDate",
    width: 100,
    fixed: "top",
    fixed: "left",
  },
  {
    title: "Số vận đơn",
    dataIndex: "MailID",
    sorter: true,
    sorter: (a, b) => a.MailID - b.MailID,
    width: 200,
    fixed: "top",
    fixed: "left",
  },
  {
    title: "Tên hàng COD",
    dataIndex: "",
    // sorter: true,
    // sorter: (a, b) => a.MailID - b.MailID,
    width: 100,
  },
  {
    title: "Tên trạng thái",
    dataIndex: "MailStatus",
    sorter: true,
    sorter: (a, b) => a.MailStatus - b.MailStatus,
    width: 150,
  },
  {
    title: "Mã VĐ KH",
    dataIndex: "",
    width: 100,
  },
  {
    title: "VĐ chuyển hoàn",
    dataIndex: "",
    width: 100,
  },
  {
    title: "DV",
    dataIndex: "ServiceTypeName",
    width: 100,
  },
];
const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});
function OrderList() {
  <Table
    // rowSelection={{
    //   type: selectionType,
    //   ...rowSelection,
    // }}
    columns={columns}
    // rowKey={(record) => record.login.uuid}
    // dataSource={data}
    // pagination={tableParams.pagination}
    // loading={loading}
    // onChange={handleTableChange}
    scroll={{
      x: 2000,
      y: 400,
    }}
  />;
}
function Category() {
  return (
    <div>
      <div>
        <Filter />
      </div>
      <div>
        <OrderList />
      </div>
    </div>
  );
}
export default Category;