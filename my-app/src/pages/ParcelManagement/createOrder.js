import React, { useState } from 'react';
import { Typography } from "antd";
import { Col, Row, Button, Form, Input, Select } from 'antd';
import dayjs from 'dayjs';
import { DatePicker, Space } from 'antd';
import { useEffect } from 'react';
import { getTodosAPI } from '../../api/todos';
// import Theme from '../../themes/theme';
const { RangePicker } = DatePicker;
const { Option } = Select;

function CreateOrder() {
  const options = [
    {
      value: 'ABH-KH20-0005',
      label: '	BÙI THỊ HIỀN - CH MOBIFONE BÌNH ĐA',
    },
    {
      value: 'XPG-KH23-0019',
      label: 'CÔNG TY CỔ PHÂN NHỰA ĐỒNG NAI',
    },
    {
      value: 'YYN-KH22-0009',
      label: 'KHÁCH LẺ YYN-TUYẾN THU PHÁT 001',
    },
    {
      value: 'CTO-KH14-0030',
      label: 'ĐMS3_NDI_YYE - Yên Tiến',
    },
    {
      value: 'NOH-KH23-0075',
      label: 'BTB_NAN - Kho CN ĐMX Yên Thành',
    },
    {
      value: 'PTT-KH22-0007',
      label: 'SHOP ONLINE LIÊN RUBY',
    },
  ];

  const country = [
    {
      value: 'Việt Nam',
      label: 'Việt Nam',
    },
  ]

  const city = [
    {
      value: 'HCM',
      label: 'Hồ Chí Minh',
    },
  ]

  const district = [
    {
      value: 'Quan 5',
      label: 'Quận 5',
    },
  ]

  const ward = [
    {
      value: 'Quan 5',
      label: 'Quận 5',
    }
  ]

  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  

  useEffect(() => {
    fetchData();
  }, []);


const fetchData = async () => {
  const data = getTodosAPI();
  console.log(data);
}
  return (
    <div>
      <Typography.Title style={{ fontWeight: 'bold', fontSize: 'medium', }}>TẠO ĐƠN HÀNG</Typography.Title>
      <Typography.Title style={{ fontSize: 'smaller', color: 'red' }}>Thông tin người gửi</Typography.Title>
      <Row>
        <Col span={6} order={1}>
          <Form.Item label="Mã khách hàng" name="customerId">
            <Select
              showSearch
              placeholder=""
              optionFilterProp="children"
              filterOption={(input, option) => {
                const value = option.value || '';
                return value.toLowerCase().includes(input.toLowerCase());
              }}
            >
              {options.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.value}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6} order={2}>
          <Form.Item label="Số điện thoại" name="Phone_Number">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
        <Col span={6} order={3}>
          <Form.Item label="Người gửi" name="Sender">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
        <Col span={6} order={4}>
          <Form.Item label="Mã VĐ KH" name="Customer's_bill_code">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col flex={7}>
          <Form.Item label="Tên công ty" name="Company_name">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
        <Col flex={1}>
          <Form.Item label="Đại diện gửi" name="Sending_representative">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label="Địa chỉ KH" name="Address">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
      </Row>
      <Typography.Title style={{ fontSize: 'smaller', color: 'red' }}>Thông tin người nhận</Typography.Title>
      <Row>
        <Col flex={2}>
          <Form.Item label="Số điện thoại" name="Company_name">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
        <Col flex={2}>
          <Form.Item label="Họ tên" name="Sending_representative">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
        <Col flex={4}>
          <Form.Item label="Công ty nhận" name="Sending_representative">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label="Địa chỉ NN" name="Address">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={6} order={1}>
          <Form.Item label="Quốc gia" name="customerId">
            <Select
              showSearch
              placeholder=""
              optionFilterProp="children"
              filterOption={(input, option) => {
                const value = option.value || '';
                return value.toLowerCase().includes(input.toLowerCase());
              }}
            >
              {country.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.value}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6} order={2}>
          <Form.Item label="Tỉnh/thành" name="customerId">
            <Select
              showSearch
              placeholder=""
              optionFilterProp="children"
              filterOption={(input, option) => {
                const value = option.value || '';
                return value.toLowerCase().includes(input.toLowerCase());
              }}
            >
              {city.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.value}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6} order={3}>
          <Form.Item label="Quận/huyện" name="customerId">
            <Select
              showSearch
              placeholder=""
              optionFilterProp="children"
              filterOption={(input, option) => {
                const value = option.value || '';
                return value.toLowerCase().includes(input.toLowerCase());
              }}
            >
              {district.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.value}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6} order={4}>
          <Form.Item label="Phường/xã" name="customerId">
            <Select
              showSearch
              placeholder=""
              optionFilterProp="children"
              filterOption={(input, option) => {
                const value = option.value || '';
                return value.toLowerCase().includes(input.toLowerCase());
              }}
            >
              {ward.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.value}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col flex={4}>
          <Form.Item label="Địa chỉ chi tiết" name="Company_name">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
        <Col flex={2}>
          <Form.Item label="Mã địa chỉ" name="Sending_representative">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
        <Col flex={2}>
          <Form.Item name="Sending_representative">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={4} order={1}>
          <Form.Item label="BC phát" name="Sending_representative">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
        <Col span={4} order={2}>
          <Form.Item label="Tuyến GN phát" name="Sending_representative">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
        <Col span={4} order={3}>
          <Form.Item label="Vùng phát" name="Sending_representative">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
      </Row>
      <Typography.Title style={{ fontSize: 'smaller', color: 'red' }}>Thông tin BP/BK</Typography.Title>
      <Row>
        <Col flex={2}>
          <Form.Item label="Loại hình" name="customerId">
            <Select
              showSearch
              placeholder=""
              optionFilterProp="children"
              filterOption={(input, option) => {
                const value = option.value || '';
                return value.toLowerCase().includes(input.toLowerCase());
              }}
            >
              {options.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.value}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col flex={2}>
          <Form.Item label="TL thực" name="Phone_Number">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
        <Col flex={2}>
          <Form.Item label="TLQĐ" name="Sender">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
        <Col flex={2}>
          <Form.Item label="TL" name="Customer's_bill_code">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
        <Col flex={2}>
          <Form.Item label="Số kiện" name="Customer's_bill_code">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
      </Row>
      <Typography.Title style={{ fontSize: 'smaller', color: 'red' }}>Thông tin dịch vụ</Typography.Title>
      <Row>
        <Col flex={2}>
          <Form.Item label="Dịch vụ" name="customerId">
            <Select
              showSearch
              placeholder=""
              optionFilterProp="children"
              filterOption={(input, option) => {
                const value = option.value || '';
                return value.toLowerCase().includes(input.toLowerCase());
              }}
            >
              {options.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.value}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col flex={2}>
          <Form.Item label="Dịch vụ GTGT" name="customerId">
            <Select
              showSearch
              placeholder=""
              optionFilterProp="children"
              filterOption={(input, option) => {
                const value = option.value || '';
                return value.toLowerCase().includes(input.toLowerCase());
              }}
            >
              {options.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.value}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col flex={2}>
          <Form.Item label="Giá trị khai" name="Sender">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col flex={3}>
          <Form.Item label="Nội dung" name="Sender">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
        <Col flex={1}>
          <Form.Item label="Ghi chú đặc biệt" name="Sender">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
      </Row>
      <div style={{ margin: '50px' }}></div>
      <span style={{ display: 'block', width: '100%', borderBottom: '1px solid black' }}></span>
      <Typography.Title style={{ fontSize: 'smaller', color: 'red' }}>Giá cước</Typography.Title>
      <Row>
        <Col span={4} order={1}>
          <Form.Item label="DVGT/COD" name="Sending_representative">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
        <Col span={4} order={2}>
          <Form.Item label="Thu #" name="Sending_representative">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
        <Col span={4} order={3}>
          <Form.Item label="Ghi chú #" name="Sending_representative">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={6} order={1}>
        <Form.Item label="Giá cước" name="Phone_Number">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
        <Col span={6} order={2}>
          <Form.Item label="Giá đã CK" name="Phone_Number">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
        <Col span={6} order={3}>
          <Form.Item label="PP xăng dầu" name="Sender">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
        <Col span={6} order={4}>
          <Form.Item label="PPNT" name="Customer's_bill_code">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={4} order={1}>
          <Form.Item label="Chiết khấu" name="Sending_representative">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
        <Col span={4} order={2}>
          <Form.Item label="VAT" name="Sending_representative">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
        <Col span={4} order={3}>
          <Form.Item label="Mã bảng giá" name="Sending_representative">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={4} order={1}>
          <Form.Item label="Cước CH-CT" name="Sending_representative">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
        <Col span={4} order={2}>
          <Form.Item label="Thành tiền" name="Sending_representative">
            <Input
              showSearch
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}

export default CreateOrder;