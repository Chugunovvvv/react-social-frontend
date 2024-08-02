import type { Comment } from "../types"
import { api } from "./api"

export const commentApi = api.injectEndpoints({
  endpoints: build => ({
    createComment: build.mutation<Comment, Partial<Comment>>({
      query: commentData => ({
        url: `/comments`,
        method: "POST",
        body: commentData,
      }),
    }),
    deleteComment: build.mutation<void, string>({
      query: id => ({
        url: `/comments/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const { useCreateCommentMutation, useDeleteCommentMutation } = commentApi
export const {
  endpoints: { createComment, deleteComment },
} = commentApi
