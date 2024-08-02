import type { FC, ReactNode } from "react"
import Button from "../button"
import { Link } from "react-router-dom"

type Props = {
  children: ReactNode
  icon: JSX.Element
  href: string
}

const NavButton: FC<Props> = ({ children, icon, href }) => {
  return (
    <Button className="flex justify-start text-xl" icon={icon}>
      <Link to={href}>{children}</Link>
    </Button>
  )
}

export default NavButton
