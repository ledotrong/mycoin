import React from 'react';
import { Card, Tag, Row, Typography, Table } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Block = (props) => {
  const columns = [
    {
      title: 'From',
      dataIndex: 'sender',
      key: 'sender',
      render: (sender) => (
        <div>
          {sender
            ? props.wallets.map((item) => {
                if (item.publicKey === sender) return item.name;
                return null;
              })
            : 'SYSTEM'}
        </div>
      ),
    },
    {
      title: 'To',
      dataIndex: 'recipient',
      key: 'recipient',
      render: (recipient) => (
        <div>
          {props.wallets.map((item) => {
            if (item.publicKey === recipient) return item.name;
            return null;
          })}
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <div>{amount}</div>,
    },
    {
      title: 'Is Valid?',
      dataIndex: 'isValidTx',
      key: 'isValidTx',
      render: (isValidTx) => (
        <div>
          <Tag color={isValidTx ? 'green' : 'red'}>
            {isValidTx ? 'true' : 'false'}
          </Tag>
        </div>
      ),
    },
  ];

  let transactions = props.data.transactions;
  if (props.index > 0)
    transactions.forEach((item, index) => {
      item.isValidTx = item.isValid();
      item.key = index;
    });

  return (
    <div>
      {props.index > 0 ? (
        <Row justify="center">
          <DownOutlined
            style={{ fontSize: 25, paddingTop: 25, paddingBottom: 25 }}
          />
        </Row>
      ) : null}
      <Row justify="center">
        <Card className="block-card">
          <div className="is-flex justify-space-between">
            <Title level={3} style={{ textTransform: 'uppercase' }}>
              {props.index === 0 ? 'GENESIS BLOCK' : 'BLOCK #' + props.index}
            </Title>
            <div>
              <span style={{ marginRight: 20 }}>
                {new Date(props.data.timestamp).toUTCString()}
              </span>
              <Tag>{props.data.nonce}</Tag>
            </div>
          </div>
          <Row justify="end" style={{ marginBottom: 10 }}>
            {props.data.previousHash ? (
              <div>
                <span>PREVIOUS HASH: </span>
                <Tag color="cyan">{props.data.previousHash}</Tag>
              </div>
            ) : null}
            <div>
              <span>HASH: </span>
              <Tag color="geekblue">{props.data.hash}</Tag>
            </div>
          </Row>
          {props.index > 0 ? (
            <Table
              pagination={false}
              columns={columns}
              dataSource={props.data.transactions}
            ></Table>
          ) : null}
        </Card>
      </Row>
    </div>
  );
};

export default Block;
