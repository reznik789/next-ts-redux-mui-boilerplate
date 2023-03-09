import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "app/store";
import * as process from "process";

export const baseApi = createApi({
  baseQuery: async (args, WebApi, extraOptions?) => {
    const {
      user: { token },
    } = WebApi.getState() as RootState;
    let baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const baseQuery = fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers) => {
        /* не будем перетирать авторизацию если уже стоит */
        if (!headers.get("Authorization") && token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
      },
    });
    return baseQuery(args, WebApi, extraOptions || {});
  },
  endpoints: () => ({}),
});
