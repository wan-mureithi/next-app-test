import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithIntercept } from '../base-query';

export interface IListResponse<T> {
    current_page: number;
    page_count: number;
    items: T[];
    row_count: number;
    page_size?: number;
    total_data_count: number;
    totalCount?: number;
  }
  export interface ICurrency {
    id: string;
    code: string;
    symbol: string;
    description: string;
    currency_conversion: number;
    flag_id: string;
  }
  
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithIntercept,
    endpoints: (builder) => ({
      
      readCurrencies: builder.query<IListResponse<ICurrency>, void>({
        query: () => 'currencies'
      })
    })
  });
  
  export const { useReadCurrenciesQuery } = apiSlice