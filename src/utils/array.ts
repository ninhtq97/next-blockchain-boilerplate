export const arrIncrement = (length = 3) => Array.from(Array(length).keys());
export const unique = (arr: any[]) => [...new Set(arr)];

export const countDuplicate = (arr1: number[], arr2: number[]) => {
  const arrDuplicate: number[] = [...arr1, ...arr2].filter(
    (
      (o) => (v) =>
        (o[v] = (o[v] || 0) + 1) >= 2
    )({}),
  );

  return arrDuplicate.length;
};


export const getTicketsValid = (size = 6, tickets: Set<number>[]) => {
  return tickets.filter((k, i) => k.size >= size);
};