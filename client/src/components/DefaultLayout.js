import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, LogoutOutlined, AppstoreAddOutlined, HomeOutlined} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
import './defaultlayout.css';


const { Header, Sider, Content } = Layout;
const DefaultLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, position: 'relative', zIndex: 1 }}>
          <div className='d-flex justify-content-between align-items-center bs1' >
              <h4>{JSON.parse(localStorage.getItem('user')).username}</h4>
              <h2>Flogram</h2>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '25px',
              width: 64,
              height: 64,
              
            }}
          />
          </div>
        </Header>
        <Content
          style={{
            minHeight: '93vh',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
        {props.children}
        </Content>
      </Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical text-left" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
          items={[
            {
              key: '/',
              icon: <HomeOutlined />,
              label: <Link to="/">Home</Link>,
            },
            {
              key: '/profile',
              icon: <UserOutlined />,
              label: <Link to="/profile">Profile</Link>,
            },
            {
              key: '/addpost',
              icon: <AppstoreAddOutlined />,
            label: <Link to="/addpost">Add Post</Link>,
            },
            {
              icon: <LogoutOutlined />,
            label: <Link onClick={() => {localStorage.removeItem('user'); window.location.href = '/login'}}>Logout</Link>,
            },
          ]}
        />
      </Sider>
    </Layout>
  );
};
export default DefaultLayout;