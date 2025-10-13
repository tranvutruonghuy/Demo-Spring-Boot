/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Student } from "@/models/studentModel";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";

interface UserTableProps {
  data: Student[];
  isLoading: boolean;
  onEdit: (student: Student) => void;
  onDelete: (studentId: number) => void;
}

export const UserTable = ({
  data,
  isLoading,
  onEdit,
  onDelete,
}: UserTableProps) => {
  const columns: ColumnsType<Student> = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: "5%",
    },
    {
      title: "Tên học sinh",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      width: "10%",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa">
            <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Bạn có chắc muốn xóa?"
              onConfirm={() => onDelete(record.id)}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={isLoading}
      rowKey="id"
    />
  );
};
