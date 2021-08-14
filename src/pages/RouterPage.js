import React, { useContext } from "react";

import { Layout, Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import { Login } from "./Login";
import { Tail } from "./Tail";
import { CreateTicket } from "./CreateTicket";
import { Desk } from "./Desk";
import { UIContext } from "../context/UIContext";

const { Header, Sider, Content } = Layout;

export const RouterPage = () => {
  const { menuHidden } = useContext(UIContext);

  return (
    <BrowserRouter>
      <Layout style={{ height: "max-content" }}>
        <Sider collapsedWidth="0" breakpoint="md" hidden={menuHidden}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/login">Ingresar</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <Link to="/tail">Cola</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              <Link to="/create-ticket">Crear Ticket</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/tail" component={Tail} />
              <Route path="/create-ticket" component={CreateTicket} />
              <Route path="/desk" component={Desk} />
              {/*En caos de no encontrar ninguna ruta, redirige a la ruta indicada*/}
              <Redirect to="/login" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};
