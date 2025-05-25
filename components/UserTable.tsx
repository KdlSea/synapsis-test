"use client";

import { Table, Input, Select, Dropdown, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { MoreOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Option } = Select;

interface UserData {
  id: string;
  name: string;
  email: string;
  gender: "Male" | "Female";
  status: "Active" | "Inactive";
}

const mockData: UserData[] = Array.from({ length: 32 }, (_, index) => ({
  id: `#12345${index}`,
  name: "Nufik",
  email: "nufik.emailforall@gmail.com",
  gender: "Male",
  status: "Active",
}));

const UserTable = () => {
  const [filteredGender, setFilteredGender] = useState<string>();
  const [filteredStatus, setFilteredStatus] = useState<string>();
  const [searchName, setSearchName] = useState<string>("");

  const filteredData = mockData.filter((item) => {
    return (
      (!filteredGender || item.gender === filteredGender) &&
      (!filteredStatus || item.status === filteredStatus) &&
      (!searchName ||
        item.name.toLowerCase().includes(searchName.toLowerCase()))
    );
  });

  const columns: ColumnsType<UserData> = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      sorter: (a, b) => a.gender.localeCompare(b.gender),
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <Dropdown
          menu={{
            items: [
              { key: "1", label: "Edit" },
              { key: "2", label: "Delete" },
            ],
          }}
          trigger={["click"]}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <label className="font-medium">Filter</label>
          <Select
            placeholder="Gender"
            allowClear
            onChange={(value) => setFilteredGender(value)}
            style={{ width: 120 }}
          >
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
          <Select
            placeholder="Status"
            allowClear
            onChange={(value) => setFilteredStatus(value)}
            style={{ width: 120 }}
          >
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
          </Select>
        </div>

        {/* Search */}
        <Input.Search
          placeholder="Search name"
          allowClear
          style={{ width: 200 }}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default UserTable;
