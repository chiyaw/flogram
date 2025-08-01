import React from 'react'
import { Row, Col, Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userRegister } from '../redux/actions/userActions';

function Register() {
    const dispatch = useDispatch();
    function register(values){
        console.log(values);
        delete values.cpassword;
        dispatch(userRegister(values));
    }


  return (
    <div>
        <Row justify="center"  className='register-div' >
            <Col lg={5} sm={24} xs={24}>
            <Form layout="vertical" className='bs1 p-4' onFinish={register}>
                <h1 className='text-center'>Register</h1>
                <hr />
                <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Confirm Password" name="cpassword" rules={[{ required: true, message: 'Please input your confirm password!' }]}>
                    <Input />
                </Form.Item>

                <div className='text-left'>
                <Button type='primary' htmlType="submit">Register</Button>
                </div>

                <Link to="/login">Already have an account? Login</Link>

            </Form>
            </Col>
        </Row>
    </div>
  )
}

export default Register