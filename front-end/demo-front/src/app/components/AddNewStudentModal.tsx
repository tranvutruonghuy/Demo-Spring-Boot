/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Modal, Form, Input, DatePicker } from "antd";
import dayjs from "dayjs";

interface StudentFormValues {
  name: string;
  username: string;
  password?: string;
  dob?: dayjs.Dayjs;
}

interface AddNewStudentModalProps {
  open: boolean;
  onOk: (values: StudentFormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const AddNewStudentModal = ({
  open,
  onOk,
  onCancel,
  isSubmitting,
}: AddNewStudentModalProps) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formattedValues = {
        ...values,
        // Format date to YYYY-MM-DD string if it exists
        dob: values.dob ? values.dob.format("YYYY-MM-DD") : undefined,
      };
      await onOk(formattedValues);
      form.resetFields();
    } catch (info) {
      console.log("Validate Failed:", info);
    }
  };

  return (
    <Modal
      title="Thêm sinh viên mới"
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Thêm"
      okButtonProps={{ loading: isSubmitting }}
      destroyOnHidden
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical" name="form_in_modal">
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
          rules={[
            { required: true, message: "Vui lòng nhập tên đăng nhập!" },
            { min: 3, message: "Tên đăng nhập phải có ít nhất 3 ký tự!" },
            { max: 20, message: "Tên đăng nhập không được vượt quá 20 ký tự!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="dob"
          label="Ngày sinh"
          rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
        >
          <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
