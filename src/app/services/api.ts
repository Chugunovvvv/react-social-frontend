import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../../constans"
import type { RootState } from "../store"

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api`,
  // устанавливаем токен с каждым запросом в хедеры
  //   prepareHeaders: (headers, { getState }) => {
  //     const token =
  //       (getState() as RootState).user.token || localStorage.getItem("token")

  //     if (token) {
  //       headers.set("authorization", `Bearer ${token}`)
  //     }
  //     return headers
  //   },
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 })

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithRetry,
  // отключаем кеш
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
})
