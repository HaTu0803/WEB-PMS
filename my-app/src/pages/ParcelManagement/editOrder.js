import React, { useState } from "react";
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
} from "antd";
import dayjs from "dayjs";
import { DatePicker, Space } from "antd";
import { useEffect } from "react";
import { getTodosAPI } from "../../api/todos";
import "./editOrder.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';



// import Theme from '../../themes/theme';
const { RangePicker } = DatePicker;
const { Option } = Select;

function EditOrder() {
  const [form] = Form.useForm();
  const handleFormFinish = async () => {
    try {
      const values = await form.validateFields();
      console.log('Form values:', values);

      const token = Cookies.get("authToken");
      const response = await axios.post(
        'http://localhost:4000/mail/update/${values.MailID}',
        {
          MailStatus: "",
          CustomerID: values.customerId,
          CustomerName: customerInfo.label,
          CustomerPhoneNumber: customerInfo.phoneNumber,
          CustomerPackageID: "",
          CustomerCompanyName: "",
          CustomerRepresent: "",
          CustomerAddress: customerInfo.address,
          ReceiverPhoneNumber: values.Phone_Number_2,
          RecieverName: values.Receiver_Name,
          ReceiverCompanyName: values.Receiver_Company,
          ReceiverAddress: values.Address_2,
          ReceiverDetailedAddress:values.Address_3,
          ReceiverPostcodeQT: "",
          ReceiverNationID: values.Nation,
          ReceiverProvinceID: values.City,
          ReceiverDistrictID: values.District,
          ReceiverWardID: values.Ward,
          ReceiverAddressID: values.Address_3,
          ReceiverPostOfficeID: values.Post_Office_Delivery,
          ReceiverShippingRouteID: values.Transmitter_Route,
          ReceiverZoneID: values.Broadcast_Area,
          MailType: values.Type,
          PackageListID: "",
          MailRealWeight: values.Actual_weight,
          MailTotalWeight: values.Weight,
          MailConvertedWeight: values.Conversion_weight,
          MailLength: 0,
          MailWidth: 0,
          MailHeight: 0,
          PackageAmount: values.Package_Quantity,
          PackageNotes: "",
          ServiceTypeID: values.Service,
          ServiceTypeName: values.Service,
          ServiceTypeNotes: values.Notes,
          ServiceTypeSpecialNote: values.Service_Type_Notes,
          DeclaredValue: parseFloat(values.DeclaredValue) || 0,
          BasicFee: values.Rates,
          VATFee: values.VAT,
          TotalFee: values.Total,
          PostOfficeCreatedID: "",
          PostOfficeCreatedName:"",
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
      console.error('Form validation failed:', errorInfo);
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

  // const handleFormFinish = (values) => {
  //   if ((values.Type === "TL" || values.Type === "HH") && values.Service) {
  //     notification.warning({
  //       message: "Thông báo",
  //       description: "Vui lòng chọn dịch vụ",
  //     });
  //   }
  // };
  const roundToThreeDecimals = (value) => Math.round(value * 1000) / 1000;

  const onRoundToThreeDecimals = (value) => {
    console.log("changed", value);
  };
 
  const [declaredValue, setDeclaredValue] = useState('');
  const [rates, setRates] = useState(50000);
  const [sender, setSender] = useState(10000);
  const [sendingRepresentative, setSendingRepresentative] = useState(4000);
  const [total, setTotal] = useState(0);

  const calculateTotal = () => {
    const declared = Number(declaredValue) || 0;
    const totalValue = declared + rates + sender + sendingRepresentative;
    setTotal(totalValue);
  };

  useEffect(() => {
    calculateTotal();
  }, [declaredValue, rates, sender, sendingRepresentative]
   
  );
 
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
  const [conversionWeight, setConversionWeight] = useState(1);
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
  const navigate = useNavigate();
  // const handleFinish = () => {
  //   // Your form handling logic here

  //   // After saving the form, you can navigate back
  //   goBack();
  // };
  const goBack = () => {
    navigate({ delta: -1, replace: true });
  };
  // const handleFormFinish = () => {
  //   // Your form handling logic here
  // };

  return (
    <div className="Frome_create">
      <Typography.Title style={{ fontWeight: "bold", fontSize: "medium" }}>
        CHỈNH SỬA ĐƠN HÀNG
      </Typography.Title>
      <Typography.Title style={{ fontSize: "smaller", color: "red" }}>
        Thông tin người gửi
      </Typography.Title>

      <Form form={form}>
      <Row gutter={24}>
        <Col span={6} flex={6}>
          <Form.Item label="Mã khách hàng" name="customerId">
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
            </Select>
          </Form.Item>
        </Col>
        <Col span={6} order={2}>
          <Form.Item label="Số điện thoại" name="Phone_Number_1">
            <Input value={customerInfo.phoneNumber} />&nbsp;
          </Form.Item>
        </Col>
        <Col span={6} order={3}>
          <Form.Item label="Người gửi" name="Sender">
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
          <Form.Item label="Tên công ty" name="Company_name">
            <Input
              placeholder=""
              optionFilterProp="children"
              filterOption={(input, option) => {
                const value = option.value || "";
                return value.toLowerCase().includes(input.toLowerCase());
              }}
              value={customerInfo.label}
            />&nbsp;
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
          <Form.Item label="Địa chỉ KH" name="Address_1">
            <Input value={customerInfo.address} />&nbsp;
          </Form.Item>
        </Col>
      </Row>
      {/* </Form> */}

      <Typography.Title style={{ fontSize: "smaller", color: "red" }}>
        Thông tin người nhận
      </Typography.Title>
      <Row gutter={24}>
        <Col flex={2}>
          <Form.Item label="Số điện thoại" name="Phone_Number_2">
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
          <Form.Item label="Địa chỉ NN" name="Address_2">
            <Input showSearch />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={6} order={1}>
          <Form.Item label="Quốc gia" name="Nation">
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
          <Form.Item label="Địa chỉ chi tiết" name="Address_3">
            <Input />
          </Form.Item>
        </Col>
        <Col flex={2}>
          <Form.Item label="Mã địa chỉ" name="">
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
          <Form.Item label="BC phát" name="Post_Office_Delivery">
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
            <Input  />
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
            <Button type="primary">Tạo kiện</Button>
          </Form.Item>
        </Col>
      </Row>
      {/* ---------Thông tin dịch vụ----------- */}
      <Typography.Title style={{ fontSize: "smaller", color: "red" }}>
        Thông tin dịch vụ
      </Typography.Title>
      <Row gutter={24}>
        <Col flex={2}>
          <Form.Item
            label="Dịch vụ"
            name="Service"
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
        <Col flex={2}>
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
        <Col flex={2}>
          <Form.Item label="Giá trị khai" name="DeclaredValue">
            <Input showSearch 

            onChange={(e) => setDeclaredValue(e.target.value)}
            
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col flex={3}>
          <Form.Item label="Nội dung" name="Notes">
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
          <Form.Item label="DVGT/COD" name="Sending_representative">
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
          <Form.Item label="Giá cước" name="Rates">
            <Input 
            onChange={(e) => setRates(e.target.value)}
            value={rates}
            style={{ color: "red" }} readOnly/> 
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
            <Input style={{ color: "red" }}
            onChange={(e) => setSender(e.target.value)}
            value={sender} readOnly
            />
            &nbsp;
          </Form.Item>
        </Col>
        {/* <Col span={1} order={4}>
          <Form.Item name="Sender">
            <Input defaultValue={10}/>
          </Form.Item>
        </Col> */}
        <Col span={5} order={5}>
          <Form.Item label="PPNT" name="PPNT">
            <Input showSearch />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={6} order={1}>
          <Form.Item label="Chiết khấu" name="">
            <Input showSearch />
          </Form.Item>
        </Col>
        <Col span={6} order={2}>
          <Form.Item label="VAT" name="VAT">
            <Input 
            style={{ color: "red" }} 
            onChange={(e) => setSendingRepresentative(e.target.value)}
            value={sendingRepresentative} readOnly
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
          <Form.Item label="Cước CH-CT" name="">
            <Input showSearch />
          </Form.Item>
        </Col>
        <Col span={6} order={2}>
          <Form.Item label="Thành tiền" name="Tolal"  >
            <Input 
            style={{ color: "red" }}
            value={total} readOnly />
            &nbsp;
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit" onClick={handleFormFinish}>
          Lưu đơn hàng
        </Button>
        <Button style={{ marginLeft: 24 }} onClick={goBack}>
          Trở về
        </Button>
      </Form.Item>
      </Form>
    </div>
  );
}

export default EditOrder;
