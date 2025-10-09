package vn.edu.eiu.testlab.fecse456studentiddemo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import vn.edu.eiu.testlab.fecse456studentiddemo.model.Major;
import vn.edu.eiu.testlab.fecse456studentiddemo.model.Student;
import vn.edu.eiu.testlab.fecse456studentiddemo.model.User;
import vn.edu.eiu.testlab.fecse456studentiddemo.service.MajorService;
import vn.edu.eiu.testlab.fecse456studentiddemo.service.UserService;

/** Khi thêm data chú ý là phải thêm bảng 1 trước,
 * thêm bảng nhiều sau.
 * */
@Component
public class DataInitializer implements CommandLineRunner {
    //Tiêm service để thao tác dữ liệu
    @Autowired //tiêm bằng field (có 3 cách)
    MajorService majorServ;

    @Autowired
    UserService userServ;


    @Override
    public void run(String... args) throws Exception {
        //Tạo mới obj
        Major m1 = new Major("CSE - Kỹ Thuật Phần Mềm","Ngành kỹ thuật phần mềm");
        Major m2 = new Major("CSW - Mạng Và Truyền Thông Dữ Liệu","Ngành Mạng và truyền thông dữ liệu");
        Student s1m1 = new Student("st1m1","Ngô Nhất",2000,85);
        Student s2m1 = new Student("st2m1","Trương Nhị",2000,90);
        Student s3m1 = new Student("st3m1","Phan Tam",2001,85);
        Student s1m2 = new Student("st1m2","Lý Tứ",2002,95);
        Student s2m2 = new Student("st2m2","Phạm Ngũ",2001,75);

        //thêm student vào major
        m1.addStudent(s1m1);
        m1.addStudent(s2m1);
        m1.addStudent(s3m1);
        m2.addStudent(s1m2);
        m2.addStudent(s2m2);

        //Gọi service lưu database
        majorServ.saveMajor(m1);
        majorServ.saveMajor(m2);

        //Thêm mới user
        User admin = new User("admin","admin",1);
        User staff = new User("staff","staff",2);
        User student = new User("student","student",3);
        userServ.save(admin);
        userServ.save(staff);
        userServ.save(student);

    }
}
