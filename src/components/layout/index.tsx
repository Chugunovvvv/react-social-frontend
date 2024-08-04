import { Outlet, replace, useNavigate } from "react-router-dom"
import Container from "../container"
import Header from "../header"
import NavBar from "../navBar"

import {
  selectIsAuthenticated,
  selectUser,
} from "../../features/user/userSlice"
import { useAppSelector } from "../../app/hooks"
import { useEffect } from "react"

const Layout = () => {
  const isAuth = useAppSelector(selectIsAuthenticated)
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth) {
      navigate("/auth")
    }
  }, [])
  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <NavBar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </Container>
    </>
  )
}

export default Layout
