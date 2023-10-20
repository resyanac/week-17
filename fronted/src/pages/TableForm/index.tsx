import React, { useEffect, useState } from "react";
import { Button, Table, Space, Card, Form, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import axios from "axios";



interface DataType {
  _id: string;
  name: string;
  status: boolean;
}

// interface ApiResponse {
//     data: DataType[],
//     current_page: number,
//     total_item: number,
//     total_page: number,
// }


const TableForm: React.FC = () => {

  const navigate = useNavigate();
  const [data, setData] = useState<DataType[]>([])

const apiUrl = "http://localhost:4000/v1/taxes";
	// const [data, setData] = useState<DataType[]>([]);
	console.log(data);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(apiUrl, {
					withCredentials: true,
				});
				// console.log(response.data);
				setData(response.data.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

// useEffect(() => {
//     fetchData();
//   }, []);

const columns: ColumnsType<DataType> = [
  {
    title: "Id",
    dataIndex: "_id",
    key: "_id",
    render: (text: string) => <a>{text || 'N/A'}</a>,
},
  {
    title: "No Plate",
    dataIndex: "no",
    key: "no",
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',

    // render: (status) => (
    //   <span>{status? 'Tertunggak' : 'Tertagih'}</span>
    // ),
    filters: [
      { text: 'Tertunggak', value: true },
      { text: 'Tertagih', value: true },
    ],
    onFilter: (value, record) => record.status=== value,
  },
  {
    title: "Action",
    key: "action",
    render: (_, dataId ) => (
      <Space>
        <Button onClick={() => navigate(`/edit-item/${dataId._id}`)}>EDIT</Button>
        <Button onClick={() => 
          deleteItem(dataId._id)} type="primary" >DELETE</Button>
      </Space>
    ),
  },
];

const deleteItem = async (deleted: string) => {
		const apiUrl = `http://localhost:4000/v1/taxes/${deleted}`;
		try {
			await axios.delete(apiUrl, {
				withCredentials: true,
			}); 
      message.config({
				top: 100,
			});
			message.success("Tax Delete Success!");
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

const handleLogout = async () => {
	try {
		await axios.post(
			"http://localhost:4000/v1/logout",
			{},
			{
				withCredentials: true,
			}
		);
		Swal.fire({
			icon: 'success',
			title: 'Logged out successfully!',
			showConfirmButton: false,
			timer: 1500
		});
		navigate("/");
	} catch (error) {
		console.error(error);
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Failed to logout. Please try again.',
		});
	}
};


  return (
    <Card title="Tax Report" style={{ padding: "20px" }}>
      <Form.Item>
        <Button
          type="primary"
          className="login-link"
          onClick={() => navigate('/add-item')}
          style={{ marginRight: "550px" }}
        >
          Add New Category
        </Button>
         {/* <Button type="primary" className="login-link" style={{ marginRight: "2px" }} onClick={() => navigate('/profile')}
          >Profile</Button> */}
        <Button  className="login-link" onClick={(handleLogout)}>
          Logout
        </Button>
      </Form.Item>
      
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 5,
            total: data.length,
          }}
          style={{ width: "800px"}}
        />
      
    </Card>
  );
};

export default TableForm;
