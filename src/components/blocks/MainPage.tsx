import { videoInterface } from '../../app/api/models/videoInterface.ts'
import { Table, TableProps, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { RootState } from '../../shared/utils/store.ts'

const columns: TableProps<videoInterface>['columns'] = [
  {
    title: 'Название площадки',
    dataIndex: 'nombre',
    key: 'title'
  },
  {
    title: 'Продают',
    dataIndex: 'venta',
    key: 'sell'
  },
  {
    title: 'Покупают',
    dataIndex: 'compra',
    key: 'buy',
    render: (_, data) => <>{data.compra + 10}</>
  },
  {
    title: 'Выгода',
    dataIndex: 'src',
    key: 'src',
    render: (_, data) => (
      <>
        {data.compra + 10 > data.venta ? (
          <CaretUpOutlined className="text-green-600" />
        ) : (
          <CaretDownOutlined className="text-red-600" />
        )}
      </>
    )
  }
]

const MainPage = () => {
  const [dataList, setDataList] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const token = useSelector((state: RootState) => state.auth.token)

  const getData = async () => {
    const res = await fetch('https://dolarapi.com/v1/dolares')
    if (res.ok) {
      const result = await res.json()
      setDataList(result)
      console.log(result)
      setIsLoaded(true)
    } else {
      throw new Error(await res.json())
    }
  }

  useEffect(() => {
    console.log(`токен после добавления в store: ${token}`)

    getData()
  }, [])

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between">
        <Typography.Title>Список цен доллара на площадках</Typography.Title>
      </div>

      <Table<videoInterface>
        columns={columns}
        loading={!isLoaded}
        dataSource={dataList}
        pagination={false}
        className="w-full"
      />
    </div>
  )
}

export default MainPage
