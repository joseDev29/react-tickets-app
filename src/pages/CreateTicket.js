import { DownloadOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import React, { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";

import { useHideMenu } from "../hooks/useHideMenu";

const { Title, Text } = Typography;

export const CreateTicket = () => {
  useHideMenu(true);

  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState(null);

  const newTicket = () => {
    //El tercer argumento es un callback, el cual el backend
    //puede decidir en que momento ejecutarlo
    socket.emit("create-ticket", null, (ticket) => {
      setTicket(ticket);
    });
  };

  return (
    <>
      <Row>
        <Col span={14} offset={6} align="center">
          <Title level={3}>Presione el boton para crear un nuevo ticket</Title>

          <Button
            type="primary"
            icon={<DownloadOutlined />}
            size="large"
            onClick={newTicket}
          >
            Nuevo ticket
          </Button>
        </Col>
      </Row>

      {ticket && (
        <Row style={{ marginTop: 100 }}>
          <Col span={14} offset={6} align="center">
            <Title level={3}>Su numero: </Title>
            <br />
            <Text type="success" style={{ fontSize: 55 }}>
              {ticket.number}
            </Text>
          </Col>
        </Row>
      )}
    </>
  );
};
