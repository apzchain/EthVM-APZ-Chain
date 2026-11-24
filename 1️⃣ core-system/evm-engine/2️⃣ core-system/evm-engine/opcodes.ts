/**
 * 🔢 EVM Opcodes - کدهای عملیاتی EVM
 *
 * این فایل همه opcodeهای EVM را با gas cost تعریف می‌کند
 * طبق Yellow Paper و EIPs مختلف
 */

// ============================================
// 📌 Opcode Groups
// ============================================

export const STOP = 0x00;
export const ADD = 0x01;
export const MUL = 0x02;
export const SUB = 0x03;
export const DIV = 0x04;
export const SDIV = 0x05;
export const MOD = 0x06;
export const SMOD = 0x07;
export const ADDMOD = 0x08;
export const MULMOD = 0x09;
export const EXP = 0x0a;
export const SIGNEXTEND = 0x0b;

// Comparison
export const LT = 0x10;
export const GT = 0x11;
export const SLT = 0x12;
export const SGT = 0x13;
export const EQ = 0x14;
export const ISZERO = 0x15;
export const AND = 0x16;
export const OR = 0x17;
export const XOR = 0x18;
export const NOT = 0x19;
export const BYTE = 0x1a;
export const SHL = 0x1b;
export const SHR = 0x1c;
export const SAR = 0x1d;

// SHA3
export const KECCAK256 = 0x20;

// Environment
export const ADDRESS = 0x30;
export const BALANCE = 0x31;
export const ORIGIN = 0x32;
export const CALLER = 0x33;
export const CALLVALUE = 0x34;
export const CALLDATALOAD = 0x35;
export const CALLDATASIZE = 0x36;
export const CALLDATACOPY = 0x37;
export const CODESIZE = 0x38;
export const CODECOPY = 0x39;
export const GASPRICE = 0x3a;
export const EXTCODESIZE = 0x3b;
export const EXTCODECOPY = 0x3c;
export const RETURNDATASIZE = 0x3d;
export const RETURNDATACOPY = 0x3e;
export const EXTCODEHASH = 0x3f;

// Block
export const BLOCKHASH = 0x40;
export const COINBASE = 0x41;
export const TIMESTAMP = 0x42;
export const NUMBER = 0x43;
export const PREVRANDAO = 0x44;
export const GASLIMIT = 0x45;
export const CHAINID = 0x46;
export const SELFBALANCE = 0x47;
export const BASEFEE = 0x48;

// Storage
export const POP = 0x50;
export const MLOAD = 0x51;
export const MSTORE = 0x52;
export const MSTORE8 = 0x53;
export const SLOAD = 0x54;
export const SSTORE = 0x55;
export const JUMP = 0x56;
export const JUMPI = 0x57;
export const PC = 0x58;
export const MSIZE = 0x59;
export const GAS = 0x5a;
export const JUMPDEST = 0x5b;

// Push
export const PUSH0 = 0x5f;
export const PUSH1 = 0x60;
export const PUSH32 = 0x7f;
export const DUP1 = 0x80;
export const DUP16 = 0x8f;
export const SWAP1 = 0x90;
export const SWAP16 = 0x9f;

// Logs
export const LOG0 = 0xa0;
export const LOG1 = 0xa1;
export const LOG2 = 0xa2;
export const LOG3 = 0xa3;
export const LOG4 = 0xa4;

// System
export const CREATE = 0xf0;
export const CALL = 0xf1;
export const CALLCODE = 0xf2;
export const RETURN = 0xf3;
export const DELEGATECALL = 0xf4;
export const CREATE2 = 0xf5;
export const STATICCALL = 0xfa;
export const REVERT = 0xfd;
export const INVALID = 0xfe;
export const SELFDESTRUCT = 0xff;

// ============================================
// 💰 Gas Costs (EIP-150, EIP-2200, EIP-2929, EIP-3529, EIP-3651)
// ============================================

