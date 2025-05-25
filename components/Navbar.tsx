"use client";
import { signOut } from "@/lib/actions/auth";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps} from "antd";
import Image from "next/image";
import { useFormStatus } from "react-dom";

const LogOutButton = () => {
  const { pending } = useFormStatus();
  //   const storage = localStorage.getItem("synapsisRememberedMe");
  //   if (storage) localStorage.removeItem("synapsisRememberedMe");
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="bg-transparent text-red-500 hover:underline w-full text-left px-4 py-2"
        disabled={pending}
      >
        {pending ? "Signing out..." : "Log Out"}
      </button>
    </form>
  );
};

const items: MenuProps["items"] = [
  {
    label: <LogOutButton />,
    key: "0",
  },
];

const Navbar = ({ props }: { props: SessionData }) => {
  const { email, name } = props;
  return (
    <nav className="flex-1 h-[68px] top-0 left-0  border-gray-100 border-b-[1px]">
      <div className="w-full h-full flex flex-row items-center justify-between px-12">
        <div className="flex flex-row gap-2">
          <Image
            src="/assets/icon.png"
            width={28}
            height={28}
            alt="BloX-logo-app"
            className="object-contain"
          />
          <div className="flex flex-col leading-[0] justify-center gap-1 pt-1">
            <h1 className="font-bold text-[16px]">BloX App</h1>
            <h3 className="font-bold text-[5.28px]">
              part of Great Application{" "}
            </h3>
          </div>
        </div>

        <div className="flex flex-row gap-2 ">
          <Image
            src="/assets/icon.png"
            width={28}
            height={28}
            alt="BloX-logo-app"
            className="object-contain rounded-full"
          />
          <div className="relative flex flex-col leading-[0] justify-center gap-2 pt-1">
            <h2 className="text-[16px] text-start font-bold">{name}</h2>
            <h3 className="text-[12px] text-left">Superintendant</h3>
          </div>

          <Dropdown menu={{ items }} trigger={["click"]} className="pl-8 text-black">
            <a onClick={(e) => e.preventDefault()}>
              <DownOutlined className="" />
            </a>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
