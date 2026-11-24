/**
 * 💾 EVM Memory - حافظه بایت‌آدرس‌پذیر که به صورت پویا گسترش می‌یابد
 */

import { GAS_COSTS } from './opcodes';

export class EVMMemory {
  private data: Uint8Array = new Uint8Array(0);

  /** گسترش حافظه به اندازه مورد نیاز */
  expand(offset: number, size: number): number {
    if (size === 0) return 0;

    const needed = offset + size;
    const currentWords = Math.ceil(this.data.length / 32);
    const neededWords = Math.ceil(needed / 32);

    if (neededWords <= currentWords) return 0;

    // محاسبه gas هزینه
    const oldCost = (3 * currentWords) + Math.floor((currentWords * currentWords) / 512);
    const newCost = (3 * neededWords) + Math.floor((neededWords * neededWords) / 512);
    const gasCost = newCost - oldCost;

    // گسترش داده
    const newData = new Uint8Array(neededWords * 32);
    newData.set(this.data);
    this.data = newData;

    return gasCost;
  }

  read(offset: number, size: number): Uint8Array {
    if (size === 0) return new Uint8Array(0);

    const result = new Uint8Array(size);
    const available = Math.max(0, Math.min(size, this.data.length - offset));

    if (available > 0) {
      result.set(this.data.subarray(offset, offset + available));
    }

    return result;
  }

  write(offset: number, data: Uint8Array): void {
    if (data.length === 0) return;

    const needed = offset + data.length;
    if (needed > this.data.length) {
      const newData = new Uint8Array(needed);
      newData.set(this.data);
      this.data = newData;
    }

    this.data.set(data, offset);
  }

  writeWord(offset: number, value: bigint): void {
    const bytes = new Uint8Array(32);
    let v = value;
    for (let i = 31; i >= 0; i--) {
      bytes[i] = Number(v & 0xffn);
      v >>= 8n;
    }
    this.write(offset, bytes);
  }

  readWord(offset: number): bigint {
    const bytes = this.read(offset, 32);
    let value = 0n;
    for (let i = 0; i < 32; i++) {
      value = (value << 8n) | BigInt(bytes[i]!);
    }
    return value;
  }

  get size(): number {
    return this.data.length;
  }

  clear(): void {
    this.data = new Uint8Array(0);
  }
        }
