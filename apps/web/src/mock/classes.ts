import { classTeachers } from './users';

export const mockClasses = Array.from({ length: 12 }, (_, index) => {
  const grade = index + 1;
  const [teacher_id, firstName, lastName] = classTeachers[index];
  const attendance = 89 + ((grade * 3) % 9);
  const performance = 76 + ((grade * 4) % 18);

  return {
    id: `class-${grade}-a`,
    grade: String(grade),
    name: `Class ${grade}`,
    section: 'A',
    teacher_id,
    teacher: `${firstName} ${lastName}`,
    students: 6,
    sections: 'A',
    attendance: `${attendance}%`,
    performance: `${performance}%`,
  };
});
