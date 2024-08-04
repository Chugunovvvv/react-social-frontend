import { useContext } from "react"
import { ThemeContext } from "../theme-provider"
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { LuSunMedium } from "react-icons/lu"
import { FaRegMoon } from "react-icons/fa"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logout, selectIsAuthenticated } from "../../features/user/userSlice"
import { useNavigate } from "react-router-dom"
import { CiLogout } from "react-icons/ci"

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  const isAuth = useAppSelector(selectIsAuthenticated)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate("/auth")
  }
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Network</p>
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem
          onClick={() => toggleTheme()}
          className="lg:flex text-3xl cursor-pointer"
        >
          {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
        <NavbarItem>
          {isAuth && (
            <Button
              color="default"
              variant="flat"
              className="gap-2"
              onClick={handleLogout}
            >
              <CiLogout /> <span>Выйти</span>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Header
