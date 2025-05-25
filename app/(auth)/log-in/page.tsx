"use client";
import { signIn } from "@/lib/actions/auth";
import { getSession } from "@/lib/actions/sessions";
import { Form, Input, Button, message, Checkbox } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const page = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const savedLog = localStorage.getItem("synapsisRememberedMe");
      if (savedLog) {
        //   const { email, token } = JSON.parse(savedLog);
        const { email, token } = await getSession();
        form.setFieldsValue({ email, token, remember: true });
      }
    };
    checkSession();
  }, []);

  const onFinish = async (values: any) => {
    const response = await signIn(
      {
        email: values.email,
      },
      values.token
    );

    if (response?.success) {
      if (values.remember) {
        localStorage.setItem("synapsisRememberedMe", "true");
      } else {
        localStorage.removeItem("synapsisRememberedMe");
      }

      message.success(response.message);
      router.push("/dashboard");
    } else {
      message.error(response?.message);
    }
  };
  return (
    <div className=" p-6 rounded shadow-sm mb-8 max-w-xl h-[862px] w-[568px] ml-12">
      <div className="flex flex-col flex-1 justify-between h-full">
        <div className="relative flex flex-row gap-6">
          <Image
            src="/assets/icon.png"
            width={48}
            height={48}
            alt="BloX-logo-app"
            className="object-contain"
          />
          <h1 className="font-bold text-[32px] pt-2">BloX App</h1>
        </div>

        <div>
          <h2 className="text-[24px] font-semibold mb-4">Login</h2>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ type: "email", required: true }]}
            >
              <Input placeholder="Enter Your Email" />
            </Form.Item>

            <Form.Item label="Token" name="token" rules={[{ required: true }]}>
              <Input.Password placeholder="Input Your GO REST access token..." />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" label={null}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item className="w-full">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                style={{
                  background: "#D3D3D3",
                }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="flex flex-col items-center justify-center w-full
         text-gray-400 font-semibold">
          <h4 className="leading-[0px]">
            Copyright@2024 <span className="font-bold ">BloX App</span>
          </h4>
          <h4>All Rights Reserverd</h4>
          <h4>App version 1.0.0</h4>
        </div>
      </div>
    </div>
  );
};

export default page;
