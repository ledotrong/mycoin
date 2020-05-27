import React from 'react';
import { Modal, Button, Table, Tag } from 'antd';

const TxModal = (props) => {
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
  ];

  return (
    <Modal
      title="Basic Modal"
      visible={props.visible}
      onCancel={props.handleCancel}
      footer={[
        <Button key="back" onClick={props.handleCancel}>
          Cancel
        </Button>,
      ]}
    >
      <Table
        pagination={false}
        columns={columns}
        dataSource={props.transactions}
      ></Table>
    </Modal>
  );
};

export default TxModal;
