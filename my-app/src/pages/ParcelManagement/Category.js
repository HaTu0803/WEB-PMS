import React, { useEffect, useState } from 'react';
import "./Category.css";
import { Col, Row, Button, Form, Input, Select, Table } from "antd";
import dayjs from "dayjs";
import { DatePicker, Space } from "antd";
import { Typography } from "antd";
import qs from 'qs';
import Popconfirm from 'antd/es/popconfirm';

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

const handleDelete = (key) => {
};

const dataSource = [];

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
    <div class="Category-style">
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
            maxWidth: 1200,
          }}
        >
          <Row gutter={[24]}>
            <Col className="gutter-row" span={8}>
              <Form.Item
                label="Từ ngày - Đến ngày"
                name="dateRange"
                // style={{ width: 400 }}
              >
                <RangePicker presets={rangePresets} onChange={onRangeChange} />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item label="Trạng thái" name="status">
                <Select
                  showSearch
                  // style={{
                  //   width: 200,
                  // }}
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
                  // style={{
                  //   width: 200,
                  //   // color: greyColors[500]
                  // }}
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
    </div>
  );
}

const columns = [
  {
    title: "Ngày nhận",
    dataIndex: "CreatedDate",
    sorter: true,
    // render: (name) => `${name.first} ${name.last}`,
    width: 200,
    fixed: "left",
  },
  {
    title: "Giờ",
    dataIndex: "CreatedDate",
    width: 200,
    fixed: "left",
  },
  {
    title: "Số vận đơn",
    dataIndex: "MailID",
    sorter: true,
    sorter: (a, b) => a.MailID - b.MailID,
    width: 200,
    fixed: "left",
  },
  {
    title: "Tên hàng COD",
    dataIndex: "",
    // sorter: true,
    // sorter: (a, b) => a.MailID - b.MailID,
    width: 200,
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
    width: 200,
  },
  {
    title: "VĐ chuyển hoàn",
    dataIndex: "",
    width: 200,
  },
  {
    title: "DV",
    dataIndex: "ServiceTypeName",
    width: 200,
  },
  {
    title: "Dịch vụ GTGT",
    dataIndex: "ServiceTypeSpecialNote",
    width: 200,
  },
  {
    title: "Loại hình",
    dataIndex: "MailType",
    width: 200,
  },
  {
    title: "Giá trị khai",
    dataIndex: "DeclaredValue",
    width: 200,
  },
  {
    title: "Số lượng",
    dataIndex: "PackageAmount",
    width: 200,
  },
  {
    title: "Giá cước",
    dataIndex: "BasicFee",
    width: 200,
  },
  {
    title: "Cước DVGT",
    dataIndex: "",
    width: 200,
  },
  {
    title: "% PP xăng dầu",
    dataIndex: "",
    width: 200,
  },
  {
    title: "PP xăng dầu",
    dataIndex: "",
    width: 200,
  },
  {
    title: "% VAT",
    dataIndex: "",
    width: 200,
  },
  {
    title: "VAT",
    dataIndex: "VATFee",
    width: 200,
  },
  {
    title: "Thành tiền",
    dataIndex: "TotalFee",
    width: 200,
  },
  {
    title: "TL thực",
    dataIndex: "MailRealWeight",
    width: 200,
  },
  {
    title: "TL",
    dataIndex: "MailTotalWeight",
    width: 200,
  },
  {
    title: "TLQĐ",
    dataIndex: "MailConvertedWeight",
    width: 200,
  },
  {
    title: "Dài",
    dataIndex: "MailLength",
    width: 200,
  },
  {
    title: "Rộng",
    dataIndex: "MailWidth",
    width: 200,
  },
  {
    title: "Cao",
    dataIndex: "MailHeight",
    width: 200,
  },
  {
    title: "BC hiện tại",
    dataIndex: "",
    width: 200,
  },
  {
    title: "TT",
    dataIndex: "",
    width: 200,
  },
  {
    title: "NV nhập",
    dataIndex: "CreatedUser",
    width: 200,
  },
  {
    title: "NVGN",
    dataIndex: "",
    width: 200,
  },
  {
    title: "Mã điều tin",
    dataIndex: "",
    width: 200,
  },
  {
    title: "Nội dung",
    dataIndex: "PackageNotes",
    width: 200,
  },
  {
    title: "Ghi chú đặc biệt",
    dataIndex: "PackageNotes",
    width: 200,
  },
  {
    title: "Bên thứ 3",
    dataIndex: "",
    width: 200,
  },
  {
    title: "VĐ bên thứ 3",
    dataIndex: "",
    width: 200,
  },
  {
    title: "CP/TG",
    dataIndex: "",
    width: 200,
  },
  {
    title: "Người tạo",
    dataIndex: "PostOfficeCreatedID",
    width: 200,
  },
  {
    title: "Ngày tạo",
    dataIndex: "CreatedDate",
    width: 200,
  },
  {
    title: "Người sửa",
    dataIndex: "PostOfficeCreatedID",
    width: 200,
  },
  {
    title: "Ngày sửa",
    dataIndex: "CreatedDate",
    width: 200,
  },
  {
    title: "Mã người (gửi)",
    dataIndex: "CustomerID",
    width: 200,
  },
  {
    title: "Đại diện (gửi)",
    dataIndex: "CustomerRepresent",
    width: 200,
  },
  {
    title: "Họ tên (gửi)",
    dataIndex: "CustomerName",
    width: 200,
  },
  {
    title: "Địa chỉ (gửi)",
    dataIndex: "CustomerAddress",
    width: 400,
  },
  {
    title: "Điện thoại (gửi)",
    dataIndex: "CustomerPhoneNumber",
    width: 200,
  },
  {
    title: "Quốc gia (gửi)",
    dataIndex: "CustomerAddress",
    width: 200,
  },
  {
    title: "Tỉnh/Thành (gửi)",
    dataIndex: "CustomerAddress",
    width: 200,
  },
  {
    title: "Q/Huyện (gửi)",
    dataIndex: "CustomerAddress",
    width: 200,
  },
  {
    title: "Họ tên (nhận)",
    dataIndex: "RecieverName",
    width: 200,
  },
  {
    title: "Địa chỉ (nhận)",
    dataIndex: "ReceiverAddress",
    width: 200,
  },
  {
    title: "Điện thoại (nhận)",
    dataIndex: "ReceiverPhoneNumber",
    width: 200,
  },
  {
    title: "BC phát",
    dataIndex: "",
    width: 200,
  },
  {
    title: "TT phát",
    dataIndex: "",
    width: 150,
  },
  {
    title: "Tuyến GN phát",
    dataIndex: "",
    width: 200,
  },
  {
    title: "Mã địa chỉ (nhận)",
    dataIndex: "ReceiverPostcodeQT",
    width: 200,
  },
  {
    title: "Quốc gia (nhận)",
    dataIndex: "ReceiverNationID",
    width: 200,
  },
  {
    title: "Tỉnh/Thành (nhận)",
    dataIndex: "ReceiverProvinceID",
    width: 200,
  },
  {
    title: "Q/Huyện (nhận)",
    dataIndex: "ReceiverDistrictID",
    width: 200,
  },
  {
    title: "P/Xã (nhận)",
    dataIndex: "ReceiverWardID",
    width: 200,
  },
  {
    title: "Khu phố (nhận) ",
    dataIndex: "ReceiverAddressID",
    width: 200,
  },
  {
    title: "Địa chỉ chi tiết",
    dataIndex: "ReceiverDetailedAddress",
    width: 200,
    fixed: "right",
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    render: (_, record) =>
      dataSource.length >= 1 ? (
        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
          <a>Delete</a>
        </Popconfirm>
      ) : null,
  }
];

