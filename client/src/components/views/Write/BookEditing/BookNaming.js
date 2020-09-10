import React, { useState, useEffect } from 'react';
import { Form, Input, Button,Select } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import './BookNaming.css'

const { Option } = Select;
const HorizontalLoginForm = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState(); // To disable submit button at the beginning.

  useEffect(() => {
    forceUpdate({});
  }, []);


  const handleSubmit = (values) => {
    var url = 'http://localhost:5000/api/create/naming';
    var data = values;

    fetch(url, {
      method: 'POST', 
      body: JSON.stringify(data), 
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
  }

  const onFinish = values => {
    console.log(values);
    handleSubmit(values)
  };
  return (
    <div className="naming_book_container">
      <div className="book_layout">
        <Form form={form} name="book_naming" layout="block" onFinish={onFinish}>
          <Form.Item
            className="category_select_naming"
            name={['category']}
            style={{width:"255px"}}
            rules={[{ required: true, message: '카테고리를 선택해 주세요' }]}
          >
            <Select placeholder="카테고리를 선택해 주세요">
              <Option value="미지정">미지정</Option>
              <Option value="한국사">한국사</Option>
            </Select>
          </Form.Item>
          <Form.Item
            className="naming_input"
            name="book_title"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input prefix={<BookOutlined className="site-form-item-icon" />} placeholder="책이름을 입력해 주세요" />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                className="naming_submit_button"
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  form.getFieldsError().filter(({ errors }) => errors.length).length
                }
              >
                시작
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default HorizontalLoginForm