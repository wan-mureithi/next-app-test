import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
  BaseQueryFn, FetchArgs, fetchBaseQuery,
  FetchBaseQueryError, FetchBaseQueryMeta
} from '@reduxjs/toolkit/query/react';
import { getTokenFromLocalStorage } from '../pages/api/get-token';

//import { getAccessToken } from '../../modules/authentication/authentication.module';
export function getAccessToken(): string | null {
    const user: any = sessionStorage.getItem(
        `oidc.user:${process.env.REACT_APP_CONFIG_URL}:${process.env.REACT_APP_IDENTITY_CLIENT_ID}`
      );
    if (user) {
      return user.access_token;
    }
    return null;
  }

const baseUrl = 'https://gateway.purplecliff-03d4fbdd.westeurope.azurecontainerapps.io/api/treasury-service'
const accessToken: string = getTokenFromLocalStorage()!
const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    headers.set('Authorization', `Bearer ${accessToken}`);
    return headers;
  }
});
export const baseQueryWithIntercept: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>
  = async (args, api, extraOptions): Promise<any> => {
    const result: QueryReturnValue<any, FetchBaseQueryError, FetchBaseQueryMeta>
      = await baseQuery(args, api, extraOptions);
    const { error, meta } = result;
    if (error) {
      const { status } = error as FetchBaseQueryError;
      const { request } = meta as FetchBaseQueryMeta;
      const url: string = request.url;
      return {
        error: {
          url,
          status,
          message: generateMessage(error),
          data: error.data
        }
      };
    }
    return result;
  };
const generateMessage = (error: FetchBaseQueryError) => {
  const { status } = error;
  switch (status) {
    case 400:
      return 'invalid request';
    case 401:
      return 'You\'re not logged in , Please log in first ';
    case 403:
      return 'You are not allowed to access this resource';
    case 404:
      return 'Invalid url';
    default:
      return getErrorMessage(error) || 'Something went wrong';
  }
};
function getErrorMessage(error: any) {
  return error.status === 400
    ? error.data
    : error.status === 500
      ? error.data?.title
      : '';
}
