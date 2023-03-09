import { baseApi } from "api/index";

export type LoginData = {
  username: string;
  password: string;
};
export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<{ access_token: string }, LoginData>({
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
