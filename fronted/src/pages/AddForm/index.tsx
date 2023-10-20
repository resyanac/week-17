
import { Button, Card, Form, Input, Select, Space} from 'antd';
import {  useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios, { AxiosError } from 'axios';

const { Option } = Select;

interface FormProps {
  no?: string;
  is_active?: boolean;
}

const initialValues = {
  no: '',
  status:'',
};

const validationSchema = yup.object().shape({
  no: yup.string().required('Name is required'),
  is_active: yup.boolean().required('Status is required'),
});

const AddForm = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleSubmit = async (values: FormProps) => {
    try {
      await axios.post(
        'http://localhost:4000/v1/taxes/',
        {
          no: values.no,
          is_active: values.is_active,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ); 
      navigate('/table')
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as AxiosError as any;
      const errors = err.response?.data?.errors;
      if (Array.isArray(errors)) {
        return;
      }
    }
  };

    const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });


  return (
      <Card title="Add New Category">
      <Form name="control-ref" onFinish={handleSubmit} style={{ width: 200 }}>
        <Form.Item 
        name="no"
        validateStatus={
        formik.touched.no && formik.errors.no ? "error" : ""}
        help={formik.touched.no && formik.errors.no} >
          <Input name="License Plate"
            placeholder="License Plate"
            value={formik.values.no}
            />
        </Form.Item>
        <Form.Item name="status">
          <Select
            placeholder="Select Option"
            allowClear
          >
            <Option value="tertunggak">Tertunggak</Option>
            <Option value="tertagih">Tertagih</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              SUBMIT
            </Button>
            <Button onClick={() => navigate('/table')} htmlType="button">BACK</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddForm;
