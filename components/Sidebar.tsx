"use client";
import {
  AppstoreOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Divider, Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const path = usePathname();

  const selectedKey = path.includes("create-user")
    ? "create-user"
    : path.includes("create-post")
    ? "create-post"
    : "dashboard";

  const items = [
    {
      type: "group",
      label: <h2 className="font-bold text-black">Dashboard</h2>,
      children: [
        {
          key: "dashboard",
          icon: <AppstoreOutlined width={46} height={46}/>,
          label: <Link href="/dashboard">Dashboard</Link>,
        },
      ],
    },
    {
        label: <Divider />
    },
    {
      type: "group",
      label: <h2 className="font-bold text-black">Blog Management</h2>,
      children: [
        {
          key: "create-user",
          icon: <UserOutlined />,
          label: <Link href="/dashboard/create-user">Create User</Link>,
        },
        {
          key: "create-post",
          icon: <MessageOutlined />,
          label: <Link href="/dashboard/create-post">Create Post</Link>,
        },
      ],
    },
  ];

  return (
    <div className="w-[288px] h-[calc(100vh-68px)] px-3 pt-8">
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={items}
        className="border-none"
      />
    </div>
  );
};

export default Sidebar;
