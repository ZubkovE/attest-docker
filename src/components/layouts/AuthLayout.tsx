import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { FC, PropsWithChildren } from 'react'

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Layout>
      <Content>{children}</Content>
    </Layout>
  )
}

export default AuthLayout
