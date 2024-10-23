import { Button, Layout, Space } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { FC, PropsWithChildren, ReactNode } from 'react'
import { useAuth } from '../../app/api/providers/AuthProvider.tsx'
import { useSelector } from 'react-redux'
import { RootState } from '../../shared/utils/store.ts'

export interface BaseLayoutProps {
  sideBarContent?: ReactNode
  contentPadding?: boolean
}

export const AppHeader = () => {
  const token = useSelector((state: RootState) => state.auth.token)
  const { logout } = useAuth()
  return (
    <Header className="bg-blue-900 flex justify-between">
      <div className="text-white">Dollares app</div>
      <Space size={12}>
        <Button
          className="text-white"
          type="link"
          onClick={() => {
            console.log(`токен до удаления из store: ${token}`)
            logout()
          }}
        >
          Выйти
        </Button>
      </Space>
    </Header>
  )
}

const BaseLayout: FC<PropsWithChildren<BaseLayoutProps>> = ({ children }) => {
  const content = <Content className="bg-transparent min-h-full p-6 flex">{children}</Content>

  return (
    <Layout className="flex flex-col">
      <div>
        <AppHeader />
      </div>
      <Layout className={`h-screen-minus-64`}>{content}</Layout>
    </Layout>
  )
}

export default BaseLayout
