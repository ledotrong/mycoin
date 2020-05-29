import React from 'react';
import { Modal, Button, Table, Tag } from 'antd';

const HistoryModal = (props) => {
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

  console.log(props.transactions);

  return (
    <Modal
      title="Transaction History"
      visible={props.visible}
      onCancel={props.handleCancel}
      footer={[
        <Button key="back" onClick={props.handleCancel}>
          Close
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

export default HistoryModal;
