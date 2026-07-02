export const PERMISSIONS = {
  // Students
  STUDENTS_VIEW: 'students.view',
  STUDENTS_CREATE: 'students.create',
  STUDENTS_EDIT: 'students.edit',
  STUDENTS_DELETE: 'students.delete',
  STUDENTS_EXPORT: 'students.export',
  STUDENTS_IMPORT: 'students.import',

  // Teachers
  TEACHERS_VIEW: 'teachers.view',
  TEACHERS_CREATE: 'teachers.create',
  TEACHERS_EDIT: 'teachers.edit',
  TEACHERS_DELETE: 'teachers.delete',

  // Attendance
  ATTENDANCE_VIEW: 'attendance.view',
  ATTENDANCE_MARK: 'attendance.mark',
  ATTENDANCE_EDIT: 'attendance.edit',

  // Fees/Finance
  FEES_VIEW: 'fees.view',
  FEES_CREATE: 'fees.create',
  FEES_EDIT: 'fees.edit',
  FEES_DELETE: 'fees.delete',

  // Library
  LIBRARY_VIEW: 'library.view',
  LIBRARY_CREATE: 'library.create',
  LIBRARY_EDIT: 'library.edit',
  LIBRARY_DELETE: 'library.delete',

  // Transport
  TRANSPORT_VIEW: 'transport.view',
  TRANSPORT_CREATE: 'transport.create',
  TRANSPORT_EDIT: 'transport.edit',
  TRANSPORT_DELETE: 'transport.delete',

  // HR / Payroll
  HR_VIEW: 'hr.view',
  HR_CREATE: 'hr.create',
  HR_EDIT: 'hr.edit',
  HR_DELETE: 'hr.delete',

  // Academic / Classes / Subjects
  ACADEMIC_VIEW: 'academic.view',
  ACADEMIC_CREATE: 'academic.create',
  ACADEMIC_EDIT: 'academic.edit',
  ACADEMIC_DELETE: 'academic.delete',

  // Reports
  REPORTS_VIEW: 'reports.view',

  // Settings
  SETTINGS_VIEW: 'settings.view',
  SETTINGS_EDIT: 'settings.edit',

  // Parents
  PARENTS_VIEW: 'parents.view',
  PARENTS_CREATE: 'parents.create',
  PARENTS_EDIT: 'parents.edit',
  PARENTS_DELETE: 'parents.delete',
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];
