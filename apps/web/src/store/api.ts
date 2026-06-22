import { createApi } from '@reduxjs/toolkit/query/react';
import { mockBaseQuery } from '../mock/mockBaseQuery';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: mockBaseQuery,
  tagTypes: [
    'Auth', 'School', 'AcademicYear', 'Class', 'Subject',
    'Student', 'Attendance', 'Mark', 'Exam', 'Progress',
    'Participation', 'Notification', 'Analytics', 'AuditLog', 'User', 'TeacherProfile', 'Fee',
  ],
  endpoints: () => ({}),
});
