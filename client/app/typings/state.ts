/** normalized status for states */
export type Status = 'idle' | 'pending' | 'fulfilled' | 'error'

/** normalized/generic state */
export type State<T> = T & {
  status: Status;
  error: any | null;
  details?: string;
}