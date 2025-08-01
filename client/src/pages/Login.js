import React from 'react'
import { Row, Col, Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogin } from '../redux/actions/userActions';


function Login() {

    const dispatch = useDispatch();
    function login(values){
        console.log(values);
        dispatch(userLogin(values));
    }

  return (
    <div>
        <Row justify="center"  className='register-div' >
            <Col lg={5} sm={24} xs={24}>
            <Form layout="vertical" className='bs1 p-4' onFinish={login}>
                <h1 className='text-center'>Login</h1>
                <hr />
                <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input />
                </Form.Item>

                <div className='text-left'>
                <Button type='primary' htmlType="submit">Login</Button>
                </div>

                <Link to="/register">Don't have an account? Register</Link>

            </Form>
            </Col>
        </Row>
    </div>
  )
}

export default Login