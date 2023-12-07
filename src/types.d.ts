export type Queue = {
  queue: string;
  size: number;
};

export type Stat = {
  stat: string;
  value: string;
};

export type Info = {
  hostname: string;
  started_at: number;
  pid: number;
  tag: string;
  concurrency: number;
  queues: string[];
  weights: { [key: string]: number }[];
  labels: string[];
  identity: string;
  version: string;
  embedded: boolean;
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
