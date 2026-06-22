import { mockClasses } from './classes';

const studentNames = [
  ['Aanya', 'Sharma', 'FEMALE'], ['Vivaan', 'Patel', 'MALE'], ['Ira', 'Nair', 'FEMALE'], ['Reyansh', 'Kapoor', 'MALE'], ['Saanvi', 'Reddy', 'FEMALE'], ['Aarush', 'Menon', 'MALE'],
  ['Diya', 'Verma', 'FEMALE'], ['Kabir', 'Joshi', 'MALE'], ['Anika', 'Malhotra', 'FEMALE'], ['Arnav', 'Bose', 'MALE'], ['Tara', 'Saxena', 'FEMALE'], ['Ishaan', 'Kulkarni', 'MALE'],
  ['Mira', 'Chatterjee', 'FEMALE'], ['Neil', 'Pillai', 'MALE'], ['Kiara', 'Das', 'FEMALE'], ['Advait', 'Gupta', 'MALE'], ['Riya', 'Sethi', 'FEMALE'], ['Dhruv', 'Bhatia', 'MALE'],
  ['Avni', 'Agarwal', 'FEMALE'], ['Rudra', 'Mishra', 'MALE'], ['Naina', 'Rao', 'FEMALE'], ['Yuvraj', 'Khan', 'MALE'], ['Zara', 'Sheikh', 'FEMALE'], ['Om', 'Trivedi', 'MALE'],
  ['Pari', 'Sinha', 'FEMALE'], ['Atharv', 'Jain', 'MALE'], ['Siya', 'Mehta', 'FEMALE'], ['Aryan', 'Nanda', 'MALE'], ['Meher', 'Arora', 'FEMALE'], ['Laksh', 'Bajaj', 'MALE'],
  ['Navya', 'Bansal', 'FEMALE'], ['Shaurya', 'Chopra', 'MALE'], ['Aditi', 'Dutta', 'FEMALE'], ['Vihaan', 'Gill', 'MALE'], ['Myra', 'Lal', 'FEMALE'], ['Kian', 'Madan', 'MALE'],
  ['Anvi', 'Pandey', 'FEMALE'], ['Rian', 'Prasad', 'MALE'], ['Inaya', 'Roy', 'FEMALE'], ['Dev', 'Saxena', 'MALE'], ['Sara', 'Talwar', 'FEMALE'], ['Krish', 'Walia', 'MALE'],
  ['Tia', 'Yadav', 'FEMALE'], ['Ahaan', 'Bhatt', 'MALE'], ['Jiya', 'Chauhan', 'FEMALE'], ['Eshan', 'Grover', 'MALE'], ['Lavanya', 'Hegde', 'FEMALE'], ['Manav', 'Luthra', 'MALE'],
  ['Prisha', 'Narayan', 'FEMALE'], ['Raghav', 'Oberoi', 'MALE'], ['Samaira', 'Qureshi', 'FEMALE'], ['Ved', 'Raman', 'MALE'], ['Tanvi', 'Suresh', 'FEMALE'], ['Hriday', 'Thakur', 'MALE'],
  ['Aarohi', 'Vyas', 'FEMALE'], ['Kabir', 'Anand', 'MALE'], ['Ishita', 'Bora', 'FEMALE'], ['Aditya', 'Chandra', 'MALE'], ['Mahi', 'Deol', 'FEMALE'], ['Nivaan', 'Eapen', 'MALE'],
  ['Shreya', 'Ghosh', 'FEMALE'], ['Arjun', 'Hari', 'MALE'], ['Pihu', 'Iyengar', 'FEMALE'], ['Rohan', 'Juneja', 'MALE'], ['Kavya', 'Kohli', 'FEMALE'], ['Veer', 'Lamba', 'MALE'],
  ['Isha', 'Mathur', 'FEMALE'], ['Samar', 'Naidu', 'MALE'], ['Ananya', 'Pathak', 'FEMALE'], ['Nikhil', 'Rastogi', 'MALE'], ['Manya', 'Sabharwal', 'FEMALE'], ['Ayaan', 'Tandon', 'MALE'],
];

const parentNames = [
  ['Priya', 'Sharma'], ['Rohan', 'Patel'], ['Vikram', 'Nair'], ['Sneha', 'Kapoor'], ['Arjun', 'Reddy'], ['Kavya', 'Menon'],
  ['Sanjay', 'Gupta'], ['Leena', 'Das'], ['Manish', 'Verma'], ['Pooja', 'Joshi'], ['Dev', 'Malhotra'], ['Isha', 'Bose'],
];

const birthYearForGrade = (grade: number) => 2026 - (grade + 5);

export const mockStudents = mockClasses.flatMap((cls, classIndex) =>
  Array.from({ length: 6 }, (_, studentIndex) => {
    const globalIndex = classIndex * 6 + studentIndex;
    const [first_name, last_name, gender] = studentNames[globalIndex];
    const [parentFirst, parentLast] = parentNames[globalIndex % parentNames.length];
    const roll = studentIndex + 1;
    const grade = Number(cls.grade);

    return {
      id: `student-${String(globalIndex + 1).padStart(3, '0')}`,
      first_name,
      last_name,
      full_name: `${first_name} ${last_name}`,
      name: `${first_name} ${last_name}`,
      gender,
      status: 'ACTIVE',
      student_code: `STU${String(globalIndex + 1).padStart(4, '0')}`,
      admission_no: `ADM-2026-${String(globalIndex + 1).padStart(3, '0')}`,
      class_id: cls.id,
      roll_no: roll,
      roll_number: roll,
      section: cls.section,
      date_of_birth: `${birthYearForGrade(grade)}-${String((studentIndex % 9) + 1).padStart(2, '0')}-${String(10 + studentIndex).padStart(2, '0')}`,
      blood_group: ['A+', 'B+', 'O+', 'AB+'][globalIndex % 4],
      medical_conditions: globalIndex % 11 === 0 ? 'Mild dust allergy' : 'None',
      allergies: globalIndex % 13 === 0 ? 'Peanuts' : 'None',
      emergency_contact: `+91 99887 ${String(66000 + globalIndex)}`,
      photo_url: `https://api.dicebear.com/8.x/initials/svg?seed=${first_name}-${last_name}`,
      attendance_rate: 82 + ((globalIndex * 5) % 17),
      average_marks: 68 + ((globalIndex * 7) % 28),
      class: { id: cls.id, name: cls.name, section: cls.section },
      parent_relations: [
        {
          relation: 'PARENT',
          parent: {
            id: `parent-${String(globalIndex + 1).padStart(3, '0')}`,
            first_name: parentFirst,
            last_name: parentLast,
            email: `${parentFirst.toLowerCase()}.${parentLast.toLowerCase()}${globalIndex + 1}@example.com`,
            phone: `+91 98765 ${String(42000 + globalIndex)}`,
          },
        },
      ],
    };
  }),
);
