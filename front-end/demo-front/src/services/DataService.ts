import { Student } from "@/models/studentModel";
import axios from "axios";

export class DataService {
  static async getFootballData() {
    const url = "https://open.er-api.com/v6/latest/USD";
    const result = await axios.get(url);
    if (result.status === 200) {
      return result.data;
    }
  }

  static async getStudentData() {
    const url = "http://localhost:8080/identity/users";
    const result = await axios.get(url);
    if (result.status === 200) {
      return result.data;
    }
  }

  static async addNewStudent(student: Omit<Student, "id">) {
    const url = "http://localhost:8080/identity/users";
    const result = await axios.post(url, student);
    if (result.status === 200) {
      return result.data;
    }
  }
}
