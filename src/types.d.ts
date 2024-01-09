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

// Type for the details of a hash type cron job
export type CronJobDetailHash = {
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

// Type for a single entry in a list or zset type cron job
export type CronJobListZsetValue = string; // Adjust this type based on the actual structure of your list/zset values

// Union type for the possible values of a cron job
export type CronJobValue = CronJobDetailHash | CronJobListZsetValue[];

// Defining the main type for a cron job object
export type CronJob = {
  key: string;
  type: "hash" | "list" | "zset"; // Include other types if they exist
  details?: CronJobDetailHash; // For hash type
  value?: CronJobListZsetValue[]; // For list or zset type
};

export type Data = {
  queues: Queue[];
  stats: Stat[];
  processes: Process[];
  cronJobs: CronJob[];
};

export type RetryJobDetail = {
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
