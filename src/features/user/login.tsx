import { useState, type FC } from "react"
import { useForm } from "react-hook-form"
import Input from "../../components/UI/input"
import { Button, Link } from "@nextui-org/react"
import {
  useLazyCurrentQuery,
  useLoginMutation,
} from "../../app/services/userApi"
import { useNavigate } from "react-router-dom"
import { hasErrorField } from "../../utils/hasErrorField"
import ErrorMessage from "../../components/error/error-message"

type Props = {
  setSelected: (value: string) => void
}
type Login = {
  email: string
  password: string
}
const Login: FC<Props> = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Login>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const [error, setError] = useState<string>("")
  /** После логина вызываем запрос для уточнение что это за пользователь */
  const [triggerCurrentCuery] = useLazyCurrentQuery()
  const onSubmit = async (data: Login) => {
    try {
      await login(data).unwrap()
      await triggerCurrentCuery().unwrap()
      navigate("/", { replace: true })
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name="email"
        label="Почта"
        type="email"
        required="Обязательное поле"
      />
      <Input
        control={control}
        name="password"
        label="Пароль"
        type="password"
        required="Обязательное поле"
      />
      <ErrorMessage error={error} />
      <p className="text-center text-small">
        Нет аккаунта? {""}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected("register")}
        >
          Зарегистрируйтесь
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Войти
        </Button>
      </div>
    </form>
  )
}
export default Login
