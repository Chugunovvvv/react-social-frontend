import type { FC, ReactElement } from "react"

type Props = {
  children: ReactElement[] | React.ReactElement
}
const Container: FC<Props> = ({ children }) => {
  return <div className="flex max-w-screen-xl mx-auto mt-10">{children}</div>
}

export default Container
