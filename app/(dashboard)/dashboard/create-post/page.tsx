"use client";
import FormReuse from "@/components/FormReuse";
import { createPost, getAllUser } from "@/lib/actions/data";
import { AppstoreOutlined } from "@ant-design/icons";
import { Breadcrumb, Divider, message } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

const userFields: FieldConfig<FieldTypeCreatePost>[] = [
  {
    name: "id",
    label: "User",
    type: "selectUser",
    rules: [{ required: true }],
  },
  {
    name: "title",
    label: "Title",
    type: "input",
    rules: [{ required: true }],
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    rules: [{ required: true }],
  },
];

const handleSubmit = async (values: FieldTypeCreatePost) => {
  const response = await createPost(values);
  if (response.success) {
    message.success(response.message);
    // window.location.reload();
  } else {
    message.error(response.message);
  }
};

const page = () => {
  const [dataUser, setdataUser] = useState<dataCust[]>([]);
  useEffect(() => {
    const getdata = async () => {
      const users = await getAllUser();
      setdataUser(users);
    };

    getdata();
  }, []);
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
              title: "Create Post",
            },
          ]}
        />
        <div className="flex flex-col">
          <h2 className="pt-12 text-lg font-semibold">Create Post</h2>
          <Divider
            style={{
              margin: "0.5px 0",
            }}
          />
        </div>
      </div>

      <div className="flex justify-start mt-6 flex-1 w-full">
        <FormReuse<FieldTypeCreatePost>
          fields={userFields}
          onFinish={handleSubmit}
          arrayUser={dataUser}
        />
      </div>
    </section>
  );
};

export default page;
