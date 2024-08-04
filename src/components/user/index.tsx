import { User as NextUiUser } from "@nextui-org/react"
import { type FC } from "react"
import { BASE_URL } from "../../constans"

type Props = {
  avatarUrl: string
  name: string
  description?: string
  className?: string
}

const User: FC<Props> = ({ avatarUrl, name, description, className }) => {
  return (
    <NextUiUser
      name={name}
      className={className}
      description={description}
      avatarProps={{
        src: `${BASE_URL}${avatarUrl}`,
      }}
    />
  )
}

export default User
