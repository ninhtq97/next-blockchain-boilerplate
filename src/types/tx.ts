export type TTx = {
  pending: string[];
  complete: string[];
};

export type TTxPayload = {
  type: keyof TTx;
  tx: string;
};
