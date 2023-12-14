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
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

// import Theme from '../../themes/theme';
const { RangePicker } = DatePicker;
const { Option } = Select;

function EditOrder() {
  const [form] = Form.useForm();
  const [formModal] = Form.useForm();
  const [formPrice] = Form.useForm();

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

  const [valuesPackage, setValuePackage] = useState({
    PackageID: "",
    PackageRealWeight: "",
    PackageLength: "",
    PackageWeight: "",
    PackageHeight: "",
    PackageTotalWight: "",
    PackageConvertedWeight: "",
    PackageNotes: "",
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


      const response2 = await axios.post(
        `http://localhost:4000/mail/getPackagesByMailID/${mailID}`,
        {
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response2", response2.data);
      setDataSourcePackage(response2.data);
    };
    fetchData();
  }, []);
  
  console.log("values", values);
  console.log("values.mailID", values.mailID);
  console.log("packageAmount", values.packageAmount);
  console.log("values.mailHeight", values.mailHeight);
  console.log("values.mailWidth", values.mailWidth);
  console.log("values.mailLength", values.mailLength);
  console.log("values.mailConvertedWeight", values.mailConvertedWeight);
  console.log("values.mailRealWeight", values.mailRealWeight);
  console.log(".", valuesPackage.mailTotalWeight);


  useEffect(() => {
    if (customer.length > 0 && values.customerId !== "") {
      console.log(values);
      handleCountryChange(values.receiverNationID);
      handleCityChange(values.receiverProvinceID);
      handleDistrictChange(values.receiverDistrictID);
      const selectedCustomer = customer.find(
        (c) => c.value === values.customerID
      );
      console.log("selectedCustomer", selectedCustomer);
      console.log("serviceName", values.mailID);
      console.log("values.mailID", values.mailID);

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
        Package_Quantity: values.packageAmount,
      });

      

      formModal.setFieldsValue({
        
        mail_length: values.mailLength,
      mail_width: values.mailWidth,
      mail_height: values.mailHeight,
        // Package_Quantity_Modal: values.packageAmount,
        Seperate_Symbol: values.seperateSymbol,
        Total_conversion_weight: values.mailConvertedWeight,
        Total_weight: values.mailTotalWeight,
        Total_real_weight: values.mailRealWeight,
        
      });
    }
  }, [values]);

  useEffect(() => {
    if (serviceType.length > 0 && values.serviceTypeID !== "") {
      const selectedService = serviceType.find(
        (s) => s.value === values.serviceTypeID
      );
      console.log("selectedService", selectedService);
     formModal.setFieldsValue({
        Package_Quantity_Modal: values.packageAmount,
        Seperate_Symbol: values.seperateSymbol,
        Total_conversion_weight: values.mailConvertedWeight,
        Total_weight: values.mailTotalWeight,
        Total_real_weight: values.mailRealWeight,
        
      });

    }
  }, [values]);


  console.log("values", values);
  console.log("values.mailID", values.mailID);
  console.log("packageAmount", values.packageAmount);
  console.log("values.mailHeight", values.mailHeight);
  console.log("values.mailWidth", values.mailWidth);
  console.log("values.mailLength", values.mailLength);
  console.log("values.mailConvertedWeight", values.mailConvertedWeight);
  console.log("values.mailRealWeight", values.mailRealWeight);
  console.log("values.mailTotalWeight", values.mailTotalWeight);


  // const handleinish = (event) => {
  //   setValue({ ...values, [event.target.name]: event.target.value });
  //   const handleSubmit = async (event) => {
  //     try {
  //       event.preventDefault();
  //       const values = await form.validateFields();
  //       const token = Cookies.get("authToken");
  //       const response = await axios.put(
  //         `http://localhost:4000/mail/${mailID}`,

  //         {
  //           MailStatus: "KHỞI TẠO",
  //           CustomerID: values.customerId,
  //           CustomerName: customerInfo.label,
  //           CustomerPhoneNumber: customerInfo.phoneNumber,
  //           CustomerPackageID: "",
  //           CustomerCompanyName: "",
  //           CustomerRepresent: values.Send,
  //           CustomerAddress: customerInfo.address,
  //           ReceiverPhoneNumber: values.Phone_Number_2,
  //           RecieverName: values.Receiver_Name,
  //           ReceiverCompanyName: values.Receiver_Company,

  //           ReceiverAddress: values.Address_2,
  //           ReceiverDetailedAddress: values.Address_3,
  //           ReceiverPostcodeQT: "",
  //           ReceiverNationID: values.Nation,
  //           ReceiverProvinceID: values.City,
  //           ReceiverDistrictID: values.District,
  //           ReceiverWardID: values.Ward,
  //           ReceiverAddressID: values.AddressID,
  //           ReceiverPostOfficeID: values.Post_Office_Delivery,
  //           ReceiverShippingRouteID: values.Transmitter_Route,
  //           ReceiverZoneID: values.Broadcast_Area,
  //           MailType: values.Type,
  //           PackageListID: values.mailID,
  //           MailRealWeight: values.Actual_weight,
  //           MailTotalWeight: values.Weight,
  //           MailConvertedWeight: values.Conversion_weight,
  //           MailLength: values.mail_length,
  //           MailWidth: values.mail_width,
  //           MailHeight: values.mail_height,
  //           PackageAmount: values.Package_Quantity,
  //           PackageNotes: "",
  //           ServiceTypeID: values.Service,
  //           // ServiceTypeName: serviceName.label,
  //           ServiceTypeNotes: values.Notes,
  //           ServiceTypeSpecialNote: values.Service_Type_Notes,
  //           DeclaredValue: values.DeclaredValue,
  //           BasicFee: values.Rates,
  //           VATFee: values.VAT,
  //           TotalFee: values.Total,
  //           FuelFee: values.Sender,
  //           PostOfficeCreatedID: "NTI",
  //           PostOfficeCreatedName: "Nguyễn Trãi",
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       console.log(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  // };


  // const handleFormFinish = () => {
  //   // Your form handling logic here
  // };


  

  const handleFormFinish = async () => {
    
    try {
      const values = await form.validateFields();
      
      console.log("Form values:", values);

      const token = Cookies.get("authToken");

      const serviceName = serviceType.find((s) => s.value === values.Service);

      console.log("serviceName", values.mailID);
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
          PackageListID: values.mailID || "",
          MailRealWeight: values.Actual_weight || 0,
          MailTotalWeight: values.mailTotalWeight || 0,
          MailConvertedWeight: values.Conversion_weight || 0,
          MailLength:  values.mail_length || 0,
          MailWidth:  values.mail_width || 0,
          MailHeight:  values.mail_height || 0,
          PackageAmount:  values.Package_Quantity   || 0,
          PackageNotes:  "",
          ServiceTypeID: values.Service,
          ServiceTypeName: serviceName.label,
          ServiceTypeNotes: values.Notes || "",
          ServiceTypeSpecialNote: values.Service_Type_Notes || "",
          DeclaredValue: values.DeclaredValue,
          BasicFee: rates,
          VATFee: sendingRepresentative,
          TotalFee: total,
          FuelFee: sender,
          PostOfficeCreatedID: broadcastInfo.postOfficeID,
          PostOfficeCreatedName: "Nguyễn Trãi",
          MailID: values.mailID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      

      if (response.data) {
        showModalOpen();
      } else{
        message.error("Cập nhật đơn hàng thất bại");
      }
  
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

  const [provinceID, setProvinceID] = useState('');
  const [districtID, setDistrictID] = useState('');
  const [wardID, setWardID] = useState('');
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

  const handleWardChange = (value) => {
    setWardID(value);
  };
  const [broadcastInfo, setBroadcastInfo] = useState({
    zoneID: "",
    postOfficeID: "",
    shippingRouteID: "",
  });

  const handleZoneChange = async (value) => {
    if (provinceID !== "" && districtID !== "" && wardID !== "") {
      const token = Cookies.get("authToken");
    const response = await axios.post(
      `http://localhost:4000/postoffice/GetShippingRouteAndPO`,
      {
        ProvinceID: provinceID,
        ZoneID: value,
        DistrictID: districtID,
        WardID: wardID,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
   
      const options = {
        zoneID: value,
        postOfficeID: response.data.postOfficeID,
        shippingRouteID: response.data.shippingRouteID,
      }


    console.log("options", options);
    console.log("response.data", response.data);
    console.log("response.data[0]", response.data[0]);
    setBroadcastInfo(options);
    
    }
    
  };



  const [zone, setZone] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("authToken");
      const response = await axios.post(
        `http://localhost:4000/address/zone`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const options = response.data.map((d) => ({
        value: d.zoneID,
        label: d.zoneName,
      }));
      setZone(options);
    };
    fetchData();
  }, []);



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

  const [customer, setCustomer] = useState([]);
  const [customerID, setCustomerID] = useState("");
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
    navigate("/home/QLBP/Danhmuc");
  };

  const [modalText, setModalText] = useState("Cập nhật đơn thành công");
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const showModalOpen = () => {
    setOpenModal(true);
  };
  const handleOkOpen = () => {
    setModalText(
      "Cập nhật đơn thành công. Chuyển hướng đến trang danh sách đơn hàng"
    );
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenModal(false);
      setConfirmLoading(false);
      navigation("/home/QLBP/Danhmuc");
    }, 2000);
  };
  const handleCancelOpen = () => {
    setOpenModal(false);
  };

  // -----------TẠO KIỆN-----------

  const handleDelete = (key) => {
    const newData = dataSourcePackage.filter((item) => item.key !== key);
    setDataSourcePackage(newData);
  };
  const defaultColumns = [
    {
      title: "STT",
      dataIndex: "STT",
      // width: '30%',
      key: "STT",
    },
    {
      title: "Mã kiện",
      dataIndex: "PackageID",
      key: "PackageID",
      editable: true,
    },
    {
      title: "TL thực",
      dataIndex: "PackageRealWeight",
      key: "PackageRealWeight",
      editable: true,
    },
    {
      title: "Kích thước (cm)",
      children: [
        {
          title: "Dài",
          dataIndex: "PackageLength",
          key: "PackageLength",
          editable: true,

          width: 150,
        },
        {
          title: "Rộng",

          dataIndex: "PackageWeight",
          key: "PackageWeight",
          editable: true,

          width: 150,
        },
        {
          title: "Cao",

          dataIndex: "PackageHeight",
          key: "PackageHeight",
          editable: true,

          width: 100,
        },

        ,
      ],
    },
    {
      title: "TL",
      dataIndex: "PackageTotalWight",
      key: "PackageTotalWight",
    },
    {
      title: "TLQĐ",
      dataIndex: "PackageConvertedWeight",
      key: "PackageConvertedWeight",
    },
    {
      title: "Ghi chú",
      dataIndex: "PackageNotes",
      key: "PackageNotes",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSourcePackage.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <DeleteOutlined style={{ color: "var(--primary-color)" }} />
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

    if (dataSourcePackage.length > 0) {
      Modal.confirm({
        title: "Bạn có chắc chắn muốn thay đổi số kiện?",
        content:
          "Dữ liệu nhập trước đó sẽ bị xóa. Bạn có chắc chắn muốn tiếp tục?",

        okText: "Đồng ý",
        okType: "danger",
        cancelText: "Hủy",
        onOk: () => {
          const newData = [];
          for (let i = 0; i < packageQuantity; i++) {
            const newPackage = {
              key: i,
              STT: i + 1,
              PackageID: "",
              PackageRealWeight: <InputNumber />,
              PackageLength: <InputNumber />,
              PackageWeight: <InputNumber />,
              PackageHeight: <InputNumber />,
              PackageTotalWight: "",
              PackageConvertedWeight: "",
              PackageNotes: <Input />,
            };
            newData.push(newPackage);
          }

          setDataSourcePackage(newData);
        },
        onCancel: () => {
          console.log("Cancel");
        },
      });
    } else {
      const newData = [];
      for (let i = 0; i < packageQuantity; i++) {
        const newPackage = {
          key: i,
          STT: i + 1,
          PackageID: "",
          PackageRealWeight: <InputNumber />,
          PackageLength: <InputNumber />,
          PackageWeight: <InputNumber />,
          PackageHeight: <InputNumber />,
          PackageTotalWight: "",
          PackageConvertedWeight: "",
          PackageNotes: <Input />,
        };
        newData.push(newPackage);
      }
    }
  };

  const handleServiceChange = (value) => {
    // Assuming form is your form reference
    const values = formModal.getFieldsValue();
    values.ServiceTypeID = value;
    console.log("values-handleServiceChange", values);

    // Call the function and set the result to your formModal field
    const convertedWeight = calculateConversionWeight({
      MailLength: mailLength,
      MailWidth: mailWidth,
      MailHeight: mailHeight,
      ServiceTypeID: formModal.getFieldValue("ServiceTypeID"),
    });
  };

  const calculateConversionWeight = (values) => {
    let conversion = 0;
    const { MailLength, MailWidth, MailHeight, ServiceTypeID } = values;
    if (values.ServiceTypeID === "DE" || values.ServiceTypeID === "ED") {
      conversion = (MailLength * MailWidth * MailHeight) / 6000;
    } else if (values.ServiceTypeID === "IM" || values.ServiceTypeID === "IE") {
      conversion = (MailLength * MailWidth * MailHeight * 3) / 10000;

    } else {
      conversion = (MailLength * MailWidth * MailHeight) / 5000;
    }
    console.log(conversion);
    setConversionWeight(conversion);
    return conversion.toFixed(3);

  };
  const calculateWeight = () => {
    let weight = 0;
    if (actualWeight > conversionWeight) {
      weight = actualWeight;
    } else {
      weight = conversionWeight;
    }
    setWeight(weight);
    return weight;
  };
  const handleWeightChange = (value) => {
    setWeight(value);
  };
  const [mailLength, setMailLength] = useState(0);
  const [mailWidth, setMailWidth] = useState(0);
  const [mailHeight, setMailHeight] = useState(0);
  // const [serviceTypeID, setServiceTypeID] = useState("");
 const handleApplyAll = () => {
    const newData = [...dataSourcePackage];
    const serviceTypeID = form.getFieldValue("Service");
    // const
    for (let i = 0; i < packageQuantity; i++) {
      const item = newData[i];
      newData.splice(i, 1, {
        ...item,
        PackageRealWeight:actualWeight,
        PackageLength: <InputNumber value={mailLength} />,
        PackageWeight: <InputNumber value={mailWidth} />,
        PackageHeight: <InputNumber value={mailHeight} />,
        //
        PackageConvertedWeight: calculateConversionWeight({
          MailLength: mailLength,
          MailWidth: mailWidth,
          MailHeight: mailHeight,
          ServiceTypeID: serviceTypeID,
        }),
        // If converted weight > actual weight, then weight = converted weight. and vice versa
        PackageTotalWight: calculateWeight(),
        
        PackageNotes: <Input />,
      });
    }
   
    console.log("conversionWeight", conversionWeight);
    console.log("actualWeight", actualWeight);
    console.log("weight", weight);

    setDataSourcePackage(newData);
  console.log("newData",newData);
  };
  const [totalConvertedWeight, setTotalConvertedWeight] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const calculateTotalConvertedWeight = () => {
    
    let totalConvertedWeight = 0.0;
    let count = 0;
    console.log("dataSourcePackage", dataSourcePackage);
    for (let i = 0; i < dataSourcePackage.length; i++) {
      const item = dataSourcePackage[i];
      const convertedWeight = item.PackageConvertedWeight;
      if (convertedWeight) {
        totalConvertedWeight += parseFloat(convertedWeight);
        count++;
      }
    }
    // setTotalConvertedWeight(totalConvertedWeight);
    // console.log("totalConvertedWeight", totalConvertedWeight);
    return totalConvertedWeight.toFixed(3);
  };

  const calculateTotalWeight = () => {
   
    let totalWeight = 0.0;
    let count = 0;
    console.log("dataSourcePackage", dataSourcePackage);
    for (let i = 0; i < dataSourcePackage.length; i++) {
      const item = dataSourcePackage[i];
      const weight = item.PackageTotalWight;
      if (weight) {
        totalWeight += parseFloat(weight);
        count++;
      }
    }
    // setTotalWeight(totalWeight);
    // console.log("totalWeight", totalWeight);
    return totalWeight.toFixed(3);
  };

  const [inputValue, setInputValue] = useState({
    PackageRealWeight: " ",
  });
  const calculateTotalRealWeight = () => {
   
    let totalRealWeight = 0.0;
    let count = 0;
    console.log("dataSourcePackage", dataSourcePackage);
    for (let i = 0; i < dataSourcePackage.length; i++) {
      const item = dataSourcePackage[i];
      const realWeight = item.PackageRealWeight ;
      if (realWeight) {
        totalRealWeight += parseFloat(realWeight);
        count++;
      }
    }
    // setTotalWeight(totalWeight);
    console.log("totalWeight", totalRealWeight);
    return totalRealWeight.toFixed(3);
  };
  // if number of packageAmount is different from 0, then converted weight = total converted weight, TL = Total TL,

  const [packageAmount, setPackageAmount] = useState(0);
  const handlePackageAmountChange = (value) => {
    setPackageAmount(value);
    if (value !== 0) {
      // setConversionWeight(totalConvertedWeight);
      
      // setWeight(totalWeight);
      // setActualWeight(totalRealWeight);

      const convertedWeight = calculateTotalConvertedWeight();
      const weight = calculateTotalWeight();
      const realWeight = calculateTotalRealWeight();
      console.log("convertedWeight", convertedWeight);
      console.log("weight", weight);
      console.log("realWeight", realWeight);
      // setConversionWeight(convertedWeight);
      // setWeight(weight);
      // setActualWeight(realWeight);
    } else {
      handleConversionWeightChange();
      handleActualWeightChange();
    }
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
      key: "",
      STT: " ",
      PackageID: " ",
      PackageRealWeight: " ",
      PackageLength: " ",
      PackageWeight: " ",
      PackageHeight: " ",
      PackageTotalWight: " ",
      PackageConvertedWeight: " ",
      PackageNotes: " ",
    },
  ]);

  const handleTableChange = () => {
   
    setDataSourcePackage([]);

    // Reset dependent values to their initial state
    setConversionWeight(0);
    setWeight(0);
    setActualWeight(0);
  
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
  };
  const handleTypeChange = (value) => {
    setSelectedType(value);
    const serviceValue = form.getFieldValue("Service");
    if (!serviceValue) {
      // Show error modal
      Modal.error({
        title: "Error",
        content: "Hãy chọn dịch vụ trước khi chọn loại hình",
      });
      setSelectedType("");
      setActualWeight(0);
    } else {
      setSelectedType(value);
    }
  };

  const handleRealWeightChange = (value) => {
    setActualWeight(value);
    const serviceValue = form.getFieldValue("Service");
    const selectedType = form.getFieldValue("Type");
    if (!serviceValue) {
      // Show error modal
      Modal.error({
        title: "Error",
        content: "Hãy nhận dịch vụ trước khi nhập TL thực",
      });

      // Reset the weight
      setActualWeight(0);
      form.setFieldsValue({
        Actual_weight: 0,
      });
      setSelectedType("");
    } else if (selectedType === "TL" && value > 2) {
      Modal.error({
        title: "Error",
        content: "Loại hình tài liệu chỉ được nhập TL thực nhỏ hơn 2kg",
      });
      setActualWeight(0);
      form.setFieldsValue({
        Actual_weight: 0,
      });
    } else {
      handleActualWeightChange(value);
    }
  };
  let ModalOpenTaokien = false;

  const showModalTaokien = () => {
    console.log("selectedType", selectedType);
    if (selectedType === "TL") {
      Modal.error({
        title: "Error",
        content: "Chỉ riêng loại hình HH (hàng hóa) mới được tạo kiện",
      });
    } else {
      ModalOpenTaokien = true;
    }
  };

  return (
    <div className="form-create">
      <Typography.Title level={3}>CẬP NHẬT ĐƠN HÀNG</Typography.Title>
      <Form form={form}>
        
        {/* -------------Thông tin người gửi----------- */}
        <Row gutter={40}>
          {/* left col */}
          <Col span={12}>
            <Row>
              <h4>Thông tin người gửi</h4>
            </Row>

            <Row gutter={[12, 8]}>
              {/* Mã khách hàng */}
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Mã khách hàng"
                  name="customerId"
                  className="min-width-100"
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
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn mã khách hàng",
                      },
                    ]}
                  >
                    {customer.map((opt) => (
                      <Option key={opt.value} value={opt.value}>
                        {opt.value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              {/* Số điện thoại */}
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Số điện thoại"
                  name="Phone_Number_1"
                  className="min-width-100"
                >
                  <Input value={customerInfo.phoneNumber} />
                  &nbsp;
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[12, 8]}>
              {/* Tên công ty */}
              <Col className="gutter-row" span={24}>
                <Form.Item
                  label="Tên công ty"
                  name="Company_name"
                  className="min-width-100"
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
            </Row>
            <Row gutter={[12, 8]}>
              {/* Địa chỉ KH */}
              <Col className="gutter-row" span={24}>
                <Form.Item
                  label="Địa chỉ KH"
                  name="Address_1"
                  className="min-width-100"
                >
                  <Input value={customerInfo.address} />
                  &nbsp;
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[12, 8]}>
              {/* Người gửi */}
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Người gửi"
                  name="Send"
                  className="min-width-100"
                >
                  <Input />
                </Form.Item>
              </Col>
              {/* Đại diện gửi */}
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Đại diện gửi"
                  name="Sending_representative"
                  className="min-width-100"
                >
                  <Input showSearch />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[12, 8]}>
              <h4>Thông tin người nhận</h4>
            </Row>
            <Row gutter={[12, 8]}>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Số điện thoại"
                  name="Phone_Number_2"
                  className="min-width-100"
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
              {/* Họ tên nhận */}
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Họ tên nhận"
                  name="Receiver_Name"
                  className="min-width-100"
                >
                  <Input showSearch />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[12, 8]}>
              {/* Công ty nhận */}
              <Col className="gutter-row" span={24}>
                <Form.Item
                  label="Công ty nhận"
                  name="Receiver_Company"
                  className="min-width-100"
                >
                  <Input showSearch />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[12, 8]}>
              {/* Địa chỉ NN */}
              <Col className="gutter-row" span={24}>
                <Form.Item
                  label="Địa chỉ NN"
                  name="Address_2"
                  className="min-width-100"
                >
                  <Input showSearch />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[12, 8]}>
              {/* Quốc gia */}
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Quốc gia"
                  name="Nation"
                  className="min-width-100"
                >
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
              {/* Tỉnh/thành */}
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Tỉnh/thành"
                  name="City"
                  className="min-width-100"
                >
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
            </Row>

            <Row gutter={[12, 8]}>
              {/* Quận/huyện */}
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Quận/huyện"
                  name="District"
                  className="min-width-100"
                >
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
              {/* Phường/xã */}
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Phường/xã"
                  name="Ward"
                  className="min-width-100"
                >
                  <Select
                    showSearch
                    placeholder=""
                    optionFilterProp="children"
                    filterOption={(input, option) => {
                      const value = option.value || "";
                      return value.toLowerCase().includes(input.toLowerCase());
                    }}
                    onChange={handleWardChange}
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
            <Row gutter={[12, 8]}>
              {/* Địa chỉ chi tiết */}
              <Col className="gutter-row" span={24}>
                <Form.Item
                  label="Địa chỉ chi tiết"
                  name="Address_3"
                  className="min-width-100"
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[12, 8]}>
              {/* Mã địa chỉ */}
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Mã địa chỉ"
                  name="AddressID"
                  className="min-width-100"
                >
                  <Input showSearch />
                </Form.Item>
              </Col>
              {/* Vùng phát */}
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Vùng phát"
                  name="Broadcast_Area"
                  className="min-width-100"
                >
                   <Select
                    showSearch
                    placeholder=""
                    optionFilterProp="children"
                    onChange={handleZoneChange}
                  >
                    {zone.map((opt) => (
                      <Option key={opt.value} value={opt.value}>
                        {opt.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
             
            <Row gutter={[12, 8]}>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="BC phát"
                  name="Post_Office_Delivery"
                  className="min-width-100"
                >
                  <Input 
                  value={broadcastInfo.postOfficeID}
                  />
                  
                </Form.Item>
              </Col>
              {/* Tuyến GN phát */}
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Tuyến GN phát"
                  name="Transmitter_Route"
                  className="min-width-100"
                >
                  <Input 
                  value={broadcastInfo.shippingRouteID}
                  />
                  
                </Form.Item>
              </Col>
            </Row>
            
           
          </Col>

          {/* right col */}
          <Col span={12}>
            <Row gutter={[12, 8]}>
              <h4>Thông tin BP/BK</h4>
            </Row>
            <Row gutter={[12, 8]}>
              {/* Loại hình */}
              <Col className="gutter-row" span={10}>
                <Form.Item
                  label="Loại hình"
                  name="Type"
                 
                  className="min-width-100"
                >
                  <Select
                    showSearch
                    placeholder=""
                    optionFilterProp="children"
                    filterOption={(input, option) => {
                      const value = option.value || "";
                      return value.toLowerCase().includes(input.toLowerCase());
                    }}
                    onChange={handleTypeChange}
                  >
                    onChange={(value) => setSelectedType(value)}
                    {LH.map((LH) => (
                      <Option
                        key={LH.value}
                        value={LH.value}
                        defaultValue={selectedType}
                      >
                        {LH.value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              {/* Số kiện */}
              <Col className="gutter-row" span={8}>
                <Form.Item label="Số kiện" name="Package_Quantity">
                  <InputNumber
                    min={0}
                    max={100}
                    defaultValue={0}
                    disabled={selectedType === "TL" || selectedType === ""}
                    onChange={(value) => handlePackageAmountChange(value)}
                    
                  />
                  {/* &nbsp; */}
                </Form.Item>
              </Col>
              {/* Tạo kiện */}
              <Col className="gutter-row" span={6}>
                <Form.Item name="Package_Quantity_button">
                  <Button
                    type="primary"
                    onClick={
                      selectedType === "HH" ? showModal : showModalTaokien
                    }
                  >
                    Tạo kiện
                  </Button>

                  </Form.Item>
                  {/* ----------------------NHẬP KIỆN------------ */}
                  <Modal
                    title="Tạo kiện"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={1200}
                  >
                    <Form form={formModal}
                    initialValues={{
                      Package_Quantity_Modal: "",
                      Actual_weight_Modal: "",
                      mail_length: "",
                      mail_width: "",
                      mail_height: "",
                      Symbol: "",
                      Total_real_weight: "",
                      Total_weight: "",
                      Total_conversion_weight: "",

                    }}
                    
                    >

                      <Row gutter={[24, 8]}>
                        <Col span={8}>
                          <Form.Item
                            label="Số kiện"
                            name="Package_Quantity_Modal"
                            rules={[
                              {
                                pattern: /^(?:[2-9]|[1-9][0-9]+)$/,
                                message: "Chỉ nhập số nguyên dương lớn hơn 2",
                              },
                            ]}
                          >
                            <Input
                              min={0}
                              max={100}
                              defaultValue={0}
                              onChange={(e) =>
                                setPackageQuantity(e.target.value)
                              }
                            />
                            &nbsp;
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
                                return value
                                  .toLowerCase()
                                  .includes(input.toLowerCase());
                              }}
                            >
                              {symbols.map((symbols) => (
                                <Option
                                  key={symbols.value}
                                  value={symbols.value}
                                >
                                  {symbols.label}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Button
                            type="primary"
                            htmlType="submit"
                            onClick={() => applyChanges()}
                          >
                            Áp dụng
                          </Button>
                        </Col>
                      </Row>
                      <Row gutter={[24, 8]}>
                        <Col span={4}>
                          <Form.Item
                            name="Actual_weight_Modal"
                            rules={[
                              {
                                pattern: /^(?:[1-9]\d*|0)(?:\.\d+)?$/,
                                message: "Chỉ nhập số lớn hơn 0",
                              },
                            ]}
                          >
                            <Input
                              placeholder="TL thực (kg)"
                              min={0}
                              max={100}
                              onChange={(e) => setActualWeight(e.target.value)}
                            />
                           
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Form.Item
                            name="mail_length"
                            rules={[
                              {
                                pattern: /^(?:[1-9]\d*|0)(?:\.\d+)?$/,
                                message: "Chỉ nhập số lớn hơn 0",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Dài (cm)"
                              min={0}
                              max={100}
                              onChange={(e) => {
                                setMailLength(e.target.value);
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Form.Item
                            name="mail_width"
                            rules={[
                              {
                                pattern: /^(?:[1-9]\d*|0)(?:\.\d+)?$/,
                                message: "Chỉ nhập số lớn hơn 0",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Rộng (cm)"
                              min={0}
                              max={100}
                              onChange={(e) => {
                                setMailWidth(e.target.value);
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Form.Item
                            name="mail_height"
                            rules={[
                              {
                                pattern: /^(?:[1-9]\d*|0)(?:\.\d+)?$/,
                                message: "Chỉ nhập số lớn hơn 0",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Cao (cm)"
                              min={0}
                              max={100}
                              onChange={(e) => setMailHeight(e.target.value)}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Button
                            type="primary"
                            htmlType="submit"
                            onClick={handleApplyAll}
                          >
                            Áp dụng cho tất cả các kiện
                          </Button>
                        </Col>
                      </Row>
                      <Table
                        rowClassName={() => "editable-row"}
                        bordered
                        dataSource={dataSourcePackage}
                        columns={defaultColumns}
                        onChange={handleTableChange}
                      />
                      <Row gutter={[24, 8]}>
                        <Col span={8}>
                          <Form.Item
                            label="Tổng TL thực (kg)"
                            name="Total_real_weight"
                          >
                            <Input placeholder="" 
                            min={0} 
                            max={100} 
                            disabled
                            value={calculateTotalRealWeight()}
                            />
                            
                          </Form.Item>
                        </Col>
                      
                  
                        <Col span={8}>
                          <Form.Item
                            label="Tổng TL (kg)"
                            name="Total_weight"
                          >
                            <Input placeholder="" 
                            min={0} 
                            max={100} 
                            disabled
                            value={calculateTotalWeight()}
                            />
                            
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            label="Tổng TLQĐ (kg)"
                            name="Total_conversion_weight"
                          >
                            <Input 
                            placeholder="" 
                            min={0} 
                            max={100} 
                             value={calculateTotalConvertedWeight()}
                            />
                           
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </Modal>
              </Col>
            </Row>

            <Row gutter={[12, 8]}>
              {/* TL thực */}
              <Col className="gutter-row" span={10}>
                <Form.Item
                  label="TL thực"
                  name="Actual_weight"
                  className="min-width-100"
                >
                  <InputNumber
                    min={0}
                    max={100}
                    step={0.001}
                    value={calculateTotalRealWeight()}
                    // onChange={handleRealWeightChange}
                  />
                  
                </Form.Item>
              </Col>

              {/* TLQĐ */}
              <Col className="gutter-row" span={8}>
                <Form.Item label="TLQĐ" name="Conversion_weight" className="">
                  <InputNumber
                    type="dashed"
                    min={0}
                    max={100}
                    step={0.001}
                    readOnly
                    value={calculateTotalConvertedWeight()}
                  />
                 
                </Form.Item>
              </Col>

              {/* TL */}
              <Col className="gutter-row" span={6}>
                <Form.Item label="TL" name="Weight" type="dashed" className="">
                  <InputNumber
                    type="dashed"
                    style={{ color: "red" }}
                    min={0}
                    max={100}
                    // onChange={handleWeightChange} // Call the function on change
                    step={0.001}
                    value={calculateTotalWeight()}
                    readOnly
                  />
                 
                </Form.Item>
              </Col>
            </Row>

            <h4>Thông tin dịch vụ</h4>
            {/* ---------Thông tin dịch vụ----------- */}

            <Row gutter={[12, 8]}>
              {/* Dịch vụ */}
              <Col className="gutter-row" span={16}>
                <Form.Item
                  label="Dịch vụ"
                  name="Service"
                 
                  className="min-width-100"
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
              {/* Dịch vụ GTGT */}
              <Col className="gutter-row" span={8}>
                <Form.Item
                  label="Dịch vụ GTGT"
                  name=""
                  className=""
                >
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
              </Row>
              {/* Ghi chú đặc biệt */}
              <Row gutter={[12, 8]}>
              <Col className="gutter-row" span={16}>
                <Form.Item
                  label="Ghi chú đặc biệt"
                  name="Service_Type_Notes"
                  className="min-width-100"
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
                    {Notes.map((Notes) => (
                      <Option key={Notes.value} value={Notes.value}>
                        {Notes.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              {/* Giá trị khai */}
              <Col className="gutter-row" span={4}>
                <Form.Item
                  label="Giá trị khai"
                  className=""
                  name="DeclaredValue"
                  rules={[
                    {
                      pattern: /^[0-9]+$/,
                      message: "Vui lòng chỉ nhập số.",
                    },
                  ]}
                >
                  <InputNumber /> 
                </Form.Item>
              </Col>
              {/* Nội dung */}
              <Col className="gutter-row" span={24}>
                <Form.Item
                  label="Nội dung"
                  name="Notes"
                  className="min-width-100"
                >
                  <Input showSearch />
                 
                </Form.Item>
              </Col>
            </Row>

            {/* -------------Giá cước----------- */}
            <h4>Giá cước</h4>
           
            <Row gutter={[12, 8]}>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Giá cước"
                  name="Rates"
                  className="min-width-100"
                >
                  <Input
                    onChange={(e) => setRates(e.target.value)}
                    value={rates}
                    style={{ color: "red" }}
                    readOnly
                    
                  />
                  &nbsp;
                </Form.Item>
              </Col>
              {/* PP xăng dầu */}
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="PP xăng dầu"
                  name="Sender"
                  className="min-width-100"
                >
                  <Input
                    style={{ color: "red" }}
                    onChange={(e) => setSender(e.target.value)}
                    value={sender}
                  />
                  &nbsp;
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[12, 8]}>
              {/* VAT */}
              <Col className="gutter-row" span={12}>
                <Form.Item label="VAT" name="VAT" className="min-width-100">
                  <Input
                    style={{ color: "red" }}
                    onChange={(e) => setSendingRepresentative(e.target.value)}
                    value={sendingRepresentative}
                  />
                  &nbsp;
                </Form.Item>
              </Col>
              {/* Thành tiền */}
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Thành tiền"
                  name="Total"
                  className="min-width-100"
                >
                  <Input style={{ color: "red" }} value={total} />
                  &nbsp;
                </Form.Item>
              </Col>
            </Row>
            
          
          </Col>
        </Row>

        {/* -------------Thông tin BP/BK----------- */}

        {/* -------------Thông tin người nhận----------- */}

        {/* -------------TButton----------- */}

    
          
        <Row>
            <Col span={12} offset={12}>
              <Form.Item
                label=" "
                colon={false}
                style={{ textAlign: "center" }}
              >
               <Button type="primary" htmlType="submit" onClick={handleFormFinish}>
          Lưu đơn hàng
        </Button>
        <Button style={{ marginLeft: 24 }} onClick={handleCancelClick}>
          Trở về
        </Button>
        <Modal
                title="Tạo đơn hàng"
                open={openModal}
                onOk={handleOkOpen}
                confirmLoading={confirmLoading}
                onCancel={handleCancelOpen}
              >
                <p>{modalText}</p>
              </Modal>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      
    </div>
  );
}

export default EditOrder;
