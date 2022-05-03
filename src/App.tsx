import { FC, useState, useContext, Fragment } from 'react'
import MaterialTable from 'material-table'

import { TablePagination } from '@material-ui/core'
import {
  Form,
  Input,
  message,
  Button,
  Space,
  List,
  Typography,
  Divider,
} from 'antd'
import { CloseCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons'
import TodosProvider, { TodosContext } from './TodosContext'
import FileUploader from './components/FileUploader'
const Todos: FC = (): JSX.Element => {
  const [rowsPerPage, setRowsPerPage] = useState(5)
  //updates pagination, but no re-size
  const handleChangeRowsPerPage = (event: any) => {
    //enable to set rows per page to match total count
    event.target.value === 'All'
      ? setRowsPerPage(data.length)
      : setRowsPerPage(event.target.value)
  }

  const data = [
    { name: 'Mehmet', surname: 'Baran', birthYear: 1987 },
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017 },
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017 },
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017 },
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017 },
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017 },
    { name: 'Mehmet', surname: 'Baran', birthYear: 1987 },
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017 },
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017 },
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017 },
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017 },
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017 },
    { name: 'Mehmet', surname: 'Baran', birthYear: 1987 },
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017 },
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017 },
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017 },
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017 },
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017 },
  ]

  const [form] = Form.useForm()
  const [todo, setTodo] = useState<string>('')
  const { todos, addTodo, removeTodo, markCompleted } = useContext(TodosContext)
  const [newUserInfo, setNewUserInfo] = useState<{ profileImages: any[] }>({
    profileImages: [],
  })

  const updateUploadedFiles = (files: any) =>
    setNewUserInfo({ ...newUserInfo, profileImages: files })
  const handleSubmit = () => {
    addTodo(todo)
    setTodo('')
    form.setFieldsValue({
      todo: '',
    })
    message.success('Submit success!')
  }
  const onFinishFailed = () => {
    message.error('Submit failed!')
  }
  const onFill = () => {
    form.setFieldsValue({
      todo: 'Todo',
    })
  }

  const Header: FC = (): JSX.Element => (
    <>
      <span>Todo</span>
      <span>
        {todos?.length} todo{todos?.length > 1 ? 's' : ''}
      </span>
      <span>
        {todos?.filter(({ completed }) => completed)?.length} Completed,
      </span>
      <span>
        {todos?.filter(({ completed }) => !completed)?.length} Incompleted
      </span>
    </>
  )

  return (
    <div className="app">
      <div>
        <Divider orientation="left">Todo Form</Divider>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div style={{ overflow: 'hidden' }}>
            <Form.Item
              name="todo"
              label="Enter todo"
              rules={[{ required: true }, { type: 'string', min: 6 }]}
            >
              <Input
                placeholder="Todo"
                value={todo}
                onChange={(e) => {
                  setTodo(e?.target?.value)
                }}
              />
            </Form.Item>
          </div>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={onFill}>
                Fill
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
      <div>
        <ul className="todo-list">
          <Fragment>
            <Divider orientation="left">Todo List</Divider>
            <List
              header={<Header />}
              // footer={<div>Footer</div>}
              bordered
              dataSource={todos}
              renderItem={({ id, title, completed }) => (
                <List.Item>
                  <div className="left">
                    {completed ? (
                      <CheckCircleTwoTone twoToneColor="green" />
                    ) : (
                      <CloseCircleTwoTone twoToneColor="#eb2f96" />
                    )}
                    <Typography.Text delete={completed}>
                      {title}
                    </Typography.Text>
                  </div>
                  <div className="right">
                    <Button
                      type={completed ? 'default' : 'primary'}
                      onClick={() => markCompleted(id)}
                    >
                      {completed ? 'Completed' : 'Incomplete'}
                    </Button>
                    <Button type="primary" onClick={() => removeTodo(id)}>
                      Delete
                    </Button>
                  </div>
                </List.Item>
              )}
            />
            <MaterialTable
              title="Component Override Demo"
              columns={[
                { title: 'Name', field: 'name' },
                { title: 'Surname', field: 'surname' },
                { title: 'Birth Year', field: 'birthYear' },
              ]}
              data={data}
              //options.pageSize updates, but no re-size
              options={{ pageSize: rowsPerPage }}
              // onChangeRowsPerPage={handleChangeRowsPerPage} //TypeError Cannot read property 'value' of undefined
              components={{
                Pagination: (props) => (
                  <TablePagination
                    {...props}
                    rowsPerPageOptions={[5, 10, 20, 'All']}
                    rowsPerPage={rowsPerPage}
                    //updates pagination, but no re-size
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    count={data?.length}
                    // page={
                    //   firstLoad
                    //     ? pageNumber
                    //     : pageNumber - 1
                    // }
                    // onChangePage={(e, page) =>
                    //   handleChangePage(page + 1)
                    // }
                    // onChangeRowsPerPage={event => {
                    //   props.onChangeRowsPerPage(event);
                    //   handleChangeRowPerPage(event.target.value);
                    // }}
                  />
                ),
              }}
            />
          </Fragment>
          {/* ))} */}
        </ul>
      </div>
      <FileUploader />
    </div>
  )
}

export default () => (
  <TodosProvider>
    <Todos />
  </TodosProvider>
)
