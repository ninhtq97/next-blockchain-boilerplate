import {
  BigNumberish,
  FixedNumber,
  formatUnits,
  hexlify,
  stripZerosLeft,
  toUtf8Bytes,
  toUtf8String,
  zeroPadValue,
} from 'ethers';
import { customAlphabet } from 'nanoid';

export const capitalize = (str: string) => {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
};

export const calcRatio = (total: BigNumberish, amount: BigNumberish) => {
  if (!total || !amount) {
    return FixedNumber.fromValue(0);
  }

  const rewardAmountFixed = FixedNumber.fromValue(total);
  const multiplierAmountFixed = FixedNumber.fromValue(amount);

  return rewardAmountFixed.divUnsafe(multiplierAmountFixed);
};

export const customCode = (length: number) =>
  customAlphabet('123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', length)();

export const uniqueStr = (length: number = 11) =>
  `${customCode(1)}${customCode(length)}`;

export const toBytes32 = (s: string) => {
  const l = toUtf8Bytes(s);
  if (l.length > 32) {
    throw new Error('should be <= 32 acci-charracter');
  }
  return hexlify(zeroPadValue(l, 32));
};

export const parseBytes32 = (str: string) => toUtf8String(stripZerosLeft(str));

export const toHex = (digit: number) => digit.toString(16).toUpperCase();

export const ordinalSuffixOf = (i: number) => {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + 'st';
  }
  if (j == 2 && k != 12) {
    return i + 'nd';
  }
  if (j == 3 && k != 13) {
    return i + 'rd';
  }
  return i + 'th';
};

export const formatBigNumberToFixed = (
  number: BigNumberish,
  displayDecimals = 18,
  decimals = 18,
) => {
  const formattedString = formatUnits(number, decimals);
  return (+formattedString).toFixed(displayDecimals);
};

export const toFixedNumber = (num: number, decimals = 2) => {
  return parseFloat(num.toFixed(decimals));
};
