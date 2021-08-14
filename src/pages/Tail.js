import { Col, Row, Typography, List, Card, Tag, Divider } from "antd";

import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { getLastTickets } from "../helpers/getLastTickets";
import { useHideMenu } from "../hooks/useHideMenu";

const { Title, Text } = Typography;

export const Tail = () => {
  useHideMenu(true);

  const { socket } = useContext(SocketContext);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    socket.on("asigned-ticket", (asignedTickets) => {
      setTickets(asignedTickets);
    });

    return () => {
      socket.off("asigned-ticket");
    };
  }, [socket]);

  useEffect(() => {
    getLastTickets().then((tickets) => {
      setTickets(tickets);
    });
  }, []);

  return (
    <>
      <Title level={1}>Atendiendo al cliente: </Title>
      <Row>
        <Col span={12}>
          <List
            dataSource={tickets.slice(0, 3)}
            renderItem={(item) => (
              <List.Item>
                {" "}
                <Card
                  style={{ width: 300, marginTop: 16 }}
                  actions={[
                    <Tag color="volcano"> {item.agent} </Tag>,
                    <Tag color="magenta"> Escritorio {item.desk} </Tag>,
                  ]}
                >
                  <Title align="center">No. {item.number} </Title>
                </Card>{" "}
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <Divider>Historial</Divider>
          <List
            dataSource={tickets.slice(3)}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  align="center"
                  title={`Ticket No. ${item.number}`}
                  description={
                    <>
                      <Text type="secondary">En el escritorio </Text>
                      <Tag color="magenta">{item.desk} </Tag>
                      <Text type="secondary">Agente </Text>
                      <Tag color="volcano">{item.agent}</Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};
