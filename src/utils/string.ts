import { BigNumber, FixedNumber } from 'ethers';
import {
  formatUnits,
  hexlify,
  stripZeros,
  toUtf8Bytes,
  toUtf8String,
  zeroPad
} from 'ethers/lib/utils';
import { customAlphabet } from 'nanoid';

export const capitalize = (str: string) => {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
};

export const calcRatio = (total: BigNumber, amount: BigNumber) => {
  if (!total || total.eq(0) || !amount || amount.eq(0)) {
    return FixedNumber.from(0);
  }

  const rewardAmountFixed = FixedNumber.from(total);
  const multiplierAmountFixed = FixedNumber.from(amount);

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
  return hexlify(zeroPad(l, 32));
};

export const parseBytes32 = (str: string) => toUtf8String(stripZeros(str));

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
  number: BigNumber,
  displayDecimals = 18,
  decimals = 18,
) => {
  const formattedString = formatUnits(number, decimals);
  return (+formattedString).toFixed(displayDecimals);
};