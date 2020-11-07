import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { Menu, Layout } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { showFeature } from './FeatureFlag';
import FeatureFlagContext from './FeatureFlagContext';

const { SubMenu } = Menu;

function App() {
  const features = useContext(FeatureFlagContext);
  return (
    <Layout>
      <Layout.Sider style={{
        width: 256,
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}>
        <Menu
          style={{ width: 256, height: '100vh' }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
          {showFeature(features, "sidebar.navigation_one") &&
            <SubMenu
              key="sub1"
              title={
                <span>
                  <MailOutlined />
                  <span>Navigation One</span>
                </span>
              }
            >
              <Menu.ItemGroup key="g1" title="Item 1">
                <Menu.Item key="1">Option 1</Menu.Item>
                <Menu.Item key="2">Option 2</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup key="g2" title="Item 2">
                <Menu.Item key="3">Option 3</Menu.Item>
                <Menu.Item key="4">Option 4</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
          }
          {showFeature(features, "sidebar.navigation_two") &&
            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              {showFeature(features, "sidebar.navigation_two.sub_menu") &&
                <SubMenu key="sub3" title="Submenu">
                  <Menu.Item key="7">Option 7</Menu.Item>
                  <Menu.Item key="8">Option 8</Menu.Item>
                </SubMenu>
              }
            </SubMenu>
          }
          {showFeature(features, "sidebar.navigation_three") &&
            < SubMenu
              key="sub3"
              icon={<SettingOutlined />}
              title="Navigation Three"
            >
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          }
        </Menu>
      </Layout.Sider >
      <Layout.Content>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Demo feature toggles with Unleash service.</p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by Create React App
        </a>
          </header>
        </div>
      </Layout.Content>
    </Layout >

  );
}

export default App;
