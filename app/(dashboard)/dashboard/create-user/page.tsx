"use client";
import FormReuse from "@/components/FormReuse";
import { createUser } from "@/lib/actions/data";
import { AppstoreOutlined } from "@ant-design/icons";
import { Breadcrumb, Divider, message } from "antd";
import Link from "next/link";

const userFields: FieldConfig<dataCust>[] = [
  { name: "name", label: "Name", type: "input", rules: [{ required: true }] },
  {
    name: "gender",
    label: "Gender",
    type: "selectGender",
    rules: [{ required: true }],
  },
  {
    name: "email",
    label: "Email",
    type: "input",
    rules: [{ type: "email", required: true }],
  },
  {
    name: "status",
    label: "Status",
    type: "selectStatus",
    rules: [{ required: true }],
  },
];
const handleSubmit = async (values: dataCust) => {
  const response = await createUser(values);
  console.log(response);
  if (response.success) {
    message.success(response.message);
    // window.location.reload();
  } else {
    message.error(response.message);
  }
};
const page = () => {
  return (
    <section className="relative flex flex-col  mr-12 ml-6 flex-1 gap-0 leading-none ">
      <div className="flex flex-col">
        <h1 className="font-bold text-xl leading-[0px] pt-8">
          Blog Management
        </h1>
        <Breadcrumb
          style={{ margin: "1px 0" }}
          items={[
            {
              title: (
                <>
                  <AppstoreOutlined />
                  <Link href="/dashboard" className="text-blue-500">
                    Dashboard
                  </Link>
                </>
              ),
            },
            {
              title: "Create User",
            },
          ]}
        />
        <div className="flex flex-col">
          <h2 className="pt-12 text-lg font-semibold">Create user</h2>
          <Divider
            style={{
              margin: "0.5px 0",
            }}
          />
        </div>
      </div>

      <div className="flex justify-start mt-6 flex-1 w-full">
        <FormReuse<dataCust> fields={userFields} onFinish={handleSubmit} />
      </div>
    </section>
  );
};

export default page;
