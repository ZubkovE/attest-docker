import { Button, Form, Input, Space, Typography } from 'antd'

import { useAuth } from '../../app/api/providers/AuthProvider'

interface LoginFormValues {
  password: string
  login: string
}

const LoginForm = () => {
  const [form] = Form.useForm<LoginFormValues>()
  const { login } = useAuth()
  return (
    <div className="h-screen flex justify-center items-center gap-x-4 w-full">
      <Space direction="vertical" size={25} className="w-1/3">
        <Space direction="vertical" size={5} className="text-center w-full">
          <Typography.Title level={3}>Вход в аккаунт</Typography.Title>
          <Typography.Text type="secondary">Введите ваш логин и пароль для входа</Typography.Text>
        </Space>

        <Form
          form={form}
          onFinish={(values) => login(values.login, values.password)}
          layout="vertical"
          size="large"
        >
          <Space direction="vertical" size={10} className="w-full">
            <Form.Item rules={[{ required: true, message: 'Логин обязателен' }]} name="login">
              <Input placeholder="Введите логин" />
            </Form.Item>
            <Form.Item rules={[{ required: true, message: 'Пароль обязателен' }]} name="password">
              <Input.Password placeholder="Введите пароль" />
            </Form.Item>
            <Button htmlType="submit" block type="primary">
              Войти
            </Button>
          </Space>
        </Form>
      </Space>
    </div>
  )
}

export default LoginForm
