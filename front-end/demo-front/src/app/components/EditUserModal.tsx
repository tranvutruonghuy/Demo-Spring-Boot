/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Student } from "@/models/studentModel";
import { DatePicker, Form, Input, Modal } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

interface EditUserModalProps {
  open: boolean;
  student: Student | null;
  onOk: (values: any) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export const EditUserModal = ({
  open,
  student,
  onOk,
  onCancel,
  isLoading,
}: EditUserModalProps) => {
  const [form] = Form.useForm();

  // Sử dụng useEffect để cập nhật giá trị cho form mỗi khi `student` thay đổi
  useEffect(() => {
    if (open && student) {
      form.setFieldsValue({
        ...student,
        // Chuyển đổi chuỗi ngày sinh thành đối tượng dayjs cho DatePicker
        dob: student.dob ? dayjs(student.dob) : null,
      });
    }
  }, [open, student, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedStudent = {
          ...values,
          id: student?.id,
          dob: values.dob ? values.dob.format("YYYY-MM-DD") : "",
        };
        onOk(updatedStudent);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title="Chỉnh sửa thông tin học sinh"
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={isLoading}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical" name="edit_student_form">
        <Form.Item
          name="name"
          label="Tên học sinh"
          rules={[{ required: true, message: "Vui lòng nhập tên học sinh!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          label="Tên đăng nhập"
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="dob" label="Ngày sinh">
          <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
