import type { UserInput } from "../models";
import { Button, Form, Input, Spin } from "antd";
import { useFetch, useReduxAuth } from "hooks";
import { Authenticate } from "../services";

const LoginForm = () => {
  const { callEndpoint, loading } = useFetch({ showInfo: "message" });
  const { authenticate } = useReduxAuth();

  const onFinish = async ({ username, password }: UserInput) => {
    const { data, error } = await callEndpoint(
      Authenticate(username, password)
    );

    if (!error)
      authenticate({
        isAuthenticated: true,
        token: data.token,
        user: data.user,
      });
  };

  return (
    <Spin spinning={loading}>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        initialValues={{ username: "", password: "" }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Usuario"
          name="username"
          rules={[
            { required: true, message: "Debe introducir un nombre de usuario" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[
            {
              required: true,
              message: "Debe introducir una contraseña de usuario",
            },
          ]}
        >
          <Input.Password autoComplete="false" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Iniciar Sesión
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default LoginForm;
