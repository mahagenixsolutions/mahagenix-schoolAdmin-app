export const mockRoster = [
  { id: 'S001', name: 'Aanya Sharma', roll: 1, attendance: 'present', marks: { quiz1: 85, midterm: 88 }, remark: 'Excellent participation' },
  { id: 'S002', name: 'Aarush Menon', roll: 2, attendance: 'present', marks: { quiz1: 72, midterm: 65 }, remark: '' },
  { id: 'S003', name: 'Ira Nair', roll: 3, attendance: 'absent', marks: { quiz1: 90, midterm: 92 }, remark: 'Needs to submit assignment' },
  { id: 'S004', name: 'Reyansh Kapoor', roll: 4, attendance: 'late', marks: { quiz1: 65, midterm: 70 }, remark: 'Improving steadily' },
  { id: 'S005', name: 'Saanvi Reddy', roll: 5, attendance: 'present', marks: { quiz1: 95, midterm: 98 }, remark: '' },
  { id: 'S006', name: 'Kabir Das', roll: 6, attendance: 'present', marks: { quiz1: 78, midterm: 80 }, remark: '' },
  { id: 'S007', name: 'Diya Singh', roll: 7, attendance: 'present', marks: { quiz1: 88, midterm: 85 }, remark: 'Great leadership skills' },
  { id: 'S008', name: 'Arjun Patel', roll: 8, attendance: 'absent', marks: { quiz1: 55, midterm: 60 }, remark: 'Please schedule parent meeting' },
];

export const mockAiSuggestions = [
  { id: 1, type: 'warning', text: 'You haven\'t marked attendance for Class 8 Science yet.' },
  { id: 2, type: 'info', text: '3 students have pending homework submissions.' },
  { id: 3, type: 'success', text: 'Arjun Patel\'s midterm marks improved by 15%!' },
];

export const mockSchedule = [
  { time: '08:00 AM', label: 'Class 8 Science', room: 'Lab 2', status: 'completed' },
  { time: '09:30 AM', label: 'Class 9 Physics', room: 'Room 104', status: 'active' },
  { time: '11:00 AM', label: 'Staff Meeting', room: 'Conference A', status: 'upcoming' },
  { time: '01:00 PM', label: 'Class 10 Chem', room: 'Lab 1', status: 'upcoming' },
];

export const mockPendingTasks = [
  { id: 1, text: 'Submit Midterm Grades', completed: false },
  { id: 2, text: 'Review Science Fair Proposals', completed: false },
  { id: 3, text: 'Respond to Mrs. Sharma\'s message', completed: true },
  { id: 4, text: 'Approve leave request for Reyansh', completed: false },
];

export const mockRecentUpdates = [
  { id: 1, time: '10 mins ago', text: 'Assigned "Star Coder" badge to Aanya Sharma' },
  { id: 2, time: '1 hour ago', text: 'Saved marks draft for Class 8 Science' },
  { id: 3, time: '2 hours ago', text: 'Marked Class 10 Chem attendance (100% present)' },
];
