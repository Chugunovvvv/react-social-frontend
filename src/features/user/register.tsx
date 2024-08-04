import { useState, type FC } from "react"
import { useForm } from "react-hook-form"
import Input from "../../components/UI/input"
import { Button, Link } from "@nextui-org/react"
import ErrorMessage from "../../components/error/error-message"
import { useRegisterMutation } from "../../app/services/userApi"
import { hasErrorField } from "../../utils/hasErrorField"

type Register = {
  email: string
  password: string
  name: string
}
type Props = {
  setSelected: (value: string) => void
}

const Register: FC<Props> = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Register>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const [error, setError] = useState<string>("")
  const [register, { isLoading }] = useRegisterMutation()

  const onSumbit = async (data: Register) => {
    try {
      await register(data).unwrap()
      setSelected("login")
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSumbit)}>
      <Input
        control={control}
        name="name"
        label="Имя"
        type="text"
        required="Обязательное поле"
      />
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
        Уже есть аккаунт? {""}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected("login")}
        >
          Войти
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Зарегистрироваться
        </Button>
      </div>
    </form>
  )
}

export default Register