export const GAS_COSTS = {
  // Arithmetic
  ZERO: 0,
  BASE: 2,
  VERY_LOW: 3,
  LOW: 5,
  MID: 8,
  HIGH: 10,
  EXP: 10,
  EXP_BYTE: 50, // per byte of exponent

  // Storage
  SLOAD_COLD: 2100,   // EIP-2929
  SLOAD_WARM: 100,    // EIP-2929
  SSTORE_SET: 20000,
  SSTORE_RESET: 5000,
  SSTORE_CLEAR_REFUND: 4800, // EIP-3529
  SSTORE_COLD: 2100,  // EIP-2929

  // Memory
  MEMORY: 3,
  COPY: 3,            // per word
  KECCAK256: 30,
  KECCAK256_WORD: 6,

  // Environment
  BALANCE_COLD: 2600,
  BALANCE_WARM: 100,
  EXTCODESIZE_COLD: 2600,
  EXTCODESIZE_WARM: 100,
  EXTCODECOPY_COLD: 2600,
  EXTCODECOPY_WARM: 100,
  EXTCODEHASH_COLD: 2600,
  EXTCODEHASH_WARM: 100,

  // Calls
  CALL_COLD: 2600,
  CALL_WARM: 100,
  CALL_VALUE: 9000,
  CALL_STIPEND: 2300,
  CALL_NEW_ACCOUNT: 25000,
  SELFDESTRUCT: 5000,
  SELFDESTRUCT_REFUND: 24000,

  // Logs
  LOG: 375,
  LOG_TOPIC: 375,
  LOG_DATA: 8, // per byte

  // Create
  CREATE: 32000,
  CODE_DEPOSIT: 200, // per byte

  // Jump
  JUMPDEST: 1,

  // Init
  TRANSACTION: 21000,
  TX_CREATE: 32000,
  TX_DATA_ZERO: 4,
  TX_DATA_NON_ZERO: 16,
  TX_ACCESS_LIST_ADDRESS: 2400,
  TX_ACCESS_LIST_STORAGE: 1900,

  // Precompiles
  ECRECOVER: 3000,
  SHA256: 60,
  SHA256_WORD: 12,
  RIPEMD160: 600,
  RIPEMD160_WORD: 120,
  IDENTITY: 15,
  IDENTITY_WORD: 3,
  MODEXP: 200,
  BN256ADD: 150,
  BN256MUL: 6000,
  BN256PAIRING: 45000,
  BLAKE2F: 1,

  // Revert/Return
  REVERT: 0,
  RETURN: 0,
  INVALID: 0,
} as const;

// ============================================
// 🎯 Helper: Check PUSH opcode
// ============================================

export function isPush(opcode: number): boolean {
  return opcode >= PUSH1 && opcode <= PUSH32;
}

export function getPushSize(opcode: number): number {
  if (!isPush(opcode)) return 0;
  return opcode - PUSH0;
}

export function isDup(opcode: number): boolean {
  return opcode >= DUP1 && opcode <= DUP16;
}

export function getDupPosition(opcode: number): number {
  if (!isDup(opcode)) return 0;
  return opcode - DUP1 + 1;
}

export function isSwap(opcode: number): boolean {
  return opcode >= SWAP1 && opcode <= SWAP16;
}

export function getSwapPosition(opcode: number): number {
  if (!isSwap(opcode)) return 0;
  return opcode - SWAP1 + 1;
}

export function isLog(opcode: number): boolean {
  return opcode >= LOG0 && opcode <= LOG4;
}

export function getLogTopics(opcode: number): number {
  if (!isLog(opcode)) return 0;
  return opcode - LOG0;
}

// ============================================
// 📋 Opcode Names (برای Debug و Trace)
// ============================================

