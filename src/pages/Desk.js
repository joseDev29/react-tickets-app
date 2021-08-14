import { CloseCircleOutlined, RightOutlined } from "@ant-design/icons";
import { Row, Col, Typography, Button, Divider } from "antd";
import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { getUserStorage } from "../helpers/getUserStorage";
import { useHideMenu } from "../hooks/useHideMenu";

const { Title, Text } = Typography;

export const Desk = () => {
  useHideMenu(false);

  //useHistory no puede usarse debajo o despues de un Redirect
  const history = useHistory();

  const [user] = useState(getUserStorage());
  const [ticket, setTicket] = useState(null);

  const { socket } = useContext(SocketContext);

  if (!user.agent || !user.desk) return <Redirect to="/login" />;

  const logout = () => {
    localStorage.removeItem("agent");
    localStorage.removeItem("desk");

    //reemplaza la entrada actual en el historial
    //lo que impide que se pueda volver a la pagina anterior
    history.replace("/login");
  };

  const nextTicket = () => {
    socket.emit("next-ticket-work", user, (ticket) => {
      setTicket(ticket);
    });
  };

  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}> {user.agent} </Title>
          <Text>Usted esta trabajando en el escritorio: </Text>
          <Text type="success" style={{ fontSize: 20 }}>
            {user.desk}
          </Text>
        </Col>
        <Col span={4} align="right">
          <Button type="danger" onClick={logout}>
            <CloseCircleOutlined />
            Salir
          </Button>
        </Col>
      </Row>

      <Divider />

      {ticket ? (
        <Row>
          <Col>
            <Text>Esta atendiendo el ticket numero: </Text>
            <Text type="danger" style={{ fontSize: 30 }}>
              {ticket.number}
            </Text>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <Text>No tiene ningun ticket asignado</Text>
          </Col>
        </Row>
      )}

      <Row>
        <Col span={24} align="right">
          <Button onClick={nextTicket} type="primary">
            <RightOutlined />
            Siguiente
          </Button>
        </Col>
      </Row>
    </>
  );
};
