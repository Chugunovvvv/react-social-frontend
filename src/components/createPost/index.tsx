import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
} from "../../app/services/postApi"
import { Controller, useForm } from "react-hook-form"
import { Button, Textarea } from "@nextui-org/react"
import ErrorMessage from "../error/error-message"
import { IoMdCreate } from "react-icons/io"
import { type FC } from "react"

const CreatePost: FC = () => {
  const [createPost] = useCreatePostMutation()
  const [triggerAllPosts] = useLazyGetAllPostsQuery()

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  const error = errors?.post?.message as string
  const onSubmit = async data => {
    console.log(data)
    try {
      await createPost({ content: data.post }).unwrap()
      setValue("post", "")
      await triggerAllPosts().unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form action="" className="flex-grow" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="post"
        control={control}
        defaultValue=""
        rules={{
          required: "Обязательное поле",
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder="О чем думаете?"
            className="mb-5"
          />
        )}
      />
      {errors && <ErrorMessage error={error} />}
      <Button
        color="success"
        className="flex-end"
        endContent={<IoMdCreate />}
        type="submit"
      >
        Добавить пост
      </Button>
    </form>
  )
}

export default CreatePost
