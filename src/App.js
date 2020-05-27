import React from 'react';
import './App.css';
import { Col, Row } from 'antd';

import BlockChainView from './components/BlockChain/BlockChain';

function App() {
  return (
    <div className="App">
      <Row justify="center">
        <header className="App-header">MyCoin</header>
      </Row>
      <Row>
        <BlockChainView></BlockChainView>
      </Row>
    </div>
  );
}

export default App;