export const OPCODE_NAMES: Record<number, string> = {
  [STOP]: 'STOP',
  [ADD]: 'ADD',
  [MUL]: 'MUL',
  [SUB]: 'SUB',
  [DIV]: 'DIV',
  [SDIV]: 'SDIV',
  [MOD]: 'MOD',
  [SMOD]: 'SMOD',
  [ADDMOD]: 'ADDMOD',
  [MULMOD]: 'MULMOD',
  [EXP]: 'EXP',
  [SIGNEXTEND]: 'SIGNEXTEND',
  [LT]: 'LT',
  [GT]: 'GT',
  [SLT]: 'SLT',
  [SGT]: 'SGT',
  [EQ]: 'EQ',
  [ISZERO]: 'ISZERO',
  [AND]: 'AND',
  [OR]: 'OR',
  [XOR]: 'XOR',
  [NOT]: 'NOT',
  [BYTE]: 'BYTE',
  [SHL]: 'SHL',
  [SHR]: 'SHR',
  [SAR]: 'SAR',
  [KECCAK256]: 'KECCAK256',
  [ADDRESS]: 'ADDRESS',
  [BALANCE]: 'BALANCE',
  [ORIGIN]: 'ORIGIN',
  [CALLER]: 'CALLER',
  [CALLVALUE]: 'CALLVALUE',
  [CALLDATALOAD]: 'CALLDATALOAD',
  [CALLDATASIZE]: 'CALLDATASIZE',
  [CALLDATACOPY]: 'CALLDATACOPY',
  [CODESIZE]: 'CODESIZE',
  [CODECOPY]: 'CODECOPY',
  [GASPRICE]: 'GASPRICE',
  [EXTCODESIZE]: 'EXTCODESIZE',
  [EXTCODECOPY]: 'EXTCODECOPY',
  [RETURNDATASIZE]: 'RETURNDATASIZE',
  [RETURNDATACOPY]: 'RETURNDATACOPY',
  [EXTCODEHASH]: 'EXTCODEHASH',
  [BLOCKHASH]: 'BLOCKHASH',
  [COINBASE]: 'COINBASE',
  [TIMESTAMP]: 'TIMESTAMP',
  [NUMBER]: 'NUMBER',
  [PREVRANDAO]: 'PREVRANDAO',
  [GASLIMIT]: 'GASLIMIT',
  [CHAINID]: 'CHAINID',
  [SELFBALANCE]: 'SELFBALANCE',
  [BASEFEE]: 'BASEFEE',
  [POP]: 'POP',
  [MLOAD]: 'MLOAD',
  [MSTORE]: 'MSTORE',
  [MSTORE8]: 'MSTORE8',
  [SLOAD]: 'SLOAD',
  [SSTORE]: 'SSTORE',
  [JUMP]: 'JUMP',
  [JUMPI]: 'JUMPI',
  [PC]: 'PC',
  [MSIZE]: 'MSIZE',
  [GAS]: 'GAS',
  [JUMPDEST]: 'JUMPDEST',
  [PUSH0]: 'PUSH0',
  [PUSH1]: 'PUSH1',
  [PUSH32]: 'PUSH32',
  [DUP1]: 'DUP1',
  [DUP16]: 'DUP16',
  [SWAP1]: 'SWAP1',
  [SWAP16]: 'SWAP16',
  [LOG0]: 'LOG0',
  [LOG4]: 'LOG4',
  [CREATE]: 'CREATE',
  [CALL]: 'CALL',
  [CALLCODE]: 'CALLCODE',
  [RETURN]: 'RETURN',
  [DELEGATECALL]: 'DELEGATECALL',
  [CREATE2]: 'CREATE2',
  [STATICCALL]: 'STATICCALL',
  [REVERT]: 'REVERT',
  [INVALID]: 'INVALID',
  [SELFDESTRUCT]: 'SELFDESTRUCT',
};

// ============================================
// ✅ Valid JUMPDEST positions (باید از پیش محاسبه شود)
// ============================================

export function findJumpdests(code: Uint8Array): Set<number> {
  const jumpdests = new Set<number>();
  let i = 0;

  while (i < code.length) {
    const op = code[i]!;

    if (op === JUMPDEST) {
      jumpdests.add(i);
      i++;
    } else if (isPush(op)) {
      i += 1 + getPushSize(op);
    } else {
      i++;
    }
  }

  return jumpdests;
  }
