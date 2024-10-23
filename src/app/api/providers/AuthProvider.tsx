import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setToken, clearToken } from '../../../shared/utils/authSlice'
import { RootState } from '../../../shared/utils/store'
import { notification } from 'antd'

interface userInterface {
  login?: string
  password?: string
}

export interface AuthProviderValue {
  user: userInterface | null
  authed: boolean
  login: (login: string, password: string) => void
  logout: () => void
  isInitializing: boolean
}

const defaultState: AuthProviderValue = {
  user: {},
  login: () => {},
  logout: () => {},
  authed: false,
  isInitializing: false
}

const AuthContext = createContext<AuthProviderValue>(defaultState)

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification()
  const [user, setUser] = useState<userInterface | null>(null)
  const [authed, setAuthed] = useState(false)
  const [isIsInitializing, setIsInitializing] = useState(true)
  const dispatch = useDispatch()
  const token = useSelector((state: RootState) => state.auth.token)

  const init = async () => {
    setIsInitializing(true)
    try {
      if (!token) {
        dispatch(clearToken())
        return
      }
    } finally {
      setIsInitializing(false)
    }
  }

  useEffect(() => {
    init()
  }, [token])

  return (
    <AuthContext.Provider
      value={{
        logout: () => {
          dispatch(clearToken())
          console.log(`токен после удаления из store: ${token}`)
          setUser(null)
          setAuthed(false)
        },
        login: (login, password) => {
          if (login === 'admin' && password === 'admin') {
            console.log(`токен до добавления в store: ${token}`)
            const userToken = btoa(`${login}:${password}`)
            dispatch(setToken(userToken))
            setUser({
              password: password,
              login: login
            })
            setAuthed(true)
          } else {
            api.error({
              message: `Неверный логин и пароль!`
            })
          }
        },
        user: user,
        authed: authed,
        isInitializing: isIsInitializing
      }}
    >
      {contextHolder}
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
export default AuthProvider
