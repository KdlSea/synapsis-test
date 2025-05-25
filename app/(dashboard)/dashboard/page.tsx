"use client";
import CardDashboard from "@/components/CardDashboard";
import ChartSection from "@/components/ChartSection";
import UserTable from "@/components/UserTable";
import { getAllPosts, getAllUser } from "@/lib/actions/data";
import { AppstoreOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { useEffect, useState } from "react";

const cardTop: CardType[] = [
  {
    type: "totalUser",
    title: "Total User",
  },
  {
    type: "totalPost",
    title: "Total Post",
  },
  {
    type: "userStatus",
    title: "User Status (active/non)",
  },
  {
    type: "userGender",
    title: "User Gender (m/f)",
  },
];

const filterUser = (data: dataCust) => {
  const count = data.filter((user) => user.gender).length - 1;
  const male = data.filter((user) => user.gender === "male").length;
  const female = count - male;

  console.log(male, female);
  return `${male}/${female}`;
};

const page = () => {
  // const [userAllPost, setuserAllPost] = useState<dataPost[]>([]);
  const [cardValues, setCardValues] = useState<Record<string, string>>({});
  useEffect(() => {
    const fetchData = async () => {
      const users = await getAllUser();
      const posts = await getAllPosts();
      const userGender = `${
        users.filter((user) => user.gender === "male").length
      }/${users.filter((user) => user.gender === "female").length}`;
      const totalUser = users.length;
      const totalPost = posts.length;
      const userStatus = `${
        users.filter((user) => user.status === "active").length
      }/${users.filter((user) => user.status === "inactive").length}`;
      setCardValues({
        totalUser,
        totalPost,
        userGender,
        userStatus,
      });
    };

    fetchData();
  }, []);

  return (
    <div className="flex-1">
      <div className="relative flex flex-col  mr-12 ml-6 flex-1 gap-12 leading-none ">
        <div className="flex flex-col">
          <h1 className="font-bold text-xl leading-[0px] pt-8">Dashboard</h1>
          <Breadcrumb
            style={{ margin: "1px 0" }}
            items={[
              {
                title: (
                  <>
                    <AppstoreOutlined />
                    Dashboard
                  </>
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col flex-1 h-[142px] gap6">
          <h2 className="font-semibold text-lg">Statistic</h2>

          <div className="flex flex-row flex-1 justify-between items-center gap-6">
            {cardTop.map((data) => (
              <CardDashboard
                key={data.title}
                contentType={data}
                totalData={cardValues[data.type] || "..."}
              />
            ))}
          </div>

          <ChartSection />

          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default page;
