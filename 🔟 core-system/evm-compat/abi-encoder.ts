/**
 * 🔤 ABI Encoder/Decoder - کدگذاری و کدگشایی ABI
 *
 * این فایل استاندارد ABI اتریوم را پیاده‌سازی می‌کند
 */

export class AbiEncoder {
  /**
   * کدگذاری تابع (selector + params)
   */
  static encodeFunction(signature: string, params: unknown[]): string {
    const selector = this.functionSelector(signature);
    const encoded = this.encodeParams(params);
    return selector + encoded;
  }

  /**
   * محاسبه function selector (4 بایت اول keccak256)
   */
  static functionSelector(signature: string): string {
    const crypto = require('crypto');
    const hash = crypto.createHash('sha3-256').update(signature).digest();
    return hash.subarray(0, 4).toString('hex');
  }

  /**
   * کدگذاری پارامترها
   */
  static encodeParams(params: unknown[]): string {
    const encoded: string[] = [];

    for (const param of params) {
      if (typeof param === 'bigint') {
        encoded.push(this.encodeUint256(param));
      } else if (typeof param === 'number') {
        encoded.push(this.encodeUint256(BigInt(param)));
      } else if (typeof param === 'string') {
        if (param.startsWith('0x')) {
          // آدرس یا bytes
          encoded.push(param.slice(2).padStart(64, '0'));
        } else {
          // رشته
          encoded.push(this.encodeString(param));
        }
      } else if (typeof param === 'boolean') {
        encoded.push(this.encodeUint256(param ? 1n : 0n));
      } else {
        throw new Error(`Unsupported param type: ${typeof param}`);
      }
    }

    return encoded.join('');
  }

  /**
   * کدگذاری uint256
   */
  static encodeUint256(value: bigint): string {
    if (value < 0n) {
      value = value + (1n << 256n);
    }
    return value.toString(16).padStart(64, '0');
  }

  /**
   * کدگذاری آدرس
   */
  static encodeAddress(address: string): string {
    const clean = address.startsWith('0x') ? address.slice(2) : address;
    return clean.padStart(64, '0');
  }

  /**
   * کدگذاری رشته
   */
  static encodeString(str: string): string {
    const bytes = Buffer.from(str, 'utf8');
    const length = bytes.length;
    // Offset به data + length + data
    const offset = this.encodeUint256(BigInt(32));
    const lengthEncoded = this.encodeUint256(BigInt(length));
    const dataEncoded = bytes.toString('hex').padEnd(Math.ceil(length / 32) * 64, '0');
    return offset + lengthEncoded + dataEncoded;
  }

  /**
   * کدگشایی uint256
   */
  static decodeUint256(data: string): bigint {
    return BigInt('0x' + data.slice(0, 64));
  }

  /**
   * کدگشایی آدرس
   */
  static decodeAddress(data: string): string {
    return '0x' + data.slice(24, 64);
  }

  /**
   * کدگشایی bool
   */
  static decodeBool(data: string): boolean {
    return this.decodeUint256(data) !== 0n;
  }
  }