const data = [
  {
    key: "1",
    CreatedDate: "2021-08-01",
    MailID: "123456789",
    MailStatus: "Đã phát",
    ServiceTypeName: "Chuyển phát nhanh",
  },
  {
    key: "2",
    CreatedDate: "2021-08-01",
    MailID: "123456789",
    MailStatus: "Đã phát",
    ServiceTypeName: "Chuyển phát nhanh",
  },
  {
    key: "3",
    CreatedDate: "2021-08-01",
    MailID: "123456789",
    MailStatus: "Đã phát",
    ServiceTypeName: "Chuyển phát nhanh",
  },
  {
    key: "4",
    CreatedDate: "2021-08-01",
    MailID: "123456789",
    MailStatus: "Đã phát",
    ServiceTypeName: "Chuyển phát nhanh",
  },
  {
    key: "5",
    CreatedDate: "2021-08-01",
    MailID: "123456789",
    MailStatus: "Đã phát",
    ServiceTypeName: "Chuyển phát nhanh",
  },
  {
    key: "6",
    CreatedDate: "2021-08-01",
    MailID: "123456789",
    MailStatus: "Đã phát",
    ServiceTypeName: "Chuyển phát nhanh",
  },
  {
    key: "7",
    CreatedDate: "2021-08-01",
    MailID: "123456789",
    MailStatus: "Đã phát",
    ServiceTypeName: "Chuyển phát nhanh",
  },
  {
    key: "8",
    CreatedDate: "2021-08-01",
    MailID: "123456789",
    MailStatus: "Đã phát",
    ServiceTypeName: "Chuyển phát nhanh",
  },
  {
    key: "9",
    CreatedDate: "2021-08-01",
    MailID: "123456789",
    MailStatus: "Đã phát",
    ServiceTypeName: "Chuyển phát nhanh",
  },
];
const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});
function OrderList() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const fetchData = () => {
    setLoading(true);
    fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };
  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      // Column configuration not to be checked
      MailID: record.MailID,
    }),
  };
  const [selectionType] = useState("checkbox");
  return (
    <Table
      rowSelection={{
        type: selectionType,
        ...rowSelection,
      }}
      columns={columns}
      // rowKey={(record) => record.login.uuid}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
      size="middle"
      scroll={{
        x: 'calc(700px + 50%)',
        y: 300,
      }}
    />
  );
};
function Category() {
  return (
    <>
      <Filter />
      <OrderList />
    </>
  );
};
export default Category;
