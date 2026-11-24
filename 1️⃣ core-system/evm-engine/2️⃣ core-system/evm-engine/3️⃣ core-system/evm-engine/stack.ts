/**
 * 📚 EVM Stack - پشته ۲۵۶ بیتی با حداکثر ۱۰۲۴ آیتم
 */

import { U256, MAX_STACK_DEPTH } from './evm-types';

export class EVMStack {
  private items: U256[] = [];
  private maxDepth: number;

  constructor(maxDepth: number = MAX_STACK_DEPTH) {
    this.maxDepth = maxDepth;
  }

  push(value: U256): void {
    if (this.items.length >= this.maxDepth) {
      throw new Error('StackOverflow');
    }
    this.items.push(value);
  }

  pop(): U256 {
    const value = this.items.pop();
    if (value === undefined) {
      throw new Error('StackUnderflow');
    }
    return value;
  }

  peek(depth: number = 0): U256 {
    if (depth >= this.items.length) {
      throw new Error('StackUnderflow');
    }
    return this.items[this.items.length - 1 - depth]!;
  }

  dup(position: number): void {
    if (position > this.items.length) {
      throw new Error('StackUnderflow');
    }
    const value = this.items[this.items.length - position]!;
    this.push(value);
  }

  swap(position: number): void {
    if (position >= this.items.length) {
      throw new Error('StackUnderflow');
    }
    const top = this.items.length - 1;
    const target = top - position;
    [this.items[top], this.items[target]] = [this.items[target]!, this.items[top]!];
  }

  size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  clear(): void {
    this.items = [];
  }

  toArray(): U256[] {
    return [...this.items];
  }

  /** بررسی عمق مورد نیاز قبل از عملیات */
  require(depth: number): void {
    if (this.items.length < depth) {
      throw new Error('StackUnderflow');
    }
  }
}
