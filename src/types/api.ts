
export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
  statusCode?: number;
}

export type ApiResponse<T> = {
  data: T;
  success: true;
} | {
  error: ApiError;
  success: false;
};
typescript// src/services/api.ts

import { ApiError, ApiResponse } from '@/types/api';

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof Error) {
    return { 
      code: 'ERROR',
      message: error.message,
      details: error
    };
  }
  
  // Handle Axios errors
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as any;
    return {
      code: axiosError.code || 'API_ERROR',
      message: axiosError.response?.data?.message || 'API request failed',
      details: axiosError.response?.data,
      statusCode: axiosError.response?.status
    };
  }
  
  return { 
    code: 'UNKNOWN_ERROR',
    message: 'An unknown error occurred',
    details: error
  };
};

export async function apiRequest<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: any
): Promise<ApiResponse<T>> {
  try {
    // Implementation of fetch/axios request
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: {
          code: `HTTP_${response.status}`,
          message: errorData.message || `HTTP error ${response.status}`,
          details: errorData,
          statusCode: response.status
        }
      };
    }
    
    const responseData = await response.json();
    return {
      success: true,
      data: responseData as T
    };
  } catch (error) {
    return {
      success: false,
      error: handleApiError(error)
    };
  }
}

// Usage examples
export const getLeagues = async () => {
  return apiRequest<LeagueData[]>('GET', '/api/leagues');
};

export const updateLeague = async (league: LeagueData) => {
  return apiRequest<LeagueData>('PUT', `/api/leagues/${league.id}`, league);
};