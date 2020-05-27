import { BlockChain } from 'blockchain/src/blockchain/BlockChain';
import EC from 'elliptic';

export class BlockChainService {
  constructor() {
    this.blockChainInstance = new BlockChain();
    this.walletKeys = [];
    this.blockChainInstance.difficulty = 4;
    this.blockChainInstance.minePendingTransactions('my-wallet');

    this.generateWalletKeys();
  }

  generateWalletKeys() {
    const ec = new EC.ec('secp256k1');
    const key = ec.genKeyPair();

    this.walletKeys.push({
      keyObj: key,
      publicKey: key.getPublic('hex'),
      privateKey: key.getPrivate('hex'),
    });
  }

  getBlocks() {
    return this.blockChainInstance.blockChain;
  }
}
