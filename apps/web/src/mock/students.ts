import { mockClasses } from './classes';

const studentFirstNames = ["Emma","Liam","Olivia","Noah","Ava","Oliver","Isabella","Elijah","Sophia","William","Mia","James","Charlotte","Benjamin","Amelia","Lucas","Harper","Henry","Evelyn","Alexander"];
const studentLastNames = ["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez","Hernandez","Lopez","Gonzalez","Wilson","Anderson","Thomas","Taylor","Moore","Jackson","Martin"];
const parentNames = [["Priya","Sharma"],["Rohan","Patel"],["Vikram","Nair"],["Sneha","Kapoor"],["Arjun","Reddy"],["Kavya","Menon"],["Sanjay","Gupta"],["Leena","Das"],["Manish","Verma"],["Pooja","Joshi"],["Dev","Malhotra"],["Isha","Bose"]];

const randomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const birthYearForGrade = (grade: number) => 2026 - (grade + 5);

export const mockStudents = Array.from({ length: 500 }, (_, index) => {
  const cls = mockClasses[index % mockClasses.length];
  const first_name = randomItem(studentFirstNames);
  const last_name = randomItem(studentLastNames);
  const gender = randomItem(['MALE', 'FEMALE']);
  const [parentFirst, parentLast] = parentNames[index % parentNames.length];
  const grade = Number(cls.grade);
  const roll = Math.floor(index / mockClasses.length) + 1;

  return {
    id: `student-${String(index + 1).padStart(3, '0')}`,
    first_name,
    last_name,
    full_name: `${first_name} ${last_name}`,
    name: `${first_name} ${last_name}`,
    gender,
    status: 'ACTIVE',
    student_code: `STU${String(index + 1).padStart(4, '0')}`,
    admission_no: `ADM-2026-${String(index + 1).padStart(3, '0')}`,
    class_id: cls.id,
    roll_no: roll,
    roll_number: roll,
    section: cls.section,
    date_of_birth: `${birthYearForGrade(grade)}-${String((index % 9) + 1).padStart(2, '0')}-${String((index % 28) + 1).padStart(2, '0')}`,
    blood_group: ['A+', 'B+', 'O+', 'AB+'][index % 4],
    medical_conditions: index % 11 === 0 ? 'Mild dust allergy' : 'None',
    allergies: index % 13 === 0 ? 'Peanuts' : 'None',
    emergency_contact: `+91 99887 ${String(66000 + (index % 1000))}`,
    photo_url: `https://api.dicebear.com/8.x/initials/svg?seed=${first_name}-${last_name}`,
    attendance_rate: randomInt(75, 100),
    average_marks: randomInt(60, 98),
    class: { id: cls.id, name: cls.name, section: cls.section },
    parent_relations: [
      {
        relation: 'PARENT',
        parent: {
          id: `parent-${String(index + 1).padStart(3, '0')}`,
          first_name: parentFirst,
          last_name: parentLast,
          email: `${parentFirst.toLowerCase()}.${parentLast.toLowerCase()}${index + 1}@example.com`,
          phone: `+91 98765 ${String(42000 + (index % 1000))}`,
        },
      },
    ],
    // Pulse for UI details if needed
    pulse: [
      { name: 'Mon', attendance: 100, marks: randomInt(70, 100), participation: randomInt(70, 100) },
      { name: 'Tue', attendance: 100, marks: randomInt(70, 100), participation: randomInt(70, 100) },
      { name: 'Wed', attendance: randomInt(0, 1) * 100, marks: randomInt(70, 100), participation: randomInt(70, 100) },
      { name: 'Thu', attendance: 100, marks: randomInt(70, 100), participation: randomInt(70, 100) },
      { name: 'Fri', attendance: 100, marks: randomInt(70, 100), participation: randomInt(70, 100) },
    ]
  };
});
