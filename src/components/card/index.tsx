import React, { FC, useState } from "react"
import {
  CardBody,
  CardFooter,
  CardHeader,
  Card as NextUiCard,
  Spinner,
} from "@nextui-org/react"
import {
  useCreateLikeMutation,
  useUnLikeMutation,
} from "../../app/services/likesApi"
import {
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from "../../app/services/postApi"
import { useDeleteCommentMutation } from "../../app/services/commentApi"
import { Link, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { selectCurrent } from "../../features/user/userSlice"
import User from "../user"
import { formatToClientDate } from "../../utils/formatToClientDate"
import { RiDeleteBinLine } from "react-icons/ri"
import Typography from "../typography"

type Props = {
  avatarUrl: string
  name: string
  authorId: string
  content: string
  commentId?: string
  likesCount?: number
  commentsCount: number
  createdAt: Date
  id?: string
  cardFor: "comment" | "post" | "current-post"
  likedByUser?: boolean
}

const Card: FC<Props> = ({
  avatarUrl,
  name,
  authorId,
  content,
  commentId,
  likesCount = 0,
  commentsCount = 0,
  createdAt,
  id,
  cardFor = "post",
  likedByUser = false,
}) => {
  const [likePost] = useCreateLikeMutation()
  const [unlikePost] = useUnLikeMutation()
  const [triggerGetAllPost] = useLazyGetAllPostsQuery()
  const [triggerGetPostById] = useLazyGetPostByIdQuery()
  const [deletePost, deletePostStatus] = useDeletePostMutation()
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation()
  const [error, setError] = useState<string>("")
  const navigate = useNavigate()
  const currentUser = useAppSelector(selectCurrent)
  return (
    <NextUiCard className="mb-5">
      <CardHeader className="justify-between items-center bg-transparent">
        <Link to={`/users/${authorId}`}>
          <User
            name={name}
            avatarUrl={avatarUrl}
            description={createdAt && formatToClientDate(createdAt)}
            className="text-small font-semibold leading-non text-default-600"
          />
        </Link>
        {authorId === currentUser?.id && (
          <div className="cursor-pointer">
            {deleteCommentStatus.isLoading || deletePostStatus.isLoading ? (
              <Spinner />
            ) : (
              <RiDeleteBinLine />
            )}
          </div>
        )}
      </CardHeader>
      <CardBody className="px-3 py-2 mb-5">
        <Typography>{content}</Typography>
      </CardBody>
      {cardFor !== "comment" && (
        <CardFooter className="gap-3">
          <div className="flex gap-5 items-center">
            <div></div>
          </div>
        </CardFooter>
      )}
    </NextUiCard>
  )
}

export default Card
