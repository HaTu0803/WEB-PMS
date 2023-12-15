import React, { useState, useContext, useRef } from "react";
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
  Divider,
} from "antd";
import dayjs from "dayjs";
import { DatePicker, Space } from "antd";
import { useEffect } from "react";
import { getTodosAPI } from "../../api/todos";
import "./createOrder.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  CloseSquareOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";

// import Theme from '../../themes/theme';
const { RangePicker } = DatePicker;
const { Option } = Select;

function CreateOrder() {
  const [form] = Form.useForm();
  const [formModal] = Form.useForm();
  const navigation = useNavigate();
  const [modal, contextHolder] = Modal.useModal();
  const { mailID } = useParams();
  const [packageAmount, setPackageAmount] = useState(0);
  // const [tempResponseData, setTempResponseData] = useState('');

  // // let MailReponse = [];

  // console.log("tempResponseData", tempResponseData);
  const handleFormFinish = async () => {
    try {
      const valuesPackage = await formModal.validateFields();
      const values = await form.validateFields();

      const token = Cookies.get("authToken");

      const tempResponse = await axios.post(
        `http://localhost:4000/mail/GenerateMailID/ABH`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const serviceName = serviceType.find((s) => s.value === values.Service);

     

      //         let ListPackageID = [];

      //         for (let i = 0; i < MailReponse.data.length; i++) {

      //           const PackageID = MailReponse.data[i];

      //      const CreatePackage = await axios.post(
      //         "http://localhost:4000/mail/CreatePackage",

      //         {

      //           PackageID: PackageID,
      //           MailID: tempResponse.data,
      //           IsUsedMailID: true,
      //           PackageStatus: "KHỞI TẠO",
      //           PackageRealWeight: actualWeight,
      //           PackageLength: valuesPackage.mail_length,
      //           PackageWeight: valuesPackage.mail_width,
      //           PackageHeight: valuesPackage.mail_height,
      //           PackageTotalWight: weight,
      //           PackageConvertedWeight: convertedWeight,
      //           PackageNotes: valuesPackage.mail_notes,
      //         },
      //         {
      //           headers: {
      //             Authorization: `Bearer ${token}`,
      //           },
      //         }
      //       );
      //       ListPackageID.push(PackageID); // Assuming you want to store PackageID in an array
      //       console.log(`CreatePackage ${i + 1}`, CreatePackage);
      // console.log("ListPackageID", ListPackageID);
      //       }
      //       console.log("ListPackageID", ListPackageID);
      //       console.log("ListPackageID", ListPackageID[0]);
      //       console.log("ListPackageID", ListPackageID[1]);
      //       console.log("ListPackageID", ListPackageID[2]);
      //       console.log("ListPackageID", ListPackageID[3]);

      const response = await axios.post(
        "http://localhost:4000/mail/Create",
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
          RecieverName: values.Receiver_Name ,
          ReceiverCompanyName: values.Receiver_Company,
          ReceiverAddress: values.Address_2,
          ReceiverDetailedAddress: values.Address_3,
          ReceiverPostcodeQT: "",
          ReceiverNationID: values.Nation,
          ReceiverProvinceID: values.City,
          ReceiverDistrictID: values.District,
          ReceiverWardID: values.Ward,
          ReceiverAddressID: values.AddressID,
          ReceiverPostOfficeID: broadcastInfo.postOfficeID,
          ReceiverShippingRouteID: broadcastInfo.shippingRouteID,
          ReceiverZoneID: values.Broadcast_Area,
          MailType: values.Type,
          PackageListID: tempResponse.data,
          MailRealWeight: values.Actual_weight,
          MailTotalWeight: values.Weight,
          MailConvertedWeight: values.Converted_weight || 0,
          MailLength: calculateTotalLength() || 0,
          MailWidth: calculateTotalWidth()  || 0,
          MailHeight: calcutlateTotalHeigth() || 0,
          PackageAmount: values.Package_Quantity || 0,
          PackageNotes: "",
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
          MailID: tempResponse.data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ); 
    

      const MailReponse = await axios.post(
        "http://localhost:4000/mail/GeneratePackageID",
        {
          MailID: response.data,
          PackageAmount: values.Package_Quantity,
          SeperateSymbol: valuesPackage.Symbol,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("MailReponse", MailReponse);

      let ListPackageID = [];
      for (let i = 0; i < MailReponse.data.length; i++) {
        const PackageID = MailReponse.data[i];
        const packageObject = {
          PackageID: PackageID,
          MailID: tempResponse.data,
          IsUsedMailID: true,
          PackageStatus: "KHỞI TẠO",
          PackageRealWeight: getRowRealWeight(i),
          PackageLength: getRowLength(i),
          PackageWeight: getRowWidth(i),
          PackageHeight: getRowHeight(i),
          PackageTotalWight: getRowWeight(i),
          PackageConvertedWeight: getRowConvertedWeight(i),
          PackageNotes: "",
        };
        ListPackageID.push(packageObject);
      }

      console.log("ListPackageID 1", ListPackageID);
      // console.log("ListPackageID 1", ListPackageIDJson);

      const createPackageResponse = await axios.post(
        "http://localhost:4000/mail/CreatePackage",
        ListPackageID,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("createPackageResponse", createPackageResponse);

      if (response.data) {
        showModalOpen();
      } else {
        message.error("Tạo đơn hàng thất bại");
      }
    } catch (error) {
      // Handle request error
      console.error("API request failed:", error);
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

  const [provinceID, setProvinceID] = useState("");
  const [districtID, setDistrictID] = useState("");
  const [wardID, setWardID] = useState("");

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
    setProvinceID(value);
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
    setDistrictID(value);
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

  const handleWardChange = async (value) => {
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
      };

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

  const [selectedType, setSelectedType] = useState("");
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
  const [convertedWeight, setConvertedWeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const handleActualWeightChange = (value) => {
    setActualWeight(value);
    updateWeight(value, convertedWeight);
  };

  const handleConvertedWeightChange = (value) => {
    setConvertedWeight(value);
    updateWeight(actualWeight, value);
  };

  const updateWeight = (actualWeight, convertedWeight) => {
    if (actualWeight > convertedWeight) {
      setWeight(actualWeight);
    } else {
      setWeight(convertedWeight);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form.setFieldsValue({
      Package_Quantity: formModal.getFieldValue("Package_Quantity_Modal"),
      // Converted_weight: formModal.getFieldValue("Total_converted_weight"),
      // Actual_weight: formModal.getFieldValue("Total_real_weight"),
      // Weight: formModal.getFieldValue("Total_weight"),
    });
    form.setFieldsValue({
      Converted_weight: calculateTotalConvertedWeight(),
      ActWeightual_weight: calculateTotalRealWeight(),
      Weight: calculateTotalWeight(),
    });

    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [modalText, setModalText] = useState("Đơn tạo thành công");
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const showModalOpen = () => {
    setOpenModal(true);
  };
  const handleOkOpen = () => {
    setModalText(
      "Đơn tạo thành công. Chuyển hướng đến trang danh sách đơn hàng"
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

  const navigate = useNavigate();

  // -----------TẠO KIỆN-----------

  const [totalConvertedWeight, setTotalConvertedWeight] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const calculateTotalConvertedWeight = () => {
    let totalConvertedWeight = 0.0;
    let count = 0;
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

  const [defaultTotalRealWeight, setDefaultTotalRealWeight] = useState("0.000");
  const [defaultTotalWeight, setDefaultTotalWeight] = useState("0.000");
  const [defaultTotalConvertedWeight, setDefaultTotalConvertedWeight] =
    useState("0.000");
  
  useEffect(() => {
    if (dataSourcePackage.length > 0) {
      const defaultTotalRealWeight = calculateTotalRealWeight();
      setDefaultTotalRealWeight(defaultTotalRealWeight);
      const defaultTotalWeight = calculateTotalWeight();
      setDefaultTotalWeight(defaultTotalWeight);
      const defaultTotalConvertedWeight = calculateTotalConvertedWeight();
      setDefaultTotalConvertedWeight(defaultTotalConvertedWeight);
    }
    

  }, []);

  const calcutlateTotalHeigth = () => {
    let totalHeight = 0.0;
    let count = 0;
    for (let i = 0; i < dataSourcePackage.length; i++) {
      const item = dataSourcePackage[i];
      const height = item.PackageHeight;
      if (height) {
        totalHeight += parseFloat(height);
        count++;
      }
    }
    // setTotalWeight(totalWeight);
    return totalHeight.toFixed(3);
  };

  const calculateTotalLength = () => {
    let totalLength = 0.0;
    let count = 0;
    for (let i = 0; i < dataSourcePackage.length; i++) {
      const item = dataSourcePackage[i];
      const length = item.PackageLength;
      if (length) {
        totalLength += parseFloat(length);
        count++;
      }
    }
    // setTotalWeight(totalWeight);
    return totalLength.toFixed(3);
  };

  const calculateTotalWidth = () => {
    let totalWidth = 0.0;
    let count = 0;
    for (let i = 0; i < dataSourcePackage.length; i++) {
      const item = dataSourcePackage[i];
      const width = item.PackageWeight;
      if (width) {
        totalWidth += parseFloat(width);
        count++;
      }
    }
    // setTotalWeight(totalWeight);
    return totalWidth.toFixed(3);
  };

  const calculateTotalRealWeight = () => {
    let totalRealWeight = 0.0;

    let count = 0;
    for (let i = 0; i < dataSourcePackage.length; i++) {
      const item = dataSourcePackage[i];
      const realWeight = item.PackageRealWeight;
      if (realWeight) {
        totalRealWeight += parseFloat(realWeight);
        count++;
      }
    }
    // setTotalWeight(totalWeight);
    return totalRealWeight.toFixed(3);
  };
  // if number of packageAmount is different from 0, then converted weight = total converted weight, TL = Total TL,
  // console.log("123", dataSourcePackage.length);

  // const PackageNotes = () => {
  //   let PackageNotes = "";
  //   for (let i = 0; i < dataSourcePackage.length; i++) {
  //     const item = dataSourcePackage[i];
  //     const notes = item.PackageNotes;
  //     if (notes) {
  //       PackageNotes += notes;
  //     }
  //   }
  //   return PackageNotes;
  // };

  // const handleWeightChange = (value) => {
  //   const totalConvertedWeight = calculateTotalConvertedWeight(value);
  //   const totalWeight = calculateTotalWeight(value);
  //   const totalRealWeight = calculateTotalRealWeight(value);
  //   form.setFieldsValue({
  //     Converted_weight: totalConvertedWeight,
  //     Weight: totalWeight,
  //     Actual_weight: totalRealWeight,
  //   });
  // };


  const getRowConvertedWeight = (row) => {
    let convertedWeight = 0;
    for (let i = 0; i < dataSourcePackage.length; i++) {
      const item = dataSourcePackage[row];
      const firstItem = item.PackageConvertedWeight;
      convertedWeight = firstItem
        ? parseFloat(firstItem).toFixed(3)
        : "0.000";
    }
    return convertedWeight;
  };

  const getRowWeight = (row) => {
    let weight = 0;
    for (let i = 0; i < dataSourcePackage.length; i++) {
      const item = dataSourcePackage[row];
      const firstItem = item.PackageTotalWight;
      weight = firstItem ? parseFloat(firstItem).toFixed(3) : "0.000";
    }
    return weight;
  };

  const getRowRealWeight = (row) => {
    let realWeight = 0;
    for (let i = 0; i < dataSourcePackage.length; i++) {
      const item = dataSourcePackage[row];
      const firstItem = item.PackageRealWeight;
      realWeight = firstItem ? parseFloat(firstItem).toFixed(3) : "0.000";
    }
    return realWeight;
  };

  const getRowLength = (row) => {
    let length = 0;
    for (let i = 0; i < dataSourcePackage.length; i++) {
      const item = dataSourcePackage[row];
      const firstItem = item.PackageLength;
      length = firstItem ? parseFloat(firstItem).toFixed(3) : "0.000";
    }
    return length;
  };

  const getRowWidth = (row) => {
    let width = 0;
    for (let i = 0; i < dataSourcePackage.length; i++) {
      const item = dataSourcePackage[row];
      const firstItem = item.PackageWeight;
      width = firstItem ? parseFloat(firstItem).toFixed(3) : "0.000";
    }
    return width;
  };

  const getRowHeight = (row) => {
    let height = 0;
    for (let i = 0; i < dataSourcePackage.length; i++) {
      const item = dataSourcePackage[row];
      const firstItem = item.PackageHeight;

      height = firstItem ? parseFloat(firstItem).toFixed(3) : "0.000";
    }
    return height;
  };
  

  const calculateConvertedWeight = (values) => {
    let convertedWeight = 0;

    // const { MailLength, MailWidth, MailHeight, ServiceTypeID } = values;
    if (values.serviceTypeID === "DE" || values.serviceTypeID === "ED") {
      convertedWeight = (mailLength * mailWidth * mailHeight) / 6000;
    } else if (values.serviceTypeID === "IM" || values.serviceTypeID === "IE") {
      convertedWeight = (mailLength * mailWidth * mailHeight * 3) / 10000;
    } else {
      convertedWeight = (mailLength * mailWidth * mailHeight) / 5000;
    }
    console.log("convertedWeight 2", convertedWeight);
    setConvertedWeight(convertedWeight);
    calculateWeight();
    return convertedWeight.toFixed(3);
  };
  const calculateWeight = () => {
    let weight = 0.0;
    if (actualWeight > convertedWeight) {
      weight = parseFloat(actualWeight);
    } else if (convertedWeight > actualWeight) {
      weight = parseFloat(convertedWeight);
    }
    // } else if (weight > convertedWeight) {
    //   weight = parseFloat(weight);
    // } else if (weight > actualWeight) {
    //   weight = parseFloat(weight);
    // }

    console.log("weight 2", weight);
    setWeight(weight);
    return weight.toFixed(3);
    // return weight.toFixed(3);
  };

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            // style={{
            //   margin: 0,
            // }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    formModal.setFieldsValue({
      PackageHeight: "",
      PackageLength: "",
      PackageWeight: "",
      PackageRealWeight: "",
      ...record,
    });
    setEditingKey(record.key);
  };
 
  const cancel = () => {
    setEditingKey("");
  };
  
  const save = async (key) => {
    try {
      const row = await formModal.validateFields();
      const newData = [...dataSourcePackage];
      const index = newData.findIndex((item) => key === item.key);

      let updatedRow;
      if (index > -1) {
        const item = newData[index];
        updatedRow = { ...item, ...row, ...
          
          handleWeightCalculation(row)
        
        };
        newData.splice(index, 1, updatedRow);
      } else {
        updatedRow = { ...row, ...handleWeightCalculation(row) };
        newData.push(updatedRow);
        
      }



      setDataSourcePackage(newData);
      setEditingKey("");
      console.log("newData", newData);
      console.log("updatedRow", updatedRow);
      console.log("row", row);
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const handleWeightCalculation = (row) => {
   const { PackageRealWeight, PackageLength, PackageWeight, PackageHeight } = row;
   const ServiceTypeID = form.getFieldValue("Service");
    const convertedWeight = () => {
      console.log("PackageRealWeight", PackageRealWeight);
      let convertedWeight = 0;
      if (ServiceTypeID === "DE" || ServiceTypeID === "ED") {
        convertedWeight = (PackageLength * PackageWeight * PackageHeight) / 6000;
      } else if (ServiceTypeID === "IM" || ServiceTypeID === "IE") {
        convertedWeight = (PackageLength * PackageWeight * PackageHeight * 3) / 10000;
      } else {
        convertedWeight = (PackageLength * PackageWeight * PackageHeight) / 5000;
      }
      console.log("convertedWeight 2", convertedWeight);
      setConvertedWeight(convertedWeight);
      return convertedWeight.toFixed(3);
    }
 

    const weight = () => {
      let weight = 0.0;
      if (convertedWeight() < PackageRealWeight) {
        weight = parseFloat(PackageRealWeight);
      } else if (convertedWeight() > PackageRealWeight) {
        weight = parseFloat(convertedWeight());
      }

      console.log("weight 2", weight);
      setWeight(weight);
      return weight.toFixed(3);
      // return weight.toFixed(3);
    }

    const PackageNotes = () => {
      let PackageNotes = "";
      for (let i = 0; i < dataSourcePackage.length; i++) {
        const item = dataSourcePackage[i];
        const notes = item.PackageNotes;
        if (notes) {
          PackageNotes += notes;
        }
      }
      return PackageNotes;
    };
    const updatedRow = {
      PackageRealWeight: parseFloat(PackageRealWeight).toFixed(3),
      PackageLength: parseFloat(PackageLength).toFixed(3),
      PackageWeight: parseFloat(PackageWeight).toFixed(3),
      PackageHeight: parseFloat(PackageHeight).toFixed(3),
      PackageTotalWight: weight(),
      PackageConvertedWeight: convertedWeight(),
      PackageNotes: <Input />,
    };

    console.log("updatedRow", updatedRow);
    return updatedRow;



   
  };

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
    },
    {
      title: "TL thực",
      dataIndex: "PackageRealWeight",
      key: "PackageRealWeight",
      editable: true,
    },
    {
      title: "Kích thước (cm)",
      dataIndex: "PackageSize",
      editable: true,

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
      title: "Thao tác",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return (
          <span>
            {dataSourcePackage.length >= 1 ? (
              editable ? (
                <>
                  <Typography.Link
                    onClick={() => save(record.key)}
                    style={{
                      marginRight: 8,
                      color: "var(--primary-color)",
                    }}
                  >
                    {/* <SaveOutlined /> */}
                    Lưu
                  </Typography.Link>
                  <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={cancel}
                    style={{
                      marginRight: 8,
                      color: "var(--primary-color)",
                    }}
                  >
                    {/* <CloseSquareOutlined /> */}
                    <Typography.Link>Hủy</Typography.Link>
                  </Popconfirm>
                </>
              ) : (
                <>
                  <Typography.Link
                    disabled={editingKey !== ""}
                    onClick={() => edit(record)}
                  >
                    <EditOutlined style={{ color: "var(--primary-color)" }} />
                  </Typography.Link>
                  <Popconfirm
                    title="Sure to delete?"
                    onConfirm={() => handleDelete(record.key)}
                  >
                    <DeleteOutlined
                      style={{
                        color: "var(--primary-color)",
                        marginLeft: 8,
                      }}
                    />
                  </Popconfirm>
                </>
              )
            ) : null}
          </span>
        );
      },
    },
  ];

  const mergedColumns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    if (col.children) {
      return {
        ...col,
        children: col.children.map((child) => ({
          ...child,
          onCell: (record) => ({
            record,
            inputType: child.dataIndex === "PackageSize" ? "text" : "number",
            dataIndex: child.dataIndex,
            title: child.title,
            editing: isEditing(record),
          }),
        })),
      };
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "PackageSize" ? "text" : "number",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

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
              PackageRealWeight: "",
              PackageLength: "",
              PackageWeight: "",
              PackageHeight: "",
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
          PackageRealWeight: "",
          PackageLength: "",
          PackageWeight: "",
          PackageHeight: "",
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
    values.serviceType = value;
    // Update the state with the new ServiceTypeID

    console.log("values-handleServiceChange", values);

    // Call the function and set the result to your formModal field
    const convertedWeight = calculateConvertedWeight({
      MailLength: mailLength,
      MailWidth: mailWidth,
      MailHeight: mailHeight,
      ServiceType: values.serviceTypeID,
    });
  };
  //   Get the value of serviceType in this function, to calculate the conversion weight <Select showSearch placeholder="" optionFilterProp="children">
  //   {serviceType.map((opt) => (
  //     <Option key={opt.value} value={opt.value}>
  //       {opt.value} - {opt.label}
  //     </Option>
  //   ))}
  // </Select>

  const [mailLength, setMailLength] = useState(0);
  const [mailWidth, setMailWidth] = useState(0);
  const [mailHeight, setMailHeight] = useState(0);
  
  // const [serviceTypeID, setServiceTypeID] = useState("");
  const handleApplyAll = () => {
    setDataSourcePackage((prevData) => {
      const newData = [...prevData];
      const serviceTypeID = form.getFieldValue("Service");

      for (let i = 0; i < packageQuantity; i++) {
        const item = newData[i];
        newData.splice(i, 1, {
          ...item,
          PackageRealWeight: parseFloat(actualWeight).toFixed(3),
          PackageLength: parseFloat(mailLength).toFixed(3),
          PackageWeight: parseFloat(mailWidth).toFixed(3),
          PackageHeight: parseFloat(mailHeight).toFixed(3),
          PackageTotalWight: calculateWeight(),

          PackageConvertedWeight: calculateConvertedWeight({
            MailLength: parseFloat(mailLength).toFixed(3),
            MailWidth: parseFloat(mailWidth).toFixed(3),
            MailHeight: parseFloat(mailHeight).toFixed(3),
            ServiceTypeID: serviceTypeID,
          }),
          PackageNotes: <Input />,
        });
      }

      console.log("convertedWeight");
      console.log("actualWeight", actualWeight);
      console.log("weight", weight);
      console.log("mailLength", mailLength);
      console.log("mailWidth", mailWidth);
      console.log("mailHeight", mailHeight);
      console.log("serviceTypeID", serviceTypeID);
      console.log("newData 22", newData );

      return newData;
    });
  };

  // Calculate the total converted weight by adding up all the converted weights in the table

  // const columns = defaultColumns.map((col) => {

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
    setSelectedType("");
    const serviceValue = form.getFieldValue("Service");
    if (!serviceValue) {
      // Show error modal
      Modal.error({
        title: "Error",
        content: "Hãy chọn dịch vụ trước khi chọn loại hình",
      });
      form.setFieldsValue({
        Type: "",
        Actual_weight: 0,
      Converted_weight: 0,
      Weight: 0,
      Package_Quantity: 0,
      

      });
      setDefaultTotalRealWeight("0.000");
      setDefaultTotalConvertedWeight("0.000");
      setDefaultTotalWeight("0.000");

      
    } else {
      setSelectedType(value);
      form.setFieldsValue({
        Actual_weight: 0,
        Converted_weight: 0,
        Weight: 0,
        Package_Quantity: 0,
        
        
      });
      setDataSourcePackage([]);
      formModal.resetFields();

      setDefaultTotalRealWeight("0.000");
      setDefaultTotalConvertedWeight("0.000");
      setDefaultTotalWeight("0.000");
    }
    
  };

  const resetFields = () => {
    setActualWeight(0);
    form.setFieldsValue({
      Actual_weight: 0,
      Weight: 0,
      Converted_weight: 0,
      // Package_Quantity: 0,
    });
  };
  const handleRealWeightChange = (value) => {
    setActualWeight(0);
    const serviceValue = form.getFieldValue("Service");
    const selectedType = form.getFieldValue("Type");
    if (!serviceValue) {
      // Show error modal
      Modal.error({
        title: "Error",
        content: "Hãy nhận dịch vụ trước khi nhập TL thực",
      });

      // Reset the weight
      resetFields();
      setDefaultTotalRealWeight("0.000");
      setDefaultTotalConvertedWeight("0.000");
      setDefaultTotalWeight("0.000");

    } 
     if (serviceValue && !selectedType) {
      Modal.error({
        title: "Error",
        content: "Hãy chọn loại hình trước khi nhập TL thực",
      });
      resetFields();
      setDefaultTotalRealWeight("0.000");
      setDefaultTotalConvertedWeight("0.000");
      setDefaultTotalWeight("0.000");
    }
    
     if (serviceValue && selectedType === "TL" && value > 2) {
      Modal.error({
        title: "Error",
        content: "Loại hình tài liệu chỉ được nhập TL thực nhỏ hơn 2kg",
      });
      resetFields();
      setDefaultTotalRealWeight("0.000");
      setDefaultTotalConvertedWeight("0.000");
      setDefaultTotalWeight("0.000");
      
    } 
    if (serviceValue && selectedType === "HH") {
      handleActualWeightChange(value);
    }
    if (dataSourcePackage.length === 0) {
      form.setFieldsValue({
        Converted_weight: 0,
        Actual_weight: value,
        Weight: value,

      });
    }
  };

  const handleWeightChangeTL = (value) => {
    if (dataSourcePackage.length === 0) {

     
      form.setFieldsValue({
        Converted_weight: 0,
       
        Actual_weight: value,
        Weight: value,
      });

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

  // console.log(form.getFieldValue("Service"))
  // console.log(form.getFieldValue("Type"))
  // console.log(form.getFieldValue("Weight"))
  // console.log(form.getFieldValue("DeclaredValue"))

  const shouldShowGiaCuocSection = () => {
    const serviceValue = form.getFieldValue("Service");
    const selectedType = form.getFieldValue("Type");
    const declaredValue = form.getFieldValue("DeclaredValue");
    return Boolean(serviceValue && selectedType && declaredValue);
  };
  // If the recipient's address, type, service, weight, and declared value are not empty, the new price will appear.

  return (
    <div className="form-create">
      <Modal
        title="Tạo kiện"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
      >
        <Form form={formModal}>
          <Row gutter={[24, 8]}>
            <Col span={8}>
              <Form.Item
                label="Số kiện"
                name="Package_Quantity_Modal"
                // dependencies={["Package_Quantity_Modal"]}
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
                  onChange={(e) => {
                    setPackageQuantity(e.target.value);
                  }}
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
              <Button type="primary" htmlType="submit" onClick={handleApplyAll}>
                Áp dụng cho tất cả các kiện
              </Button>
            </Col>
          </Row>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            rowClassName={() => "editable-row"}
            bordered
            dataSource={dataSourcePackage}
            columns={mergedColumns}
          />
          <Row gutter={[24, 8]}>
            <Col span={8}>
              <Form.Item label="Tổng TL thực (kg)" name="Total_real_weight">
                <Input
                  placeholder=""
                  min={0}
                  max={100}
                  disabled
                  value={calculateTotalRealWeight()}
                />
                &nbsp;
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Tổng TL (kg)" name="Total_weight">
                <Input
                  placeholder=""
                  min={0}
                  max={100}
                  disabled
                  value={calculateTotalWeight()}
                />
                &nbsp;
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Tổng TLQĐ (kg)" name="Total_converted_weight">
                <Input
                  placeholder=""
                  min={0}
                  max={100}
                  disabled
                  value={calculateTotalConvertedWeight()}
                />
                &nbsp;
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Typography.Title level={3}>TẠO ĐƠN HÀNG</Typography.Title>

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
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn mã khách hàng",
                    },
                  ]}
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
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Vui lòng chọn mã khách hàng",
                    //   },
                    // ]}
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
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập người gửi",
                    },
                  ]}
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
                      required: true,
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
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập họ tên người nhận",
                    },
                  ]}
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
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên công ty",
                    },
                  ]}
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
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ",
                    },
                  ]}
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
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn quốc gia",
                    },
                  ]}
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
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn tỉnh/thành",
                    },
                  ]}
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
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn quận/huyện",
                    },
                  ]}
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
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn phường/xã",
                    },
                  ]}
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
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ chi tiết",
                    },
                  ]}
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
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mã địa chỉ",
                    },
                  ]}
                >
                  <Input showSearch />
                </Form.Item>
              </Col>
              {/* Mã địa chỉ */}

              <Col className="gutter-row" span={12}>
                <Form.Item name="" className="min-width-100">
                  <Input showSearch />
                </Form.Item>
              </Col>
            </Row>
            {/* Vùng phát */}
            <Row gutter={[12, 8]}>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Vùng phát"
                  name="Broadcast_Area"
                  className="min-width-100"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn vùng phát",
                    },
                  ]}
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
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="BC phát"
                  name="Post_Office_Delivery"
                  className="min-width-100"
                  
                >
                  <Input value={broadcastInfo.postOfficeID} />
                  &nbsp;
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[12, 8]}>
              {/* Tuyến GN phát */}
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Tuyến GN phát"
                  name="Transmitter_Route"
                  className="min-width-100"
                 
                >
                  <Input value={broadcastInfo.shippingRouteID} />
                  &nbsp;
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
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn loại hình",
                    },
                  ]}
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
                    readOnly
                    disabled={selectedType === "TL" || selectedType === ""}
                  />
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
              </Col>
            </Row>

            <Row gutter={[12, 8]}>
              {/* TL thực */}
              <Col className="gutter-row" span={10}>
                <Form.Item
                  label="TL thực"
                  name="Actual_weight"
                  className="min-width-100"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập TL thực",
                    },
                  ]}
                 
                >
                  <InputNumber
                    min={0}
                    max={100}
                    step={0.001}
                    
                    // defaultValue={defaultTotalRealWeight}
                    // // value={calculateTotalRealWeight()}
                    // onChange={handleRealWeightChange}
                    // // value={actualWeight}

                    // value={defaultTotalRealWeight}
                    onChange={handleRealWeightChange}
                  />
                </Form.Item>
              </Col>

              {/* TLQĐ */}
              <Col className="gutter-row" span={8}>
                <Form.Item label="TLQĐ" name="Converted_weight" className="">
                  <InputNumber
                    type="dashed"
                    min={0}
                    max={100}
                    step={0.001}
                    disabled
                    // value={defaultTotalConvertedWeight}
                    onChange={handleConvertedWeightChange}
                  />
                 
                </Form.Item>
              </Col>

              {/* TL */}
              <Col className="gutter-row" span={6}>
                <Form.Item
                  label="TL"
                  name="Weight"
                  type="dashed"
                  className=""
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập TL",
                    },
                  ]}
                >
                  <InputNumber
                    style={{ color: "red" }}
                    min={0}
                    max={100}
                    // onChange={handleWeightChange} // Call the function on change
                    step={0.001}
                    // value={handleWeightChange}
                    // // defaultValue={weight}
                    // // value={calculateTotalWeight()}
                    // defaultValue={defaultTotalWeight}
                    // // value={calculateTotalWeight()}
                    // value={defaultTotalWeight}
                    // onChange={handleWeightChange}
                    onChange={updateWeight}
                    readOnly
                  />

                </Form.Item>
              </Col>
            </Row>

            <h4>Thông tin dịch vụ</h4>
            {/* ---------Thông tin dịch vụ----------- */}

            <Row gutter={[12, 8]}>
              {/* Dịch vụ */}
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Dịch vụ"
                  name="Service"
                  className="min-width-100"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn dịch vụ",
                    },
                  ]}
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
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Dịch vụ GTGT"
                  name=""
                  className="min-width-100"
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
              {/* Ghi chú đặc biệt */}
              <Col className="gutter-row" span={12}>
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
                    disabled={selectedType === "TL" || selectedType === ""}
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
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Giá trị khai"
                  className="min-width-100"
                  name="DeclaredValue"
                  rules={[
                    {
                      pattern: /^[0-9]+$/,
                      message: "Vui lòng chỉ nhập số.",
                      required: true,
                    },
                  ]}
                >
                  <Input showSearch />
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

            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                shouldShowGiaCuocSection(prevValues, currentValues)
              }
            >
              {() => (
                <>
                  {shouldShowGiaCuocSection() && (
                    <>
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
                          <Form.Item
                            label="VAT"
                            name="VAT"
                            className="min-width-100"
                          >
                            <Input
                              style={{ color: "red" }}
                              onChange={(e) =>
                                setSendingRepresentative(e.target.value)
                              }
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
                    </>
                  )}
                </>
              )}
            </Form.Item>
          </Col>
        </Row>

        {/* -------------Thông tin BP/BK----------- */}

        {/* -------------Thông tin người nhận----------- */}

        {/* -------------TButton----------- */}

        <Row>
          <Col span={12} offset={12}>
            <Form.Item label=" " colon={false} style={{ textAlign: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleFormFinish}
              >
                Tạo đơn
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

export default CreateOrder;
