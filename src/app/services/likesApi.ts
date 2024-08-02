import type { Like } from "../types"
import { api } from "./api"

export const likesApi = api.injectEndpoints({
  endpoints: build => ({
    createLike: build.mutation<Like, { postId: string }>({
      query: body => ({
        url: "/likes",
        method: "POST",
        body,
      }),
    }),
    unLike: build.mutation<void, string>({
      query: id => ({
        url: `/unlike/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const { useCreateLikeMutation, useUnLikeMutation } = likesApi
export const {
  endpoints: { createLike, unLike },
} = likesApi
