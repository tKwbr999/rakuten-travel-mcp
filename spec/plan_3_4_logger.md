### 4. ロガーとエラーハンドリングの実装

`src/utils/logger.ts`:

```typescript
export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

const LOG_LEVEL = (process.env.LOG_LEVEL || 'info').toLowerCase() as LogLevel;

const LEVEL_PRIORITY = {
  [LogLevel.ERROR]: 0,
  [LogLevel.WARN]: 1,
  [LogLevel.INFO]: 2,
  [LogLevel.DEBUG]: 3,
};

export const logger = {
  error: (message: string, ...args: any[]) => {
    if (LEVEL_PRIORITY[LOG_LEVEL] >= LEVEL_PRIORITY[LogLevel.ERROR]) {
      console.error(`[ERROR] ${message}`, ...args);
    }
  },
  warn: (message: string, ...args: any[]) => {
    if (LEVEL_PRIORITY[LOG_LEVEL] >= LEVEL_PRIORITY[LogLevel.WARN]) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  },
  info: (message: string, ...args: any[]) => {
    if (LEVEL_PRIORITY[LOG_LEVEL] >= LEVEL_PRIORITY[LogLevel.INFO]) {
      console.info(`[INFO] ${message}`, ...args);
    }
  },
  debug: (message: string, ...args: any[]) => {
    if (LEVEL_PRIORITY[LOG_LEVEL] >= LEVEL_PRIORITY[LogLevel.DEBUG]) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  },
};
```

`src/utils/errors.ts`:

```typescript
import { logger } from './logger';

export enum ErrorCode {
  RAKUTEN_API_ERROR = 'RAKUTEN_API_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  NOT_FOUND = 'NOT_FOUND',
}

export class AppError extends Error {
  code: ErrorCode;
  status: number;
  details?: any;

  constructor(
    message: string,
    code: ErrorCode = ErrorCode.SERVER_ERROR,
    status: number = 500,
    details?: any
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.status = status;
    this.details = details;

    // ロギング
    logger.error(`${code}: ${message}`, details);
  }
}

export class RakutenApiError extends AppError {
  constructor(message: string, details?: any) {
    super(
      message,
      ErrorCode.RAKUTEN_API_ERROR,
      500,
      details
    );
    this.name = 'RakutenApiError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(
      message,
      ErrorCode.VALIDATION_ERROR,
      400,
      details
    );
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, details?: any) {
    super(
      message,
      ErrorCode.NOT_FOUND,
      404,
      details
    );
    this.name = 'NotFoundError';
  }
}
```