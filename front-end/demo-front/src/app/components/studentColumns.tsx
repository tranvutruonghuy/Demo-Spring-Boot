"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Student } from "@/models/studentModel";
import { Button, Popconfirm, Space, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined, FormOutlined } from "@ant-design/icons";

interface ColumnCallbacks {
  onEdit: (student: Student) => void;
  onEditPageRoute: (student: Student) => void;
  onDelete: (id: number) => void;
}

export const getstudentColumns = ({
  onEdit,
  onEditPageRoute,
  onDelete,
}: ColumnCallbacks): ColumnDef<Student>[] => [
  {
    accessorKey: "index",
    header: "STT",
    size: 10,
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 50,
  },
  {
    accessorKey: "username",
    header: "Username",
    size: 50,
  },
  {
    accessorKey: "dob",
    header: "Date of birth",
    size: 50,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    size: 50,
    cell: ({ row }) => {
      const record = row.original;
      return (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa (Modal)">
            <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
          </Tooltip>
          <Tooltip title="Chỉnh sửa (Trang mới)">
            <Button
              icon={<FormOutlined />}
              onClick={() => onEditPageRoute(record)}
              type="default"
            />
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
      );
    },
  },
];
