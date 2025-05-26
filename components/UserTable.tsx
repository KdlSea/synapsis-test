"use client";

import {
  Table,
  Input,
  Select,
  Dropdown,
  Button,
  message,
  Popconfirm,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { MoreOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { deleteUserById, getUserMockData } from "@/lib/actions/data";

const { Option } = Select;

const UserTable = () => {
  const [data, setData] = useState<dataCust[]>([]);
  const [filteredGender, setFilteredGender] = useState<string>();
  const [filteredStatus, setFilteredStatus] = useState<string>();
  const [searchName, setSearchName] = useState<string>("");

  const [loading, setLoading] = useState(true);

  // Fetch 100 users on mount
  useEffect(() => {
    const fetchData = async () => {
      const dataFetch = await getUserMockData();
      if (dataFetch) console.log(setLoading(!loading));
      setData(dataFetch);
    };

    fetchData();
  }, []);

  // Filtered client-side
  const filteredData = data.filter((user) => {
    return (
      (!filteredGender || user.gender === filteredGender.toLowerCase()) &&
      (!filteredStatus || user.status === filteredStatus.toLowerCase()) &&
      (!searchName ||
        user.name?.toLowerCase().includes(searchName.toLowerCase()))
    );
  });

  const handleDelete = async (id: string, name: string) => {
    setLoading(true);
    const result = await deleteUserById(id, name);

    if (result.success) {
      message.success(result.message);
      // Refetch data
      const refreshed = await getUserMockData();
      setData(refreshed);
    } else {
      message.error(result.message);
    }

    setLoading(false);
  };

  const columns: ColumnsType<dataCust> = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
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
      filters: [
        { text: "Male", value: "male" },
        { text: "Female", value: "female" },
      ],
      onFilter: (value, record) => record.gender === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "inactive" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              { key: "1", label: "Edit" },
              {
                key: "delete",
                label: (
                  <Popconfirm
                    title={`are you sure want to delete ${record.name} ?`}
                    onConfirm={() => handleDelete(record.id!, record.name!)}
                  >
                    <span className="text-red-500">Delete</span>
                  </Popconfirm>
                ),
              },
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
      {/* Filters */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <label className="font-medium">Filter</label>
          <Select
            placeholder="Gender"
            allowClear
            onChange={(value) => setFilteredGender(value)}
            style={{ width: 120 }}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
          <Select
            placeholder="Status"
            allowClear
            onChange={(value) => setFilteredStatus(value)}
            style={{ width: 120 }}
          >
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </div>

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
        loading={loading}
      />
    </div>
  );
};

export default UserTable;
