/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DataService } from "@/services/DataService";
import { Student } from "@/models/studentModel";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Spin,
  message,
  Card,
  Typography,
} from "antd";
import { useTheme } from "@/contexts/ThemeContext";
import dayjs from "dayjs";
import styles from "./page.module.css";

const { Title } = Typography;

export default function EditStudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { theme } = useTheme();
  const router = useRouter();
  const [student, setStudent] = useState<Student>();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const resolvedParams = use(params);
  const studentId = resolvedParams.id;

  useEffect(() => {
    const fetchStudent = async () => {
      setIsLoading(true);
      try {
        const data = await DataService.getStudentById(studentId);
        setStudent(data);
        form.setFieldsValue({
          ...data,
          dob: data.dob ? dayjs(data.dob) : null,
        });
      } catch (error) {
        messageApi.error("Không tìm thấy thông tin sinh viên.");
        console.error("Failed to fetch student:", error);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudent();
  }, [studentId, router, form, messageApi]);

  const handleUpdate = async (values: any) => {
    if (!student) return;
    setIsUpdating(true);
    try {
      const updatedStudent = {
        ...student,
        ...values,
        dob: values.dob.format("YYYY-MM-DD"),
      };
      await DataService.updateStudent(updatedStudent);
      messageApi.success("Cập nhật thông tin sinh viên thành công!");
      router.push("/");
    } catch (error) {
      messageApi.error("Cập nhật thông tin thất bại!");
      console.error("Failed to update student:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className={`${styles.container} ${styles[theme]}`}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      {contextHolder}
      <Card className={styles.card}>
        <Title level={3}>Chỉnh sửa thông tin sinh viên</Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdate}
          initialValues={student}
        >
          <Form.Item name="name" label="Họ và tên" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="dob" label="Ngày sinh" rules={[{ required: true }]}>
            <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isUpdating}
              style={{ marginRight: 8 }}
            >
              Cập nhật
            </Button>
            <Button onClick={() => router.push("/")}>Hủy</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
