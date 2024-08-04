import { type FC } from "react"

interface Error {
  error: string
}

const ErrorMessage: FC<Error> = ({ error }) => {
  return error && <p className="text-red-500 mt-1 mb-1 text-small">{error}</p>
}

export default ErrorMessage
