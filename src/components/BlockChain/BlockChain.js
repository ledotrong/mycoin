import React, { useState } from 'react';
import Block from '../Block/Block';
import { BlockChain, Transaction } from 'blockchain/src/blockchain/BlockChain';
import EC from 'elliptic';
import {
  Row,
  Button,
  Divider,
  Card,
  Typography,
  Select,
  Radio,
  message,
  Input,
  Badge,
  Tag,
} from 'antd';
import TxModal from '../Transactions/TxModal';

const { Title } = Typography;
const { Option } = Select;
const getInitialWalletKey = () => {
  const ec = new EC.ec('secp256k1');
  const key = ec.genKeyPair();

  return {
    name: `account 1`,
    keyObj: key,
    publicKey: key.getPublic('hex'),
    privateKey: key.getPrivate('hex'),
  };
};

const BlockChainView = () => {
  const [blockChainInstance] = useState(new BlockChain());
  const [blockChain, setBlocks] = useState(blockChainInstance.blockChain);
  const [walletKeys, setWalletKeys] = useState([getInitialWalletKey()]);
  const [accountCount, setAccount] = useState(2);
  const [selectedWallet, setWallet] = useState(0);
  const [recipientAddress, setRecipient] = useState('');
  const [txAmount, setTxAmount] = useState(10);
  const [modalVisible, setModalVisible] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  const generateWalletKeys = () => {
    const ec = new EC.ec('secp256k1');
    const key = ec.genKeyPair();

    setWalletKeys([
      ...walletKeys,
      {
        name: `account ${accountCount}`,
        keyObj: key,
        publicKey: key.getPublic('hex'),
        privateKey: key.getPrivate('hex'),
      },
    ]);
    setAccount(accountCount + 1);
  };

  blockChainInstance.difficulty = 2;

  const mineTransactions = () => {
    blockChainInstance.minePendingTransactions(
      walletKeys[selectedWallet].publicKey
    );
    setBlocks([...blockChainInstance.blockChain]);
    setPendingCount(0);
  };

  const changeRecipient = (value) => {
    setRecipient(value);
  };

  const changeWallet = (e) => {
    console.log('Change Wallet');
    setWallet(e.target.value);
    setRecipient(null);
  };

  const sendTransaction = () => {
    if (recipientAddress) {
      const newTx = new Transaction();
      newTx.sender = walletKeys[selectedWallet].publicKey;
      newTx.recipient = recipientAddress;
      newTx.amount = txAmount;
      newTx.signTransaction(walletKeys[selectedWallet].keyObj);
      try {
        blockChainInstance.addTransaction(newTx);
        message.success('Coins has been sent');
        setPendingCount(pendingCount + 1);
      } catch (err) {
        message.error(err.message);
      }
    }
  };

  const changeAmount = (e) => {
    setTxAmount(parseInt(e.target.value));
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ paddingLeft: 100, paddingRight: 100 }}>
        <Row justify="space-between">
          <Button type="primary" onClick={() => generateWalletKeys()}>
            Add Account
          </Button>
          <Badge count={pendingCount}>
            <Button type="ghost" onClick={() => setModalVisible(true)}>
              Pending Transactions
            </Button>
          </Badge>
        </Row>
        <Row style={{ marginTop: 20, marginBottom: 10 }}>
          <Radio.Group onChange={changeWallet} value={selectedWallet}>
            {walletKeys.map((item, key) => (
              <Radio key={key} value={key}>
                {item.name}
              </Radio>
            ))}
          </Radio.Group>
        </Row>
        <Row>
          <span>Public Key: </span>
          <Tag style={{ fontSize: 12 }}>
            {walletKeys[selectedWallet].publicKey}
          </Tag>
        </Row>
        <Row>
          <span>Transaction History: </span>
          <Button size="small">Show</Button>
        </Row>
      </div>
      <Divider />
      <div>
        <Row
          justify="space-between"
          style={{ paddingLeft: 100, paddingRight: 100 }}
        >
          <div>
            <Card className="balance-card">
              <Title level={2} style={{ color: 'white' }}>
                {blockChainInstance.getBalanceOfAddress(
                  walletKeys[selectedWallet].publicKey
                )}
              </Title>
              <Title level={4} style={{ color: 'white' }}>
                BALANCE
              </Title>
            </Card>
          </div>
          <div>
            <Card className="transaction-card">
              <div
                style={{ fontWeight: 'bold', color: 'white', marginBottom: 10 }}
              >
                Recipient:
              </div>
              <Select
                style={{ minWidth: 200, marginBottom: 10 }}
                onChange={changeRecipient}
                value={recipientAddress}
              >
                {walletKeys.map((item, key) => {
                  if (key !== selectedWallet)
                    return (
                      <Option key={key} value={item.publicKey}>
                        {item.name}
                      </Option>
                    );
                })}
              </Select>
              <div
                style={{ fontWeight: 'bold', color: 'white', marginBottom: 10 }}
              >
                Amount:
              </div>
              <Input
                style={{ marginBottom: 10 }}
                min={0}
                type="number"
                value={txAmount}
                onChange={changeAmount}
              ></Input>
              <div>
                <Button onClick={() => sendTransaction()}>Send</Button>
              </div>
            </Card>
          </div>
          <div>
            <Card className="mining-card">
              <div>Mining Reward: 100</div>
              <Button
                type="primary"
                style={{ width: '100%' }}
                onClick={() => mineTransactions()}
              >
                Mine
              </Button>
            </Card>
          </div>
        </Row>
      </div>
      <Divider />
      {blockChain.map((item, key) => (
        <Block wallets={walletKeys} key={key} data={item} index={key}></Block>
      ))}
      <TxModal
        visible={modalVisible}
        handleCancel={() => setModalVisible(!modalVisible)}
        wallets={walletKeys}
        transactions={[...blockChainInstance.pendingTransactions]}
      ></TxModal>
    </div>
  );
};

export default BlockChainView;
