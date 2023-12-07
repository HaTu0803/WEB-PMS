import React, { useEffect, useState } from "react";
import "./Category.css";
import {
  Col,
  Row,
  Button,
  Form,
  Input,
  Select,
  Table,
  InputNumber,
  Popconfirm,
  
} from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { DatePicker, Space } from "antd";
import { Typography } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { Modal } from "antd";
import moment from "moment";
import dayjs from "dayjs";
import { Control, Controller, useForm } from "react-hook-form";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { Option } = Select;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
function Filter({ dataSource, setDataSource }) {
  const RHFDatePickerField = (props) => {
    return (
      <Controller
      control={props.control}
      name={props.name}
      rules={{
        required: "This field is required",
      }}
      render={({ field, fieldState }) => {
        return (
          <>
            <DatePicker
              placeholder={props.placeholder}
              status={fieldState.error ? "error" : undefined}
              ref={field.ref}
              name={field.name}
              onBlur={field.onBlur}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => {
                field.onChange(date ? date.toISOString() : null);
              }}
            />
            <br />
            {fieldState.error ? (
              <span style={{ color: "red" }}>{fieldState.error?.message}</span>
            ) : null}
          </>
        );
      }}
    />
  );
};
const { handleSubmit, control, watch } = useForm({
  defaultValues: {
    startDate: '',
    endDate: '',
    status: '',
    Service: '',
  },
});

const handleFormFinish = (data) => {
  console.log('Form values:', data);
  // Place your logic for fetching data or other actions here
};

