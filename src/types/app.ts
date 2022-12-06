export interface TApp {
  refreshDOM: number;
  status: 'idle' | 'loading' | 'failed' | '404' | '500';
}
