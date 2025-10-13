/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { UserTable } from "./components/UserTable";
import { ThemeToggleButton } from "./components/ThemeToggleButton";
import { useTheme } from "../contexts/ThemeContext";
import { DataService } from "@/services/DataService";
import { useEffect, useState } from "react";
import { Button, message } from "antd";
import { AddNewStudentModal } from "./components/AddNewStudentModal";
import { Student } from "@/models/studentModel";
import { EditUserModal } from "./components/EditUserModal";

export default function Home() {
  const { theme } = useTheme();
  const [data, setData] = useState<Student[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const style = {
    backgroundColor: theme === "light" ? "#fff" : "#333",
    color: theme === "light" ? "#000" : "#fff",
    minHeight: "100vh",
    padding: "2rem",
  };

  const getStudentData = async () => {
    setIsTableLoading(true);
    try {
      const response = await DataService.getStudentData();
      const studentsData: Student[] = response.map(
        (item: any, index: number) => ({
          index: index + 1,
          id: item.id,
          name: item.name,
          username: item.username,
          dob: item.dob,
        })
      );
      setData(studentsData);
    } catch (error) {
      if (error instanceof Error) {
        messageApi.error(error.message);
      } else {
        messageApi.error("Lỗi khi tải dữ liệu sinh viên!");
      }
      console.error("Error fetching student data:", error);
    } finally {
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    getStudentData();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleAddNewStudent = async (values: any) => {
    setIsSubmitting(true);
    try {
      await DataService.addNewStudent(values);
      setIsModalOpen(false);
      messageApi.open({
        type: "success",
        content: "Thêm sinh viên mới thành công!",
      });
      await getStudentData();
    } catch (error) {
      if (error instanceof Error) {
        messageApi.error(error.message);
      } else {
        messageApi.error("Thêm sinh viên mới thất bại!");
      }
      console.error("Failed to add new student:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (student: Student) => {
    console.log("Edit student:", student);
    setEditingStudent(student);
    setIsEditModalOpen(true);
  };

  const handleUpdateStudent = async (student: Student) => {
    setIsUpdating(true);
    try {
      await DataService.updateStudent(student);
      messageApi.success("Cập nhật thông tin sinh viên thành công!");
      await getStudentData();
      setIsEditModalOpen(false);
    } catch (error) {
      messageApi.error("Cập nhật thông tin thất bại!");
      console.error("Failed to update student:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = (studentId: number) => {
    console.log("Delete student with ID:", studentId);
    messageApi.info(
      `Chức năng xóa cho sinh viên ID "${studentId}" chưa được cài đặt.`
    );
  };

  return (
    <div style={style}>
      {contextHolder}
      <ThemeToggleButton />
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Thêm sinh viên mới
      </Button>
      <UserTable
        data={data}
        isLoading={isTableLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <AddNewStudentModal
        open={isModalOpen}
        onOk={handleAddNewStudent}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
      <EditUserModal
        open={isEditModalOpen}
        student={editingStudent}
        onOk={handleUpdateStudent}
        onCancel={() => setIsEditModalOpen(false)}
        isLoading={isUpdating}
      />
    </div>
  );
}
