import { Avatar, Flex } from 'antd'
import { UserOutlined } from '@ant-design/icons'

export default function CustomHeader() {
  return (
    <Flex justify='space-between' align='center' style={{width: '100%'}}>
      <Flex justify='flex-start'>
        ALON tracker
      </Flex>
      <Flex justify='flex-end'>
        <Avatar icon={<UserOutlined/>} />
      </Flex>
    </Flex>
  )
}
