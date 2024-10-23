import { AxiosError } from 'axios'

const isTokenRenewed = (newToken: string | undefined, error: AxiosError) => {
  if (!(newToken && error.config?.headers)) return false
  const oldCredentials = error.config.headers['Authorization'] as string | undefined
  return !oldCredentials?.includes(newToken)
}

export default isTokenRenewed