const [tempStartDate, setTempStartDate] = useState('');
  const [tempEndDate, setTempEndDate] = useState('');
  const [tempCustomerID, setTempCustomerID] = useState('');
  const [tempStatus, setTempStatus] = useState('');
  useEffect(() => {
    const startDate = watch('startDate');
    const endDate = watch('endDate');
    const customerID = watch('customerId');

    const status = watch('status');
    console.log('startDate:', startDate);
    console.log('endDate:', endDate);
    console.log('tempStartDate:', tempStartDate);
    console.log('tempEndDate:', tempEndDate);

    if (startDate !== '' && endDate !== '' && customerID != '' && (startDate !== tempStartDate || endDate !== tempEndDate || customerID !== tempCustomerID)) {
      setTempStartDate(startDate);
      setTempEndDate(endDate);
      setTempCustomerID(customerID);
      const fetchDataSources = async () => {
        const token = Cookies.get('authToken');
        const response = await axios.post(
          'http://localhost:4000/mail/GetMailByDate',
          {
            FromDate: startDate, // Use startDate directly
            ToDate: endDate,     // Use endDate directly
            MailStatus: '' ,
            serviceTypeID: '',
            CustomerID: customerID || '', // Set customerID if available, otherwise use an empty string
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDataSource(response.data);
        console.log(response.data);
      };

      fetchDataSources();
    }
  });
// useEffect(() => {
//   const fetchDataSources = async () => {
//     const token = Cookies.get("authToken");
//     const response = await axios.post(
//       'http://localhost:4000/mail/GetMailByDate', {

//     }, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     setDataSource(response.data);
//   };
//   fetchDataSources();
// // }, [watch('startDate'), watch('endDate'), watch('status'), watch('service')]);
// }, []);
const [serviceType, setServiceType] = useState([]);
  useEffect(() => {
    const fetchServiceType = async () => {
      const token = Cookies.get("authToken");
      const response = await axios.post(
        "http://localhost:4000/mail/GetServiceType",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // const defaultOption = response.data[0];
      const options = response.data.map((d) => ({
        value: d.serviceTypeID || "",
        label: d.serviceTypeName,
      }));

      // options.unshift(defaultOption);
      setServiceType(options);
    };
    fetchServiceType();
  }, []);
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const [link, setLink] = useState("");
  useEffect(() => {
    setLink(window.location.href);
  }, [link]);

  const [customer, setCustomer] = useState([]);
  const [customerID, setCustomerID] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    address: "",
    phoneNumber: "",
    label: "",
  });
  useEffect(() => {
    const fetchCustomer = async () => {
      const token = Cookies.get("authToken");
      const response = await axios.post(
        "http://localhost:4000/postoffice/GetCustomer/ABH",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const options = response.data.map((d) => ({
        value: d.customerID,
        label: d.customerName,
        address: d.address,
        phoneNumber: d.phoneNumber,
      }));
      setCustomer(options);
    };
    fetchCustomer();
  }, []);

  const handleCustomerChange = (value) => {
    setCustomerID(value);
    const selectedCustomer = customer.find((c) => c.value === value);
    setCustomerInfo(selectedCustomer);
  };

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleDeleteModalVisible = (visible) => {
    setDeleteModalVisible(visible);
  };

  return (
    <div class="Category-style">
      <Typography.Title level={3}>DANH MỤC</Typography.Title>
      <Form onFinish={handleSubmit(handleFormFinish)}
    >
     <form>
        <Row gutter={[24]}
        
      justify="space-between"  // Set justify to space-between
      align="flex-start"       // Set align to flex-start
        >
          <Col flex={5} >
          {/* <span>{JSON.stringify(watch('startDate'))}</span> */}
           {/* console.log({JSON.stringify(watch('startDate'))}); */}
            <Form.Item
              label="Từ ngày"
              name="dateRange_1"
              // style={{ width: 400 }}
              className="min-width-110"
            >
               <RHFDatePickerField
          placeholder="Từ ngày"
          control={control}
          name="startDate"
        />
            </Form.Item>
          </Col>
          <Col flex={5} >
            <Form.Item
              label="Đến ngày"
              name="dateRange_2"
              // style={{ width: 400 }}
              className="min-width-110"
            >
             <RHFDatePickerField
          placeholder="Đến ngày"
          control={control}
          name="endDate"
        />
            </Form.Item>
          </Col>
          <Col flex={5} >
            <Form.Item label="Trạng thái" name="status">
              <Select
                showSearch
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
              >
                {/* {customer.map((opt) => (
                    <Option key={opt.value} value={opt.value}>
                      {opt.label}
                    </Option>
                  ))} */}
              </Select>
            </Form.Item>
          </Col>
          <Col flex={5} >
          <Form.Item
              label="Dịch vụ"
              name="Service"
            >
              <Select showSearch placeholder="" optionFilterProp="children">
                {serviceType.map((opt) => (
                  <Option key={opt.value} value={opt.value}>
                    {opt.value} - {opt.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col flex={4} >
          <Button type="primary" htmlType="submit" style={{width:'100%'}}>
                Lấy dữ liệu
              </Button>
            </Col>
        </Row>
        </form>

        <Row gutter={[24]}>
          <Col span={16} order={1}>
            <Form.Item
              label="Mã khách hàng"
              name="customerId"
              placeholder="Chọn mã khách hàng"
              className="min-width-110"
            >
              <Select
                showSearch
                // style={{
                //   width: 540,
                // }}
                placeholder=""
                optionFilterProp="children"
                onChange={handleCustomerChange}
              >
                {customer.map((opt) => (
                  <Option key={opt.value} value={opt.value}>
                    {opt.value} - {opt.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={6} order={2}>
            <Form.Item label="Tình trạng" name="Status_2">
              <Select
                showSearch
                placeholder=""
                optionFilterProp="children"
                filterOption={(input, service) =>
                  (service?.ServiceTypeID ?? "").includes(input)
                }
              >
                {/* {services.map((service) => (
                    <Option
                      key={service.ServiceTypeID}
                      value={service.ServiceTypeID}
                    >
                      {service.ServiceTypeID}-{service.ServiceTypeName}
                    </Option>
                  ))} */}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[24]}>
          <Col span={24}>
            <Form.Item label="Input" name="input" className="min-width-110">
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
  );
}
function OrderList({ dataSource, setDataSource }) {
  const [selectionType] = useState('checkbox');

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      // Column configuration not to be checked
      mailID: record.mailID,
    }),
  };


  // const originData = [];
  // const [data, setData] = useState(originData);
  // const [editingKey, setEditingKey] = useState("");
  // const isEditing = (record) => record.key === editingKey;
  const columns = [
    {
      key: "1",
      title: "Ngày nhận",
      dataIndex: "createdDate",
      editable: true,
      sorter: true,
      // render: (name) => `${name.first} ${name.last}`,
      width: 150,
      fixed: "left",
    },
    {
      key: "2",
      title: "Giờ",
      dataIndex: "CreatedDate",
      width: 150,
      fixed: "left",
    },
    {
      key: "3",
      title: "Số vận đơn",
      dataIndex: "mailID",
      editable: true,
      sorter: true,
      sorter: (a, b) => a.mailID - b.mailID,
      width: 150,
      fixed: "left",
    },
    {
      key: "4",
      title: "Tên hàng COD",
      dataIndex: "",
      // sorter: true,
      // sorter: (a, b) => a.MailID - b.MailID,
      width: 150,
    },
    {
      key: "5",
      title: "Tên trạng thái",
      dataIndex: "mailStatus",
      editable: true,
      sorter: true,
      sorter: (a, b) => a.mailStatus - b.mailStatus,
      width: 150,
    },
    {
      key: "6",
      title: "Mã VĐ KH",
      dataIndex: "",
      width: 150,
    },
    {
      key: "7",
      title: "VĐ chuyển hoàn",
      dataIndex: "",
      width: 150,
    },
    {
      key: "8",
      title: "DV",
      dataIndex: "serviceTypeID",
      width: 150,
    },
    {
      key: "8",
      title: "Tên DV",
      dataIndex: "serviceTypeName",
      width: 150,
    },
    {
      key: "9",
      title: "Dịch vụ GTGT",
      dataIndex: "serviceTypeSpecialNote",
      width: 150,
    },
    {
      key: "10",
      title: "Loại hình",
      dataIndex: "mailType",
      width: 150,
    },
    {
      key: "11",
      title: "Giá trị khai",
      dataIndex: "declaredValue",
      width: 150,
    },
    {
      key: "12",
      title: "Số lượng",
      dataIndex: "packageAmount",
      width: 150,
    },
    {
      key: "13",
      title: "Giá cước",
      dataIndex: "basicFee",
      width: 150,
    },
    {
      key: "14",
      title: "Cước DVGT",
      dataIndex: "",
      width: 150,
    },
    {
      key: "15",
      title: "% PP xăng dầu",
      dataIndex: "",
      width: 150,
    },
    {
      key: "16",
      title: "PP xăng dầu",
      dataIndex: "fuelFee",
      width: 150,
    },
    {
      key: "17",
      title: "% VAT",
      dataIndex: "",
      width: 150,
    },
    {
      key: "18",
      title: "VAT",
      dataIndex: "vATFee",
      width: 150,
    },
    {
      key: "19",
      title: "Thành tiền",
      dataIndex: "totalFee",
      width: 150,
    },
    {
      key: "20",
      title: "TL thực",
      dataIndex: "mailRealWeight",
      width: 150,
    },
    {
      key: "21",
      title: "TL",
      dataIndex: "mailTotalWeight",
      width: 150,
    },
    {
      key: "22",
      title: "TLQĐ",
      dataIndex: "mailConvertedWeight",
      width: 150,
    },
    {
      key: "23",
      title: "Dài",
      dataIndex: "mailLength",
      width: 150,
    },
    {
      key: "24",
      title: "Rộng",
      dataIndex: "mailWidth",
      width: 150,
    },
    {
      key: "25",
      title: "Cao",
      dataIndex: "mailHeight",
      width: 150,
    },
    {
      key: "26",
      title: "BC hiện tại",
      dataIndex: "",
      width: 150,
    },
    {
      key: "27",
      title: "TT",
      dataIndex: "",
      width: 150,
    },
    {
      key: "28",
      title: "NV nhập",
      dataIndex: "CreatedUser",
      width: 150,
    },
    {
      key: "29",
      title: "NVGN",
      dataIndex: "",
      width: 150,
    },
    {
      key: "30",
      title: "Mã điều tin",
      dataIndex: "",
      width: 150,
    },
    {
      key: "31",
      title: "Nội dung",
      dataIndex: "packageNotes",
      width: 150,
    },
    {
      key: "32",
      title: "Ghi chú đặc biệt",
      dataIndex: "packageNotes",
      width: 150,
    },
    {
      key: "33",
      title: "Bên thứ 3",
      dataIndex: "",
      width: 150,
    },
    {
      key: "34",
      title: "VĐ bên thứ 3",
      dataIndex: "",
      width: 150,
    },
    {
      key: "35",
      title: "CP/TG",
      dataIndex: "",
      width: 150,
    },
    {
      key: "36",
      title: "Người tạo",
      dataIndex: "postOfficeCreatedID",
      width: 150,
    },
    {
      key: "37",
      title: "Ngày tạo",
      dataIndex: "createdDate",
      width: 150,
    },
    {
      key: "38",
      title: "Người sửa",
      dataIndex: "postOfficeCreatedID",
      width: 150,
    },
    {
      key: "39",
      title: "Ngày sửa",
      dataIndex: "createdDate",
      width: 150,
    },
    {
      key: "40",
      title: "Mã người (gửi)",
      dataIndex: "customerID",
      width: 150,
    },
    {
      key: "41",
      title: "Đại diện (gửi)",
      dataIndex: "customerRepresent",
      width: 150,
    },
    {
      key: "42",
      title: "Họ tên (gửi)",
      dataIndex: "customerName",
      width: 150,
    },
    {
      key: "43",
      title: "Địa chỉ (gửi)",
      dataIndex: "customerAddress",
      width: 400,
    },
    {
      key: "44",
      title: "Điện thoại (gửi)",
      dataIndex: "customerPhoneNumber",
      width: 150,
    },
    {
      key: "45",
      title: "Quốc gia (gửi)",
      dataIndex: "customerAddress",
      width: 150,
    },
    {
      key: "46",
      title: "Tỉnh/Thành (gửi)",
      dataIndex: "customerAddress",
      width: 150,
    },
    {
      key: "47",
      title: "Q/Huyện (gửi)",
      dataIndex: "customerAddress",
      width: 150,
    },
    {
      key: "48",
      title: "Họ tên (nhận)",
      dataIndex: "recieverName",
      width: 150,
    },
    {
      key: "49",
      title: "Địa chỉ (nhận)",
      dataIndex: "receiverAddress",
      width: 150,
    },
    {
      key: "50",
      title: "Điện thoại (nhận)",
      dataIndex: "receiverPhoneNumber",
      width: 150,
    },
    {
      key: "51",
      title: "BC phát",
      dataIndex: "receiverPostOfficeID",
      width: 150,
    },
    {
      key: "52",
      title: "TT phát",
      dataIndex: "receiverZoneID",
      width: 150,
    },
    {
      key: "53",
      title: "Tuyến GN phát",
      dataIndex: "receiverShippingRouteID",
      width: 150,
    },
    {
      key: "54",
      title: "Mã địa chỉ (nhận)",
      dataIndex: "receiverPostcodeQT",
      width: 150,
    },
    {
      key: "55",
      title: "Quốc gia (nhận)",
      dataIndex: "receiverNationID",
      width: 150,
    },
    {
      key: "56",
      title: "Tỉnh/Thành (nhận)",
      dataIndex: "receiverProvinceID",
      width: 150,
    },
    {
      key: "57",
      title: "Q/Huyện (nhận)",
      dataIndex: "receiverDistrictID",
      width: 150,
    },
    {
      key: "58",
      title: "P/Xã (nhận)",
      dataIndex: "receiverWardID",
      width: 150,
    },
    {
      key: "59",
      title: "Khu phố (nhận) ",
      dataIndex: "receiverAddressID",
      width: 150,
    },
    {
      key: "60",
      title: "Địa chỉ chi tiết",
      dataIndex: "receiverDetailedAddress",
      width: 150,
    },
    // {
    //   key: "61",
    //   title: "Action",
    //   dataIndex: "ReceiverDetailedAddress",
    //   width: 150,
    //   render: (record) => {
    //     return (
    //       <>
    //         <EditOutlined
    //           onClick={() => {
    //             onEdit(record);
    //           }}
    //         />
    //         <DeleteOutlined
    //           onClick={() => {
    //             onDelete(record);
    //           }}
    //           style={{ color: "red", marginLeft: 12 }}
    //         />
    //       </>
    //     );
    //   },
    //   fixed: "right",
    // },
    {
      key: "61",
      title: "Actions",
      dataIndex: "actions",
      width: 150,
      fixed: "right",
      // render: (_, record) => {
      //   const editable = isEditing(record);
      //   return editable ? (
      //     <span>
      //       <Typography.Link
      //         style={{
      //           marginRight: 8,
      //         }}
      //       >
      //         Save
      //       </Typography.Link>
      //       <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
      //         <a>Cancel</a>
      //       </Popconfirm>
      //     </span>
      //   ) : (
      //     <>
      //       <span
      //         style={{ cursor: "pointer", marginRight: 8 }}
      //         onClick={() => edit(record)}
      //       >
      //         Edit
      //       </span>
      //       <span
      //         style={{ cursor: "pointer", color: "red" }}
      //         onClick={() => onDelete(record)}
      //       >
      //         Delete
      //       </span>
      //     </>
      //   );
      // },
      render: (_, record) => {
        return (
          <>
          <EditOutlined
              onClick={() => onEdit(record)}
              style={{ cursor: "pointer", marginRight: 12 }}
            />
            {/* <span
              style={{ cursor: "pointer", marginRight: 8 }}
              onClick={() => onEdit(record)}
            >
              Edit
            </span> */}
            <DeleteOutlined
              onClick={() => onDelete(record)}
              style={{ cursor: "pointer", color: "red", marginLeft: 12 }}
            />
            {/* <span
              style={{ cursor: "pointer", color: "red" }}
              onClick={() => onDelete(record)}
            >
              Delete
            </span> */}
          </>
        );
      },
    },
  ];

  const onDelete = async (record) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa đơn hàng này?' ,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        const token = Cookies.get("authToken");
        const response = await axios.delete(
          `http://localhost:4000/mail/${record.mailID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        const newDataSource = dataSource.filter(
          (item) => item.mailID !== record.mailID
        );
        setDataSource(newDataSource);
      },
    });
  };
  
  const onEdit = (record) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn cập nhật?",
      okText: "Cập nhật",
      cancelText: "Hủy",
      onOk: async () => {
          const link = `/home/QLBP/Capnhatdonhang/${record.mailID}`;
          window.location.href = link; // You can also use your preferred navigation method
      },
    });
  };
  // const EditableCell = ({
  //   editing,
  //   dataIndex,
  //   title,
  //   inputType,
  //   record,
  //   index,
  //   children,
  //   ...restProps
  // }) => {
  //   const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  //   return (
  //     <td {...restProps}>
  //       {editing ? (
  //         <Form.Item
  //           name={dataIndex}
  //           style={{
  //             margin: 0,
  //           }}
  //           rules={[
  //             {
  //               required: true,
  //               message: `Please Input ${title}!`,
  //             },
  //           ]}
  //         >
  //           {inputNode}
  //         </Form.Item>
  //       ) : (
  //         children
  //       )}
  //     </td>
  //   );
  // };

  // const edit = (record) => {
  //   console.log("test");
  //   form.setFieldsValue({
  //     CreatedDate: "",
  //     MailID: "",
  //     MailStatus: "",
  //     ...record,
  //   });
  //   setEditingKey(record.key);
  // };

  // const cancel = () => {
  //   setEditingKey("");
  // };
  // const save = async (key) => {
  //   try {
  //     const row = await form.validateFields();
  //     const newData = [...data];
  //     const index = newData.findIndex((item) => key === item.key);
  //     if (index > -1) {
  //       const item = newData[index];
  //       newData.splice(index, 1, {
  //         ...item,
  //         ...row,
  //       });
  //       setData(newData);
  //       setEditingKey("");
  //     } else {
  //       newData.push(row);
  //       setData(newData);
  //       setEditingKey("");
  //     }
  //   } catch (errInfo) {
  //     console.log("Validate Failed:", errInfo);
  //   }
  // };

  // const mergedColumns = columns.map((col) => {
  //   if (!col.editable) {
  //     return col;
  //   }
  //   return {
  //     ...col,
  //     onCell: (record) => ({
  //       record,
  //       inputType: col.dataIndex === "MailID" ? "number" : "text",
  //       dataIndex: col.dataIndex,
  //       title: col.title,
  //       editing: isEditing(record),
  //     }),
  //   };
  // });

  return (
    // <Form form={form} component={false}>
    <Form>
      <Table
      
        // components={{
        //   body: {
        //     cell: EditableCell,
        //   },
        // }}
        
        rowSelection={{ ...rowSelection, type: selectionType }}
        columns={columns}
        dataSource={dataSource}
        // rowClassName="editable-row"
        bordered
        scroll={{
          x: 400,
          y: 350,
        }}
        className="category-table-wrapper"
        pagination={{
          total: 100,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `Total ${total} items`,
        }}
      />
    </Form>
  );
}

function Category() {
  const [dataSource, setDataSource] = useState([]);
  return (
    <div className="category-wrapper">
      <Filter dataSource={dataSource} setDataSource={setDataSource}/>
      <OrderList dataSource={dataSource} setDataSource={setDataSource}/>
    </div>
  );
}
export default Category;
