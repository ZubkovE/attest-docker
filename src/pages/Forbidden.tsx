import { Typography } from 'antd'
import BaseLayout from '../components/layouts/BaseLayout'

const Forbidden = () => {
  return (
    <BaseLayout>
      <div>
        <Typography.Title level={3}>В доступе отказано</Typography.Title>
      </div>
    </BaseLayout>
  )
}

export default Forbidden
