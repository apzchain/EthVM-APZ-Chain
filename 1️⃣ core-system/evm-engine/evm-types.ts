/**
 * 🧠 EVM Types - تعریف انواع اصلی موتور EVM
 */

// ============================================
// 📌 Basic Types
// ============================================

/** آدرس ۲۰ بایتی (مثل اتریوم) */
export type Address = `0x${string}`;

/** هش ۳۲ بایتی */
export type Hash = `0x${string}`;

/** عدد ۲۵۶ بیتی (به صورت BigInt) */
export type U256 = bigint;

/** بایت‌کد */
export type Bytecode = Uint8Array;

// ============================================
// 🎯 Word (کلمه ۲۵۶ بیتی)
// ============================================

export const WORD_SIZE = 32;
export const MAX_U256 = (1n << 256n) - 1n;
export const MAX_STACK_DEPTH = 1024;

// ============================================
// 📊 Status
// ============================================

export enum ExecutionStatus {
  Success = 'success',
  Reverted = 'reverted',
  OutOfGas = 'out_of_gas',
  InvalidOpcode = 'invalid_opcode',
  StackUnderflow = 'stack_underflow',
  StackOverflow = 'stack_overflow',
  InvalidJump = 'invalid_jump',
  StaticStateChange = 'static_state_change',
  Revert = 'revert',
}

// ============================================
// 🎯 Execution Result
// ============================================

export interface ExecutionResult {
  status: ExecutionStatus;
  gasUsed: U256;
  gasRemaining: U256;
  returnData: Uint8Array;
  logs: LogEntry[];
  selfDestructs: Address[];
  refund: U256;
  error?: string;
}

// ============================================
// 📝 Log Entry
// ============================================

export interface LogEntry {
  address: Address;
  topics: U256[];
  data: Uint8Array;
}

// ============================================
// 🎯 Transaction Context
// ============================================

export interface TxContext {
  /** فرستنده */
  origin: Address;
  /** گیرنده (اگر null باشد، deploy است) */
  to: Address | null;
  /** مقدار (wei) */
  value: U256;
  /** داده (calldata) */
  data: Uint8Array;
  /** Gas limit */
  gasLimit: U256;
  /** Gas price */
  gasPrice: U256;
  /** Nonce */
  nonce: bigint;
  /** Chain ID */
  chainId: bigint;
  /** Block number */
  blockNumber: bigint;
  /** Block timestamp */
  blockTimestamp: bigint;
  /** Block coinbase (miner) */
  blockCoinbase: Address;
  /** Block difficulty (یا prevrandao در PoS) */
  blockDifficulty: U256;
  /** Block gas limit */
  blockGasLimit: U256;
  /** Block base fee */
  blockBaseFee: U256;
}

// ============================================
// 🎯 Execution Context
// ============================================

export interface ExecutionContext {
  /** آدرس در حال اجرا */
  address: Address;
  /** فرستنده (msg.sender) */
  caller: Address;
  /** منشأ (tx.origin) */
  origin: Address;
  /** مقدار پیام */
  value: U256;
  /** داده پیام */
  calldata: Uint8Array;
  /** داده کد (برای CODECOPY) */
  code: Bytecode;
  /** Gas موجود */
  gasLimit: U256;
  /** Gas price */
  gasPrice: U256;
  /** آیا static call است؟ (غیرقابل تغییر) */
  isStatic: boolean;
  /** عمق تماس */
  depth: number;
  /** اطلاعات block */
  block: BlockInfo;
  /** اطلاعات تراکنش */
  tx: TxInfo;
}

export interface BlockInfo {
  number: bigint;
  timestamp: bigint;
  coinbase: Address;
  difficulty: U256;
  gasLimit: U256;
  baseFee: U256;
  prevRandao: U256;
  chainId: bigint;
}

export interface TxInfo {
  origin: Address;
  gasPrice: U256;
}

// ============================================
// 🎯 Account State
// ============================================

export interface Account {
  nonce: bigint;
  balance: U256;
  codeHash: Hash;
  storageRoot: Hash;
  code?: Bytecode;
  storage?: Map<U256, U256>;
}

// ============================================
// 🎯 State Interface
// ============================================

export interface StateManager {
  getAccount(address: Address): Promise<Account | undefined>;
  setAccount(address: Address, account: Account): void;
  getBalance(address: Address): Promise<U256>;
  setBalance(address: Address, balance: U256): void;
  getNonce(address: Address): Promise<bigint>;
  setNonce(address: Address, nonce: bigint): void;
  getCode(address: Address): Promise<Bytecode>;
  setCode(address: Address, code: Bytecode): void;
  getStorage(address: Address, key: U256): Promise<U256>;
  setStorage(address: Address, key: U256, value: U256): void;
  accountExists(address: Address): Promise<boolean>;
  deleteAccount(address: Address): void;
  takeSnapshot(): number;
  revertToSnapshot(id: number): void;
  commit(): void;
}

// ============================================
// 🎯 Opcode Definition
// ============================================

export interface Opcode {
  code: number;
  name: string;
  inputs: number;
  outputs: number;
  gasCost: number | 'dynamic';
  execute: (ctx: ExecutionContext, evm: unknown) => void;
}

// ============================================
// 🎯 EVM Config
// ============================================

export interface EVMConfig {
  chainId: bigint;
  hardfork: Hardfork;
  enablePrecompiles: boolean;
  enableDebug: boolean;
  maxCallDepth: number;
  initialBaseFee: bigint;
}

export enum Hardfork {
  Homestead = 'homestead',
  Byzantium = 'byzantium',
  Constantinople = 'constantinople',
  Istanbul = 'istanbul',
  Berlin = 'berlin',
  London = 'london',
  Paris = 'paris',
  Shanghai = 'shanghai',
  Cancun = 'cancun',
}

// ============================================
// 🎯 RPC Types
// ============================================

export interface RpcRequest {
  jsonrpc: '2.0';
  method: string;
  params: unknown[];
  id: number | string;
}

export interface RpcResponse {
  jsonrpc: '2.0';
  result?: unknown;
  error?: RpcError;
  id: number | string | null;
}

export interface RpcError {
  code: number;
  message: string;
  data?: unknown;
}

// ============================================
// 🎯 Hex Utils
// ============================================

export const toHex = (value: bigint | number | Uint8Array): string => {
  if (typeof value === 'bigint' || typeof value === 'number') {
    return '0x' + value.toString(16);
  }
  return '0x' + Buffer.from(value).toString('hex');
};

export const fromHex = (hex: string): Uint8Array => {
  const clean = hex.startsWith('0x') ? hex.slice(2) : hex;
  return Buffer.from(clean, 'hex');
};

export const hexToBigInt = (hex: string): bigint => {
  if (hex === '0x' || hex === '') return 0n;
  return BigInt(hex);
};
