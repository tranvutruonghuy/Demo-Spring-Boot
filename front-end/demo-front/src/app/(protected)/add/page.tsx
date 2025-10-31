/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataService } from "@/services/DataService";
import {
  Form,
  Input,
  Button,
  DatePicker,
  message,
  Card,
  Typography,
} from "antd";
import styles from "./page.module.css";

const { Title } = Typography;

export default function AddStudentPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleCreate = async (values: any) => {
    setIsSubmitting(true);
    try {
      const newStudent = { ...values, dob: values.dob.format("YYYY-MM-DD") };
      await DataService.addNewStudent(newStudent);
      messageApi.success("Thêm sinh viên thành công!");
      router.push("/");
    } catch (error) {
      messageApi.error("Thêm sinh viên thất bại!");
      console.error("Failed to add student:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      {contextHolder}
      <Card className={styles.card}>
        <Title level={3}>Thêm sinh viên mới</Title>
        <Form form={form} layout="vertical" onFinish={handleCreate}>
          <Form.Item name="name" label="Họ và tên" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[
              { required: true },
              { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự" },
            ]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true },
              { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự" },
            ]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item name="dob" label="Ngày sinh" rules={[{ required: true }]}>
            <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              style={{ marginRight: 8 }}
            >
              Thêm mới
            </Button>
            <Button onClick={() => router.push("/")}>Hủy</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
