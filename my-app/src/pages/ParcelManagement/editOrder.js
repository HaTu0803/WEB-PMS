import React, { useState, useRef, useContext } from "react";
import { Typography, notification } from "antd";
import {
  message,
  Modal,
  Col,
  Row,
  Button,
  Input,
  InputNumber,
  Select,
  Form,
  Popconfirm,
  Table,
} from "antd";
import dayjs from "dayjs";
import { DatePicker, Space } from "antd";
import { useEffect } from "react";
import { getTodosAPI } from "../../api/todos";
import "./editOrder.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";



// import Theme from '../../themes/theme';
const { RangePicker } = DatePicker;
const { Option } = Select;

function EditOrder() {
  const [form] = Form.useForm();
  const navigation = useNavigate();
  const [modal, contextHolder] = Modal.useModal();
  const { mailID } = useParams();

  const [values, setValue] = useState({
    mailID: mailID,
    customerID: "",
    CustomerName: "",
    CustomerPhoneNumber: "",
    CustomerPackageID: "",
    CustomerCompanyName: "",
    CustomerRepresent: "",
    CustomerAddress: "",
    ReceiverPhoneNumber: "",
    RecieverName: "",
    ReceiverCompanyName: "",
    ReceiverAddress: "",
    ReceiverDetailedAddress: "",
    ReceiverPostcodeQT: "",
    ReceiverNationID: "",
    ReceiverProvinceID: "",
    ReceiverDistrictID: "",
    ReceiverWardID: "",
    ReceiverAddressID: "",
    ReceiverPostOfficeID: "",
    ReceiverShippingRouteID: "",
    ReceiverZoneID: "",
    MailType: "",
    PackageListID: "",
    MailRealWeight: "",
    MailTotalWeight: "",
    MailConvertedWeight: "",
    MailLength: "",
    MailWidth: "",
    MailHeight: "",
    PackageAmount: "",
    PackageNotes: "",
    ServiceTypeID: "",
    ServiceTypeName: "",
    ServiceTypeNotes: "",
    ServiceTypeSpecialNote: "",
    DeclaredValue: "",
    BasicFee: "",
    VATFee: "",
    TotalFee: "",
    FuelFee: "",
    PostOfficeCreatedID: "",
    PostOfficeCreatedName: "",
  CreateDate: "",
});
  useEffect(() => {
    const fetchData = async () => {
      // const values = await form.validateFields();
      const token = Cookies.get("authToken");
      const response = await axios.post(
        `http://localhost:4000/mail/${mailID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setValue(response.data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (customer.length > 0 && values.customerId !== '') {
      console.log(values)
      handleCountryChange(values.receiverNationID);
      handleCityChange(values.receiverProvinceID);
      handleDistrictChange(values.receiverDistrictID);
      const selectedCustomer = customer.find((c) => c.value === values.customerID);
      setCustomerInfo(selectedCustomer);
      form.setFieldsValue({
        customerId: values.customerID,
        Send: values.customerRepresent,
        Phone_Number_2: values.receiverPhoneNumber,
        Receiver_Name: values.recieverName,
        Receiver_Company: values.receiverCompanyName,
        Address_2: values.receiverAddress,
        Address_3: values.receiverDetailedAddress,
        Nation: values.receiverNationID,
        City: values.receiverProvinceID,
        District: values.receiverDistrictID,
        Ward: values.receiverWardID,
        AddressID: values.receiverAddressID,
        Post_Office_Delivery: values.receiverPostOfficeID,
        Transmitter_Route: values.receiverShippingRouteID,
        Broadcast_Area: values.receiverZoneID,
        Type: values.mailType,
        Actual_weight: values.mailRealWeight,
        Conversion_weight: values.mailConvertedWeight,
        Weight: values.mailTotalWeight,
        Service: values.serviceTypeID,
        DeclaredValue: values.declaredValue,
        Notes: values.serviceTypeNotes,
        Service_Type_Notes: values.serviceTypeSpecialNote,
        Rates: values.basicFee,
        Sender: values.fuelFee,
        VAT: values.vatFee,
        Total: values.totalFee,
      });
    }
  }, [values]);
const handleinish = (event) => {
  setValue({...values, [event.target.name]: event.target.value});
const handleSubmit = async (event) => {
  try {
  event.preventDefault();
  const values = await form.validateFields();
  const token = Cookies.get("authToken");
  const response = await axios.put(
    `http://localhost:4000/mail/${mailID}`,

    {
      MailStatus: "KHỞI TẠO",
      CustomerID: values.customerId,
      CustomerName: customerInfo.label,
      CustomerPhoneNumber: customerInfo.phoneNumber,
      CustomerPackageID: "",
      CustomerCompanyName: "",
      CustomerRepresent: values.Send,
      CustomerAddress: customerInfo.address,
      ReceiverPhoneNumber: values.Phone_Number_2,
      RecieverName: values.Receiver_Name,
      ReceiverCompanyName: values.Receiver_Company,

      ReceiverAddress: values.Address_2,
      ReceiverDetailedAddress: values.Address_3,
      ReceiverPostcodeQT: "",
      ReceiverNationID: values.Nation,
      ReceiverProvinceID: values.City,
      ReceiverDistrictID: values.District,
      ReceiverWardID: values.Ward,
      ReceiverAddressID: values.AddressID,
      ReceiverPostOfficeID: values.Post_Office_Delivery,
      ReceiverShippingRouteID: values.Transmitter_Route,
      ReceiverZoneID: values.Broadcast_Area,
      MailType: values.Type,
      PackageListID: "",
      MailRealWeight: values.Actual_weight,
      MailTotalWeight: weight,  
      MailConvertedWeight: conversionWeight,
      MailLength: 0,
      MailWidth: 0,
      MailHeight: 0,
      PackageAmount: values.Package_Quantity,
      PackageNotes: "",
      ServiceTypeID: values.Service,
      // ServiceTypeName: serviceName.label,
      ServiceTypeNotes: values.Notes,
      ServiceTypeSpecialNote: values.Service_Type_Notes,
      DeclaredValue: values.DeclaredValue,
      BasicFee: values.Rates,
      VATFee: values.VAT,
      TotalFee: values.Total,
      FuelFee: values.Sender,
      PostOfficeCreatedID: "NTI",
      PostOfficeCreatedName: "Nguyễn Trãi",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response);
  } catch (error) {
    console.log(error);
  }
}
};


              
  // const handleFormFinish = () => {
  //   // Your form handling logic here
  // };
  const countDown = () => {
    let secondsToGo = 5;
    const instance = modal.success({
      title: "TẠO ĐƠN THÀNH CÔNG",
      content: `Đơn hàng đã được tạo thành công. Đang chuyển hướng về trang DANH MỤC trong vòng ${secondsToGo} giây`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      instance.update({
        content: `Đơn hàng đã được tạo thành công. Đang chuyển hướng về trang DANH MỤC trong vòng ${secondsToGo} giây`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      instance.destroy();
      navigation("/QLBP/Danhmuc");
    }, secondsToGo * 1000);
  };

  const handleFormFinish = async () => {
    try {
      const createOrderSuccess = true;

      if (createOrderSuccess) {
        // Hiển thị modal ở đây
        countDown();
        // Sau khi người dùng nhấn OK trong modal, chuyển hướng đến trang /QLBP/Danhmuc
      } else {
        modal.error({
          title: "TẠO ĐƠN THẤT BẠI",
          content: "Đơn hàng chưa được tạo thành công",
        });
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const values = await form.validateFields();
      console.log("Form values:", values);

      const token = Cookies.get("authToken");

      const serviceName = serviceType.find((s) => s.value === values.Service);

      const response = await axios.put(
        `http://localhost:4000/mail/${values.mailID}`,
        {
          MailStatus: "KHỞI TẠO",
          CustomerID: values.customerId,
          CustomerName: customerInfo.label,
          CustomerPhoneNumber: customerInfo.phoneNumber,
          CustomerPackageID: "",
          CustomerCompanyName: "",
          CustomerRepresent: values.Send,
          CustomerAddress: customerInfo.address,
          ReceiverPhoneNumber: values.Phone_Number_2,
          RecieverName: values.Receiver_Name,
          ReceiverCompanyName: values.Receiver_Company,
          ReceiverAddress: values.Address_2,
          ReceiverDetailedAddress: values.Address_3,
          ReceiverPostcodeQT: "",
          ReceiverNationID: values.Nation,
          ReceiverProvinceID: values.City,
          ReceiverDistrictID: values.District,
          ReceiverWardID: values.Ward,
          ReceiverAddressID: values.AddressID,
          ReceiverPostOfficeID: values.Post_Office_Delivery,
          ReceiverShippingRouteID: values.Transmitter_Route,
          ReceiverZoneID: values.Broadcast_Area,
          MailType: values.Type,
          PackageListID: "",
          MailRealWeight: values.Actual_weight,
          MailTotalWeight: weight,
          MailConvertedWeight: conversionWeight,
          MailLength: 0,
          MailWidth: 0,
          MailHeight: 0,
          PackageAmount: values.Package_Quantity,
          PackageNotes: "",
          ServiceTypeID: values.Service,
          ServiceTypeName: serviceName.label,
          ServiceTypeNotes: values.Notes,
          ServiceTypeSpecialNote: values.Service_Type_Notes,
          DeclaredValue: values.DeclaredValue,
          BasicFee: values.Rates,
          VATFee: values.VAT,
          TotalFee: values.Total,
          FuelFee: values.Sender,
          PostOfficeCreatedID: "NTI",
          PostOfficeCreatedName: "Nguyễn Trãi",
          MailID: values.mailID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      // You can perform further actions with the form values here
    } catch (errorInfo) {
      console.error("Form validation failed:", errorInfo);
      // You can handle the validation error here, e.g., display error messages.
    }
  };
  const [country, setCountry] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("authToken");
      const response = await axios.post(
        `http://localhost:4000/address/nation`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const options = response.data.map((d) => ({
        value: d.nationID,
        label: d.nationName,
      }));
      setCountry(options);
    };
    fetchData();
  }, []);

  const [city, setCity] = useState([]);

  const handleCountryChange = async (value) => {
    const token = Cookies.get("authToken");
    const response = await axios.post(
      `http://localhost:4000/address/province`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const options = response.data.map((d) => ({
      value: d.provinceID,
      label: d.provinceName,
    }));
    setCity(options);
  };

  const [district, setDistrict] = useState([]);

  const handleCityChange = async (value) => {
    const token = Cookies.get("authToken");
    const response = await axios.post(
      `http://localhost:4000/address/district`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const filteredDistricts = response.data.filter(
      (d) => d.provinceID === value
    );
    const options = filteredDistricts.map((d) => ({
      value: d.districtID,
      label: d.districtName,
    }));
    setDistrict(options);
  };
  const [ward, setWard] = useState([]);
  const handleDistrictChange = async (value) => {
    const token = Cookies.get("authToken");
    const response = await axios.post(
      `http://localhost:4000/address/ward`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const filteredWards = response.data.filter((d) => d.districtID === value);
    const options = filteredWards.map((d) => ({
      value: d.wardID,
      label: d.wardName,
    }));
    setWard(options);
  };

  const Notes = [
    {
      value: "Xemhang",
      label: "Cho xem hàng",
    },
    {
      value: "Khongxemhang",
      label: "Không cho xem hàng",
    },
  ];
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  // const [disabled, setDisabled] = useState(true);
  // const toggle = () => {
  //   setDisabled(!disabled);
  //   };

  const [customer, setCustomer] = useState([]);
  const [customerID, setCustomerID] = useState("");
  useEffect(() => {
    const fetchCustomer = async () => {
      const token = Cookies.get("authToken");
      // const response = await axios.post(
      //   "http://localhost:4000/postoffice/GetCustomer/ABH",
      //   {},
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      // const options = response.data.map((d) => ({
      //   value: d.customerID,
      //   label: d.customerName,
      //   address: d.address,
      //   phoneNumber: d.phoneNumber,
      // }));
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

  const [selectedType, setSelectedType] = useState(null);
  const LH = [
    {
      value: "TL",
      label: "TL",
    },
    {
      value: "HH",
      label: "HH",
    },
  ];
  // Check if the selected type is 'HH'
  // const isHHSelected = selectedType === 'HH';

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
//  check loại hình và kiện


  

  // const [declaredValue, setDeclaredValue] = useState("");
  const [rates, setRates] = useState(50000);
  const [sender, setSender] = useState(10000);
  const [sendingRepresentative, setSendingRepresentative] = useState(
    rates * 0.08
  );
  const [total, setTotal] = useState(0);

  const calculateTotal = () => {
    const totalValue = rates + sender + sendingRepresentative;
    setTotal(totalValue);
  };

  useEffect(() => {
    calculateTotal();
  }, [rates, sender, sendingRepresentative]);

  const [customerInfo, setCustomerInfo] = useState({
    address: "",
    phoneNumber: "",
    label: "",
  });

  const handleCustomerChange = (value) => {
    setCustomerID(value);
    const selectedCustomer = customer.find((c) => c.value === value);
    setCustomerInfo(selectedCustomer);
  };

  const [actualWeight, setActualWeight] = useState(0);
  const [conversionWeight, setConversionWeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const handleActualWeightChange = (value) => {
    setActualWeight(value);
    updateWeight(value, conversionWeight);
  };

  const handleConversionWeightChange = (value) => {
    setConversionWeight(value);
    updateWeight(actualWeight, value);
  };

  const updateWeight = (actual, conversion) => {
    if (actual > conversion) {
      setWeight(actual);
    } else {
      setWeight(conversion);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  const handleCancelClick = () => {
    navigate("/QLBP/Danhmuc");
  };

  // -----------TẠO KIỆN-----------
 

  const handleDelete = (key) => {
    const newData = dataSourcePackage.filter((item) => item.key !== key);
    setDataSourcePackage(newData);
  };
  const defaultColumns = [
    {
      title: 'STT',
      dataIndex: 'STT',
      // width: '30%',
      key: 'STT',
    },
    {
      title: 'Mã kiện',
      dataIndex: 'PackageID',
      key: 'PackageID',
      editable: true,

    },
    {
      title: 'TL thực',
      dataIndex: 'PackageRealWeight',
      key: 'PackageRealWeight',
      editable: true,

    },
    {
      title: 'Kích thước (cm)',
      children: [
        {
          title: 'Dài',
          dataIndex: 'PackageLength',
          key: 'PackageLength',
          editable: true,

          width: 150,
        },
        {
          title: 'Rộng',

          dataIndex: 'PackageWeight',
          key: 'PackageWeight',
          editable: true,

          width: 150,
        },
        {
          title: 'Cao',

          dataIndex: 'PackageHeight',
          key: 'PackageHeight',
          editable: true,

          width: 100,
        },

        ,
      ],
    },
    {
      title: 'TL',
      dataIndex: 'PackageTotalWight',
      key: 'PackageTotalWight',
    },
    {
      title: 'TLQĐ',
      dataIndex: 'PackageConvertedWeight',
      key: 'PackageConvertedWeight',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'PackageNotes',
      key: 'PackageNotes',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
      dataSourcePackage.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const [packageQuantity, setPackageQuantity] = useState(0);
 const applyChanges = () => {
  if (packageQuantity < 2) {
    // Display an error message or handle the situation accordingly
    console.error("Package quantity should be at least 2");
    // You might want to return or stop further execution here
    return;
  }

    const newData = [];
    for (let i = 0; i < packageQuantity; i++) {
      const newPackage = {
        key: i,
        STT: i + 1,
        PackageID: "",
        PackageRealWeight: "",
        PackageLength: "",
        PackageWeight: "",
        PackageHeight: "",
        PackageTotalWight: "",
        PackageConvertedWeight: "",
        PackageNotes: "",
      };
      newData.push(newPackage);
      
    }

    setDataSourcePackage(newData);
  };
const [mailLength, setMailLength] = useState(0);
const [mailWidth, setMailWidth] = useState(0);
const [mailHeight, setMailHeight] = useState(0);
const handleApplyAll = () => {
  const newData = [...dataSourcePackage];
  for (let i = 0; i < packageQuantity; i++) {
    const item = newData[i];
    newData.splice(i, 1, {
      ...item,
      PackageLength: mailLength,
      PackageRealWeight: actualWeight,
      PackageWeight: mailWidth,
      PackageHeight: mailHeight,
    });
  }
  console.log(newData);
  setDataSourcePackage(newData);
};



  const symbols = [
    {
      value: " ",
      label: " ",
    },
    {
      value: "-",
      label: "-",
    },
    {
      value: "/",
      label: "/",
    },
    
  ];
 

    
  const [dataSourcePackage, setDataSourcePackage] = useState([
    {
      key: '',
      STT: ' ',
      PackageID: ' ',
      PackageRealWeight:  ' ',
      PackageLength:  ' ',
      PackageWeight:  ' ',
      PackageHeight:  ' ',
      PackageTotalWight:  ' ',
      PackageConvertedWeight:  ' ',
      PackageNotes:  ' ',
    },
  ]);

  const calculateConversionWeight = (values) => {
    let serviceType = 0;
    let weight = 0;
    let conversionWeight = 0;
    if (values.ServiceTypeID === "DE" || values.ServiceTypeID === "ED") {

      serviceType = 6000;

    } else if (values.ServiceTypeID === "IM" || values.ServiceTypeID === "IE") {
      serviceType = 10000;
      conversionWeight = (values.MailLength * values.MailWidth * values.MailHeight*3) / serviceType;
      return conversionWeight.toFixed(3);
    } else {
      serviceType = 5000;
    }
    conversionWeight = (values.MailLength * values.MailWidth * values.MailHeight) / serviceType;
    return conversionWeight.toFixed(3);
  };
  const handleServiceChange = (value) => {
    // Assuming form is your form reference
    const values = form.getFieldsValue();
    values.ServiceTypeID = value;
  
    // Call the function and set the result to your form field
    const convertedWeight = calculateConversionWeight(values);
    form.setFieldsValue({
      ConvertedWeight: convertedWeight,
    });
  };

 
  // const handleAdd = async () => {
  //   const values = await form.validateFields();
  //   console.log("Form values:", values);

  //   const token = Cookies.get("authToken");
  //       const response = await axios.post(
  //         `http://localhost:4000/mail/GeneratePackageID`,
  //         {
  //           MailID: values.mailID,
  //           PackageAmount: values.packageAmount,
  //           SeperateSymbol: values.seperateSymbol,
  //         },

  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       console.log(response);
       
  // }

    

  const EditableContext = React.createContext(null);
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };
    
  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({
          ...record,
          ...values,
        });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
    return <td {...restProps}>{childNode}</td>;
  };
  const [count, setCount] = useState(2);
  const handleAdd = () => {
    const newData = {
      key: dataSourcePackage.length,
      STT: dataSourcePackage.length + 1,
      PackageID: "",
      PackageRealWeight: "",
      PackageLength: "",
      PackageWeight: "",
      PackageHeight: "",
      PackageTotalWight: "",
      PackageConvertedWeight: "",
      PackageNotes: "",
    };
    setDataSourcePackage([...dataSourcePackage, newData]);
    setCount(count + 1);
  }
  const handleSave = (row) => {
    const newData = [...dataSourcePackage];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSourcePackage(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,

        dataIndex: col.dataIndex,
        title: col.title,
        editing: col.editable,
        handleSave: handleSave,
      }),
    };
  }
  );

  return (
    <div className="Frome_create">
      <Typography.Title style={{ fontWeight: "bold", fontSize: "medium" }}>
        TẠO ĐƠN HÀNG
      </Typography.Title>
      <Typography.Title style={{ fontSize: "smaller", color: "red" }}>
        Thông tin người gửi
      </Typography.Title>

      <Form form={form}>
        <Row gutter={24}>
          <Col span={6} flex={6}>
            <Form.Item
              label="Mã khách hàng"
              name="customerId"
              className="min-width-110"
            >
              <Select
                showSearch
                placeholder=""
                optionFilterProp="children"
                // filterOption={(input, option) => {
                //   const value = option.value || "";
                //   return value.toLowerCase().includes(input.toLowerCase());
                // }}
                onChange={handleCustomerChange}
              >
                {customer.map((opt) => (
                  <Option key={opt.value} value={opt.value}>
                    {opt.value}
                  </Option>
                ))}
                value={values.CustomerID}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6} order={2}>
            <Form.Item label="Số điện thoại" name="Phone_Number_1">
              <Input value={customerInfo.phoneNumber} />
              &nbsp;
            </Form.Item>
          </Col>
          <Col span={6} order={3}>
            <Form.Item label="Người gửi" name="Send">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6} order={4}>
            <Form.Item label="Mã VĐ KH" name="Customer's_bill_code">
              <Input showSearch />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col flex={15}>
            <Form.Item
              label="Tên công ty"
              name="Company_name"
              className="min-width-110"
            >
              <Input
                placeholder=""
                optionFilterProp="children"
                filterOption={(input, option) => {
                  const value = option.value || "";
                  return value.toLowerCase().includes(input.toLowerCase());
                }}
                value={customerInfo.label}
              />
              &nbsp;
            </Form.Item>
          </Col>
          <Col flex={1}>
            <Form.Item label="Đại diện gửi" name="Sending_representative">
              <Input showSearch />
            </Form.Item>
          </Col>
        </Row>
        <Row span={24}>
          <Col span={24}>
            <Form.Item
              label="Địa chỉ KH"
              name="Address_1"
              className="min-width-110"
            >
              <Input value={customerInfo.address} />
              &nbsp;
            </Form.Item>
          </Col>
        </Row>
        {/* </Form> */}

        <Typography.Title style={{ fontSize: "smaller", color: "red" }}>
          Thông tin người nhận
        </Typography.Title>
        <Row gutter={24}>
          <Col flex={2}>
            <Form.Item
              label="Số điện thoại"
              name="Phone_Number_2"
              className="min-width-110"
              rules={[
                {
                  pattern: /^[0-9]+$/,
                  message: "Vui lòng chỉ nhập số.",
                },
              ]}
            >
              <Input showSearch />
            </Form.Item>
          </Col>
          <Col flex={2}>
            <Form.Item label="Họ tên nhận" name="Receiver_Name">
              <Input showSearch />
            </Form.Item>
          </Col>
          <Col flex={24}>
            <Form.Item label="Công ty nhận" name="Receiver_Company">
              <Input showSearch />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label="Địa chỉ NN"
              name="Address_2"
              className="min-width-110"
            >
              <Input showSearch />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={6} order={1}>
            <Form.Item label="Quốc gia" name="Nation" className="min-width-110">
              <Select
                showSearch
                placeholder=""
                optionFilterProp="children"
                onChange={handleCountryChange}
              >
                {country.map((opt) => (
                  <Option key={opt.value} value={opt.value}>
                    {opt.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6} order={2}>
            <Form.Item label="Tỉnh/thành" name="City">
              <Select
                showSearch
                placeholder=""
                optionFilterProp="children"
                onChange={handleCityChange}
              >
                {city.map((opt) => (
                  <Option key={opt.value} value={opt.value}>
                    {opt.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6} order={3}>
            <Form.Item label="Quận/huyện" name="District">
              <Select
                showSearch
                placeholder=""
                optionFilterProp="children"
                filterOption={(input, option) => {
                  const value = option.value || "";
                  return value.toLowerCase().includes(input.toLowerCase());
                }}
                onChange={handleDistrictChange}
              >
                {district.map((opt) => (
                  <Option key={opt.value} value={opt.value}>
                    {opt.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6} order={4}>
            <Form.Item label="Phường/xã" name="Ward">
              <Select
                showSearch
                placeholder=""
                optionFilterProp="children"
                filterOption={(input, option) => {
                  const value = option.value || "";
                  return value.toLowerCase().includes(input.toLowerCase());
                }}
              >
                {ward.map((opt) => (
                  <Option key={opt.value} value={opt.value}>
                    {opt.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col flex={4}>
            <Form.Item
              label="Địa chỉ chi tiết"
              name="Address_3"
              className="min-width-110"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col flex={2}>
            <Form.Item label="Mã địa chỉ" name="AddressID">
              <Input showSearch />
            </Form.Item>
          </Col>
          <Col flex={2}>
            <Form.Item name="">
              <Input showSearch />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={6} order={1}>
            <Form.Item
              label="BC phát"
              name="Post_Office_Delivery"
              className="min-width-110"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6} order={2}>
            <Form.Item label="Tuyến GN phát" name="Transmitter_Route">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6} order={3}>
            <Form.Item label="Vùng phát" name="Broadcast_Area">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6} order={4}></Col>
        </Row>
        {/* -------------Thông tin BP/BK----------- */}
        <Typography.Title style={{ fontSize: "smaller", color: "red" }}>
          Thông tin BP/BK
        </Typography.Title>
        <Row gutter={24}>
          <Col flex={2}>
            <Form.Item
              label="Loại hình"
              name="Type"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại hình",
                },
              ]}
              className="min-width-110"
            >
              <Select
                showSearch
                placeholder=""
                optionFilterProp="children"
                filterOption={(input, option) => {
                  const value = option.value || "";
                  return value.toLowerCase().includes(input.toLowerCase());
                }}
              >
                onChange={(value) => setSelectedType(value)}
                {LH.map((LH) => (
                  <Option key={LH.value} value={LH.value}>
                    {LH.value}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col flex={4}>
            <Form.Item label="TL thực" name="Actual_weight">
              <InputNumber
                defaultValue={1}
                min={0}
                max={100}
                step={0.001}
                onChange={handleActualWeightChange}
              />
            </Form.Item>
          </Col>
          <Col flex={4}>
            <Form.Item label="TLQĐ" name="Conversion_weight">
              <InputNumber
                type="dashed"
                defaultValue={1}
                min={0}
                max={100}
                step={0.001}
                disabled
                onChange={handleConversionWeightChange}
              />
            </Form.Item>
          </Col>
          <Col flex={2}>
            <Form.Item label="TL" name="Weight" type="dashed">
              <InputNumber
                type="dashed"
                style={{ color: "red" }}
                defaultValue={1}
                min={0}
                max={100}
                step={0.001}
                value={weight}
                readOnly
              />
              &nbsp;
            </Form.Item>
          </Col>

          <Col flex={2}>
            <Form.Item label="Số kiện" name="Package_Quantity">
              <InputNumber
                min={0}
                max={100}
                defaultValue={0}
                disabled={selectedType !== "HH"}
              />
            </Form.Item>
          </Col>
          <Col flex={2}>
            <Form.Item name="Package_Quantity_button">
              <Button type="primary" onClick={showModal}>
                Tạo kiện
              </Button>
              {/* ----------------------NHẬP KIỆN------------ */}
              <Modal
                title="Tạo kiện"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}

              >
                <Form>
                <Row gutter={24}>
                <Col span={8}>
                  <Form.Item label="Số kiện" name="Package_Quantity"  rules={[
                {
                  pattern: /^(?:[2-9]|[1-9][0-9]+)$/,
                  message: "Chỉ nhập số nguyên dương lớn hơn 2",
                },
              ]}>
                    <Input 
                    min={0} 
                    max={100} 
                    defaultValue={0}
                    onChange={(e) => setPackageQuantity(e.target.value)}
                    />
                  </Form.Item>
                  </Col>
                 
                  <Col span={8}>
                  <Form.Item label="Chọn ký hiệu" name="Symbol">
                  
              <Select
                showSearch
                placeholder=""
                optionFilterProp="children"
                filterOption={(input, option) => {
                  const value = option.value || "";
                  return value.toLowerCase().includes(input.toLowerCase());
                }}
              >
                {symbols.map((symbols) => (
                  <Option key={symbols.value} value={symbols.value}>
                    {symbols.label}
                  </Option>
                ))}
              </Select>
            
                  </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Button type="primary" htmlType="submit"   onClick={() => applyChanges()}
>
                      Áp dụng
                    </Button>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                <Col span={4}>
                  <Form.Item name="Actual_weight"  rules={[
                {
                  pattern: /^(?:[1-9]\d*|0)(?:\.\d+)?$/,
                  message: "Chỉ nhập số lớn hơn 0",
                },
              ]}>
                    <Input placeholder="TL thực (kg)" min={0} max={100}  
                    onChange={(e) => setActualWeight(e.target.value)}/>
                   
                  </Form.Item>
                  </Col>
                  <Col span={4}>
                  <Form.Item name="mail_length"  rules={[
                {
                  pattern: /^(?:[1-9]\d*|0)(?:\.\d+)?$/,
                  message: "Chỉ nhập số lớn hơn 0",
                },
              ]}>
                    <Input placeholder="Dài (cm)" min={0} max={100} 
                    onChang={(e) => setMailLength(e.target.value)}
                    />
                   
                  </Form.Item>
                    </Col>
                    <Col span={4}>
                  <Form.Item name="mail_width"  rules={[
                {
                  pattern: /^(?:[1-9]\d*|0)(?:\.\d+)?$/,
                  message: "Chỉ nhập số lớn hơn 0",
                },
              ]}>
                    <Input placeholder="Rộng (cm)" min={0} max={100}
                      onChange={(e) => setMailWidth(e.target.value)}
                      />
                   
                  </Form.Item>
                    </Col>
                    <Col span={4}>
                  <Form.Item name="mail_height"  rules={[
                {
                  pattern: /^(?:[1-9]\d*|0)(?:\.\d+)?$/,
                  message: "Chỉ nhập số lớn hơn 0",
                },
              ]}>
                    <Input placeholder="Cao (cm)" min={0} max={100}
                    onChange={(e) => setMailHeight(e.target.value)}
                    />
                   
                  </Form.Item>
                    </Col>
                  <Col span={4}>
                    <Button type="primary" htmlType="submit" onClick={handleApplyAll}>
                      Áp dụng cho tất cả các kiện
                    </Button>
                    </Col>
                  </Row>
                  <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSourcePackage}
                    columns={columns}
                  />
                  <Row gutter={24}>
                  <Col span={8}>
                  <Form.Item label="Tổng TL (kg)" name="Total_weight">
                    <Input placeholder="" min={0} max={100} disabled/>
                  </Form.Item>
                  </Col>
                  <Col span={8}>
                  <Form.Item label="Tổng TLQĐ (kg)" name="Total_conversion_weight">
                    <Input placeholder="" min={0} max={100} disabled/>
                  </Form.Item>
                  </Col>
                 </Row>

                </Form>
              </Modal>
            </Form.Item>
          </Col>
        </Row>
        {/* ---------Thông tin dịch vụ----------- */}
        <Typography.Title style={{ fontSize: "smaller", color: "red" }}>
          Thông tin dịch vụ
        </Typography.Title>
        <Row
          gutter={24}
          justify="space-between" // Set justify to space-between
          align="flex-start"
        >
          <Col span={6} order={1}>
            <Form.Item
              label="Dịch vụ"
              name="Service"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn dịch vụ",
                },
              ]}
              className="min-width-110"
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
          <Col span={6} order={2}>
            <Form.Item label="Dịch vụ GTGT" name="">
              <Select
                placeholder=""
                optionFilterProp="children"
                filterOption={(input, option) => {
                  const value = option.value || "";
                  return value.toLowerCase().includes(input.toLowerCase());
                }}
              ></Select>
            </Form.Item>
          </Col>
          <Col span={6} order={3}>
            <Form.Item
              label="Giá trị khai"
              name="DeclaredValue"
              rules={[
                {
                  pattern: /^[0-9]+$/,
                  message: "Vui lòng chỉ nhập số.",
                },
              ]}
            >
              <Input showSearch />
            </Form.Item>
          </Col>
          <Col span={6} order={4}></Col>
        </Row>
        <Row gutter={24}>
          <Col flex={3}>
            <Form.Item label="Nội dung" name="Notes" className="min-width-110">
              <Input showSearch />
            </Form.Item>
          </Col>
          <Col flex={1}>
            <Form.Item label="Ghi chú đặc biệt" name="Service_Type_Notes">
              <Select
                showSearch
                placeholder=""
                optionFilterProp="children"
                filterOption={(input, option) => {
                  const value = option.value || "";
                  return value.toLowerCase().includes(input.toLowerCase());
                }}
              >
                {Notes.map((Notes) => (
                  <Option key={Notes.value} value={Notes.value}>
                    {Notes.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <div style={{ margin: "50px" }}></div>
        <span
          style={{
            display: "block",
            width: "100%",
            borderBottom: "1px solid black",
          }}
        ></span>
        <Typography.Title style={{ fontSize: "smaller", color: "red" }}>
          Giá cước
        </Typography.Title>
        <Row gutter={24}>
          <Col span={6} order={1}>
            <Form.Item
              label="DVGT/COD"
              name="Sending_representative"
              className="min-width-110"
            >
              <Input showSearch />
            </Form.Item>
          </Col>
          <Col span={6} order={2}>
            <Form.Item label="Thu #" name="Sending_representative">
              <Input showSearch />
            </Form.Item>
          </Col>
          <Col span={6} order={3}>
            <Form.Item label="Ghi chú #" name="Sending_representative">
              <Input showSearch />
            </Form.Item>
          </Col>
          <Col span={6} order={4}></Col>
        </Row>
        <Row gutter={24}>
          <Col span={6} order={1}>
            <Form.Item label="Giá cước" name="Rates" className="min-width-110">
              <Input
                onChange={(e) => setRates(e.target.value)}
                value={rates}
                style={{ color: "red" }}
                readOnly
              />
              &nbsp;
            </Form.Item>
          </Col>
          <Col span={6} order={2}>
            <Form.Item label="Giá đã CK" name="Discounted_fares">
              <Input showSearch />
            </Form.Item>
          </Col>
          <Col span={6} order={3}>
            <Form.Item label="PP xăng dầu" name="Sender">
              <Input
                style={{ color: "red" }}
                onChange={(e) => setSender(e.target.value)}
                value={sender}
              />
              &nbsp;
            </Form.Item>
          </Col>
          {/* <Col span={1} order={4}>
          <Form.Item name="Sender">
            <Input defaultValue={10}/>
          </Form.Item>
        </Col> */}
          <Col span={5} order={4}>
            <Form.Item label="PPNT" name="PPNT">
              <Input showSearch />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={6} order={1}>
            <Form.Item label="Chiết khấu" name="" className="min-width-110">
              <Input showSearch />
            </Form.Item>
          </Col>
          <Col span={6} order={2}>
            <Form.Item label="VAT" name="VAT">
              <Input
                style={{ color: "red" }}
                onChange={(e) => setSendingRepresentative(e.target.value)}
                value={sendingRepresentative}
              />
              &nbsp;
            </Form.Item>
          </Col>
          <Col span={6} order={3}>
            <Form.Item label="Mã bảng giá" name="">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6} order={4}></Col>
        </Row>
        <Row gutter={24}>
          <Col span={6} order={1}>
            <Form.Item label="Cước CH-CT" name="" className="min-width-110">
              <Input showSearch />
            </Form.Item>
          </Col>
          <Col span={6} order={2}>
            <Form.Item label="Thành tiền" name="Total">
              <Input style={{ color: "red" }} value={total} />
              &nbsp;
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit" onClick={handleFormFinish}>
          Lưu đơn hàng
        </Button>
        <Button style={{ marginLeft: 24 }} onClick={handleCancelClick}>
          Trở về
        </Button>
      </Form.Item>
      </Form>
      {contextHolder}
    </div>
  );
}



export default EditOrder;
