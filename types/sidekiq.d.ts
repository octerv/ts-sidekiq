export type SidekiqQueue = {
  queue: string;
  size: number;
};

export type SidekiqStat = {
  stat: string;
  value: string;
};

export type SidekiqProcessInfoDetail = {
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

export type SidekiqProcessInfo = {
  rss: string;
  quiet: string;
  info: string;
  busy: string;
  beat: string;
  rtt_us: string;
};

export type SidekiqProcess = {
  processKey: string;
  processInfo: SidekiqProcessInfo;
};

export type SidekiqJob = {
  class: string;
  args: any[];
  retry: boolean;
  queue: string;
  jid: string;
  created_at: number; // Unixタイムスタンプ
  enqueued_at: number; // Unixタイムスタンプ
};

export type SidekiqRetryJob = {
  retry: boolean;
  queue: string;
  args: any[]; // Replace 'any' with a more specific type if you know the structure of your arguments
  class: string;
  jid: string;
  created_at: number;
  enqueued_at: number;
  error_message: string;
  error_class: string;
  failed_at: number;
  retry_count: number;
};

export type SidekiqCronJobDetail = {
  cron: string;
  active_job: string;
  symbolize_args: string;
  last_enqueue_time: string;
  queue_name_delimiter: string;
  name: string;
  args: string;
  description: string;
  status: string;
  klass: string;
  source: string;
  queue_name_prefix: string;
  message: string;
};

export type SidekiqCronJob = {
  key: string;
  type: "hash" | "list" | "zset"; // Include other types if they exist
  details?: SidekiqCronJobDetail; // For hash type
  value?: string[]; // For list or zset type
};

export type SidekiqDashboardData = {
  queues: SidekiqQueue[];
  stats: SidekiqStat[];
  processes: SidekiqProcess[];
  cronJobs: SidekiqCronJob[];
};
