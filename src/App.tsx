import {FC,useState,useContext, Fragment} from "react";
import { Form, Input, message, Button, Space,List, Typography, Divider  } from 'antd';
import TodosProvider, { TodosContext } from "./TodosContext";

const Todos: FC=(): JSX.Element =>
{
  
  const [form] = Form.useForm();
  const [todo, setTodo] = useState<string>("");
  const { todos, addTodo, removeTodo,markCompleted } = useContext(TodosContext);
  const handleSubmit=() =>
  {
    addTodo(todo);
    setTodo('');
    message.success('Submit success!');
  };
  const onFinishFailed = () => {
    message.error('Submit failed!');
  };
  const onFill = () => {
    form.setFieldsValue({
      todo: 'Todo',
    });
  };
  return (
    <div className='app'>
 
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
          rules={[
            { required: true },
            { type: 'string', min: 6 },
          ]}
        >
          <Input placeholder="Todo"     value={todo}
          onChange={(e) => {
            setTodo(e?.target?.value);
          }}/>
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
      <div>
        <ul className='todo-list'>
      
            <Fragment>
          <Divider orientation="left">Todo List</Divider>
          <List
            header={<div>Todo</div>}
            // footer={<div>Footer</div>}
            bordered
            dataSource={todos}
            renderItem={({id,title, completed}) => (
              <List.Item>
                <Typography.Text delete={completed}>{title}</Typography.Text>

                <Button type={completed? "default":"primary"} onClick={() => markCompleted(id)}>{completed? 'complete':'incomplete'}</Button>

                <Button type="primary" onClick={() => removeTodo(id)}>Delete</Button>
              </List.Item>
            )}
          />
          </Fragment>
        {/* ))} */}
        </ul>
      </div>

     
    </div>
  );
};

export default () => (
  <TodosProvider>
    <Todos />
  </TodosProvider>
);
