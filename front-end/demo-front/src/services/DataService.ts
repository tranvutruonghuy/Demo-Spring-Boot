import { ApiResponse } from "@/models/apiResponseModel";
import { Student } from "@/models/studentModel";
import axios, { isAxiosError } from "axios";

export class DataService {
  static async getStudentData(): Promise<Student[]> {
    const url = "http://localhost:8080/identity/users";
    try {
      const response = await axios.get<ApiResponse<Student[]>>(url);
      if (response.status === 200 && response.data.code === 1000) {
        return response.data.result;
      }
      throw new Error(response.data.message || "Failed to fetch student data");
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Error fetching student data"
        );
      }
      throw new Error("Error fetching student data");
    }
  }

  static async addNewStudent(student: Omit<Student, "id">): Promise<Student> {
    const url = "http://localhost:8080/identity/users";
    try {
      const response = await axios.post<ApiResponse<Student>>(url, student);
      if (response.status === 200 && response.data.code === 1000) {
        return response.data.result;
      } else {
        throw new Error(response.data.message || "Failed to add new student");
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Failed to add student");
      }
      throw new Error("Failed to add new student");
    }
  }

  static async updateStudent(student: Student) {
    const url = `http://localhost:8080/identity/users/${student.id}`;
    try {
      await axios.put<ApiResponse<Student>>(url, student);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to update student"
        );
      }
      throw new Error("Failed to update student");
    }
  }
}
