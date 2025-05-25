import React from "react";
import { Form, Input, Checkbox, Button, Select } from "antd";
import type { FormProps } from "antd";
import TextArea from "antd/es/input/TextArea";

type FieldType =
  | "input"
  | "selectGender"
  | "selectStatus"
  | "text"
  | "selectUser";

interface FieldConfig<T> {
  name: keyof T;
  label?: string;
  type?: FieldType;
  rules?: any[];
  valuePropName?: string;
}

interface GenericFormProps<T> {
  fields: FieldConfig<T>[];
  initialValues?: Partial<T>;
  onFinish: FormProps<T>["onFinish"];
  onFinishFailed?: FormProps<T>["onFinishFailed"];
  submitText?: string;
  arrayUser?: dataCust[];
}
const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};
const FormReuse = <T extends object>({
  fields,
  initialValues,
  onFinish,
  onFinishFailed,
  submitText = "Submit",
  arrayUser,
}: GenericFormProps<T>) => {
  // const [form] = Form.useForm();
  // const onReset = () => {
  //   form.resetFields();
  // };
  return (
    <Form<T>
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="w-full"
      layout="vertical"
    >
      {fields.map((field) => {
        let inputNode: React.ReactNode = <Input />;

        if (field.type === "selectGender") {
          inputNode = (
            <Select
              placeholder="select gender"
              onChange={handleChange}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            />
          );
        } else if (field.type === "selectStatus") {
          inputNode = (
            <Select
              placeholder="select status"
              onChange={handleChange}
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "InActive" },
              ]}
            />
          );
        } else if (field.type === "text") {
          inputNode = <TextArea rows={4} />;
        } else if (field.type === "selectUser") {
          inputNode = (
            <Select
              placeholder="select status"
              onChange={handleChange}
              options={arrayUser?.map((data) => ({
                label: data.name,
                value: data.id,
              }))}
            />
          );
        }

        return (
          <Form.Item
            key={String(field.name)}
            name={field.name as string}
            label={field.label}
            valuePropName={field.valuePropName}
            rules={field.rules}
          >
            {inputNode}
          </Form.Item>
        );
      })}

      <Form.Item label={null} className="w-full">
        <Button
          type="primary"
          htmlType="submit"
          style={{ background: "#59A1A5" }}
          className="w-full"
        >
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormReuse;
