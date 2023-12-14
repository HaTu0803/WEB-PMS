import React, {useEffect, useState} from "react";
import { Form, Typography, Table, Tag, Space } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";
function CustomerList() {

    const columns = [
        {
            title: 'Mã khách hàng',
            dataIndex: 'customerID',
            key: 'customerID',
            sorter: true,
            sorter: (a, b) => a.customerID - b.customerID,
            width: 150,
            fixed: 'left',
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'customerName',
            key: 'customerName',
            width: 300,


        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            width: 400,

        },
        {
            title: 'Quốc gia',
            dataIndex: 'nationID',
            key: 'nationID',
            width: 150,


        },
        {
            title: 'Tỉnh/Thành phố',
            dataIndex: 'provinceID',
            key: 'provinceID',
            width: 200,

        },
        {
            title: 'Quận/Huyện',
            dataIndex: 'districtID',
            key: 'districtID',
            width: 200,

        },

        {   
            title: 'Phường/Xã',
            dataIndex: 'wardID',
            key: 'wardID',
            width: 200,

        },
        {
            title: 'Số fax',
            dataIndex: 'faxNo',
            key: 'faxNo',
            width: 100,

        }
        ,
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 200,

        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: 150,

        },

        {
            title: 'Bưu cục',
            dataIndex: 'postOfficeID',
            key: 'postOfficeID',
            width: 150,


        },
        {
            title:'Nhân viên giao nhận',
            dataIndex:'deliveryStaffID',
            key:'deliveryStaffID',
            width: 200,


        },
        {
            title:'Loại phạm vi',
            dataIndex:'scopeType',
            key:'scopeType',
            width: 150,

        }
        ,
        {
            title:'Ngày tạo',
            dataIndex:'createdDate',
            key:'createdDate',
            width: 150,

        }
        ,
        {
            title:'Người tạo',
            dataIndex:'createdUser',
            key:'createdUser',
            width: 150,

        }
        ,
        {
            title:'Ngày cập nhật',
            dataIndex:'lastUpdatedDate',
            key:'lastUpdatedDate',
            width: 150,

        }
        ,
        {
            title:'Người cập nhật',
            dataIndex:'lastUpdatedUser',
            key:'lastUpdatedUser',
            width: 150,

        },
        {
            title:' Loại nội bộ',
            dataIndex:'internalType',
            key:'internalType',
            width: 150,

        },
        {
            title: 'Khách hàng giới thiệu',
            dataIndex: 'refCustomerID',
            key: 'refCustomerID',
            width: 150,

        },
        {
            title: 'Tình trạng',
            dataIndex: 'isActive',
            key: 'isActive',
            width: 150,

            

        }
        ,
        {
            title: 'Thao tác',
            dataIndex: 'action',
            key: 'action',
            width: 150,
            fixed: 'right',
            render: () => (
                <>
                    <EditOutlined
              onClick={() => onEdit()}
              style={{ cursor: "pointer", marginRight: 12 }}
            />
            {/* <span
              style={{ cursor: "pointer", marginRight: 8 }}
              onClick={() => onEdit(record)}
            >
              Edit
            </span> */}
            <DeleteOutlined
              onClick={() => onDelete()}
              style={{ cursor: "pointer", color: "red", marginLeft: 12 }}
            />
            {/* <span
              style={{ cursor: "pointer", color: "red" }}
              onClick={() => onDelete(record)}
            >
              Delete
            </span> */}
                </>
            ),
        },
        
    ];

    const onDelete = async () => {
        Modal.confirm({
          title: 'Bạn có chắc chắn muốn xóa đơn hàng này?' ,
          okText: "Xóa",
          okType: "danger",
          cancelText: "Hủy",
            
        });
        };
        const onEdit = async () => {
            Modal.confirm({
                title: 'Bạn có chắc chắn muốn sửa đơn hàng này?' ,
                okText: "Sửa",
                okType: "danger",
                cancelText: "Hủy",
            });

               
        };
          
      
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
        customerID: record.customerID,
      }),
    };

  
    const [customerInfo, setCustomerInfo] = useState([]);
    // Display the list of customers on the table by reading the api below
    // http://localhost:4000/postoffice/GetCustomer/ABH

    useEffect(() => {
        async function fetchData() {
            const token = Cookies.get("authToken");
            try {
                const response = await axios.post(
                    `http://localhost:4000/postoffice/GetCustomer/ABH`,
                    {
                        CustomerID: customerInfo.customerID,
                        CustomerName: customerInfo.customerName,
                        Address: customerInfo.address,
                        NationID: customerInfo.nationID,
                        ProvinceID: customerInfo.provinceID,
                        DistrictID: customerInfo.districtID,
                        WardID: customerInfo.wardID,
                        FaxNo: customerInfo.faxNo,
                        Email: customerInfo.email,
                        PhoneNumber: customerInfo.phoneNumber,
                        PostOfficeID: customerInfo.postOfficeID,
                        DeliveryStaffID: customerInfo.deliveryStaffID,
                        ScopeType: customerInfo.scopeType,
                        CreatedDate: customerInfo.createdDate,
                        CreatedUser: customerInfo.createdUser,
                        LastUpdatedDate: customerInfo.lastUpdatedDate,
                        LastUpdatedUser: customerInfo.lastUpdatedUser,
                        InternalType: customerInfo.internalType,
                        RefCustomerID: customerInfo.refCustomerID,
                        IsActive: customerInfo.isActive,
                        

                    
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(response.data);
                setCustomerInfo(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);
    return (
        <div className="Customer-Style">
      <Typography.Title level={3} style={{padding:"10px"}}>DANH SÁCH KHÁCH HÀNG</Typography.Title>

<div style={{width:'1100px'}}>


<Table 
        columns={columns} 
        dataSource={customerInfo}
        rowSelection={{
            type: selectionType,
            ...rowSelection,
            }}
            bordered

            scroll={{
                x: 400,
               
              }}
              className="table-style"
        pagination={{
            total: 100,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} items`,
          }}

        />
</div>

      
        </div>
    );
    }

export default CustomerList;