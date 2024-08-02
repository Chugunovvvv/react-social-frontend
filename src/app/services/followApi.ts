import { api } from "./api"

export const followApi = api.injectEndpoints({
  endpoints: build => ({
    followUser: build.mutation<void, { followId: string }>({
      query: followId => ({
        url: "/follow",
        method: "POST",
        body: followId,
      }),
    }),
    unFollowUser: build.mutation<void, { followId: string }>({
      query: id => ({
        url: `/unfollow/${id}`,
        method: "DELETE",
        body: id,
      }),
    }),
  }),
})

export const { useFollowUserMutation, useUnFollowUserMutation } = followApi
export const {
  endpoints: { followUser, unFollowUser },
} = followApi
