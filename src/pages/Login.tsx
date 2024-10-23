import LoginForm from '../components/blocks/LoginForm'
import AuthLayout from '../components/layouts/AuthLayout'
import { FC } from 'react'

const Login: FC = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}

export default Login
