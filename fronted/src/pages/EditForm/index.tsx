import React from 'react';
import { Button, Form, Card, Space, Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';


const { Option } = Select;

interface EditPage {
  status: string
}

// const initialValues = {
//   status: ''
// };

const EditForm: React.FC = () => {

const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const handleSubmit = async (values: EditPage) => {
    console.log(values);

    try {
			const body = {
				id,
				...values,
			};
			const response = await axios.put(
				`http://localhost:4000/v1/taxes/${id}`,
				body,
				{
					withCredentials: true,
				}
			);
			Swal.fire({
				icon: "success",
				title: "Edit Category Success",
				text: "Edit Category Success",
			});
			navigate("/table");
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
    }
  }
  // const formik = useFormik({
  //   initialValues: initialValues,
  //   onSubmit: handleSubmit
  // });
  return (
    <Card title="Edit Category" style={{
      maxWidth: "400px",
      width: "100%",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"}}>
      <Form
        name="edit-item-form"
        onFinish={handleSubmit}
        style={{ maxWidth: 600 }}
      >
        
         <Form.Item name="status" rules={[{ required: true }]}>
          <Select
            placeholder="Select a status option"
            allowClear
          >
            <Option value="Tertunggak">Tertunggak</Option>
            <Option value="Tertagih">Tertagih</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">Submit</Button>
            <Button htmlType="button" onClick={() => { navigate('/table') }}>Back</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};


export default EditForm;