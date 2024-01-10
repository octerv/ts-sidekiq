# ts-sidekiq

- [Recharts](https://recharts.org/)

## Client Components

- SidekiqDashboard
- SidekiqRetry
- SidekiqQueue

## Server Functions

- getSidekiqData
- getSidekiqQueueJobs
- getSidekiqRetryJobs
- removeSidekiqRetryJob

## Usage

### Install

```
npm install ts-sidekiq
```

### Import

#### Client Library

```
export {
  SidekiqDashboard,
  SidekiqRetry,
  SidekiqQueue,
} from "ts-sidekiq/build/client.js";
```

#### Server Library

```
import {
  getSidekiqData,
  getSidekiqQueueJobs,
  getSidekiqRetryJobs,
  removeSidekiqRetryJob,
} from "ts-sidekiq";
```
