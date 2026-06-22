import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { resolveMockRequest } from './services';

export const mockBaseQuery: BaseQueryFn<any, unknown, { status: number; data: unknown }> = async (args) => {
  await new Promise((resolve) => setTimeout(resolve, 80));

  try {
    return resolveMockRequest(args);
  } catch (error) {
    return {
      error: {
        status: 500,
        data: {
          message: error instanceof Error ? error.message : 'Mock data error',
        },
      },
    };
  }
};
