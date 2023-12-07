export type Queue = {
  queue: string;
  size: number;
};

export type Stat = {
  stat: string;
  value: string;
};

export type ProcessInfo = {
  rss: string;
  quiet: string;
  info: string;
  busy: string;
  beat: string;
  rtt_us: string;
};

export type Process = {
  processKey: string;
  processInfo: ProcessInfo;
};

export type Data = {
  queues: Queue[];
  stats: Stat[];
  processes: Process[];
};
