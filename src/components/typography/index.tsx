import { type FC } from "react"

type Props = {
  children?: string
  size?: string
}

const Typography: FC<Props> = ({ children, size = "text-xl" }) => {
  return <p className={`${size}`}>{children}</p>
}

export default Typography
