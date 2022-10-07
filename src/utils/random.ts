import { hexlify } from "ethers/lib/utils";

/**
 * The maximum is exclusive and the minimum is inclusive
 * */
export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
export function randomTicket(min: number, max: number, size = 6) {  
  const base = new Array(45).fill(0).map((_, i) => i + 1);

  const res = new Array(size);
  for (let i = 0; i < size; i++) {
    const index = getRandomInt(min, max - i);
    res[i] = base[index];
    base[index] = base[base.length - 1 - i];
  }

  return res.sort((a, b) => a - b);
}

export function randomTickets(n: number, min = 0, max = 45, size = 6) {
  const duplicates: Record<string, boolean> = {};
  const res = new Array(n);

  for (let i = 0; i < n; ) {
    const ticket = randomTicket(min, max, size);
    const hex = hexlify(ticket);
    if (!duplicates[hex]) {
      duplicates[hex] = true;
      res[i] = ticket;
      i++;
    }
  }

  return res;
}
