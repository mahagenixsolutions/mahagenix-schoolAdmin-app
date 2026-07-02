import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { mockUsers } from '../mock/users';

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  school_id?: string;
  avatar_url?: string;
}

interface Student {
  id: string;
  first_name: string;
  last_name: string;
  student_code: string;
  admission_no: string;
  photo_url?: string;
  class?: { id: string; name: string; section: string };
  blood_group?: string;
  medical_conditions?: string;
  allergies?: string;
  emergency_contact?: string;
}

interface AuthState {
  user: User | null;
  access_token: string | null;
  refresh_token: string | null;
  is_authenticated: boolean;
  selected_student: Student | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('edutrack_user') || JSON.stringify(mockUsers.admin)),
  access_token: localStorage.getItem('edutrack_token') || 'mock-access-token',
  refresh_token: localStorage.getItem('edutrack_refresh_token') || 'mock-refresh-token',
  is_authenticated: true,
  selected_student: JSON.parse(localStorage.getItem('edutrack_selected_student') || 'null'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: User; access_token: string; refresh_token: string }>) {
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.is_authenticated = true;
      localStorage.setItem('edutrack_token', action.payload.access_token);
      localStorage.setItem('edutrack_refresh_token', action.payload.refresh_token);
      localStorage.setItem('edutrack_user', JSON.stringify(action.payload.user));
    },
    setSelectedStudent(state, action: PayloadAction<Student | null>) {
      state.selected_student = action.payload;
      if (action.payload) {
        localStorage.setItem('edutrack_selected_student', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('edutrack_selected_student');
      }
    },
    updateTokens(state, action: PayloadAction<{ access_token: string; refresh_token: string }>) {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      localStorage.setItem('edutrack_token', action.payload.access_token);
      localStorage.setItem('edutrack_refresh_token', action.payload.refresh_token);
    },
    logout(state) {
      state.user = mockUsers.admin;
      state.access_token = 'mock-access-token';
      state.refresh_token = 'mock-refresh-token';
      state.is_authenticated = true;
      state.selected_student = null;
      localStorage.setItem('edutrack_token', 'mock-access-token');
      localStorage.setItem('edutrack_refresh_token', 'mock-refresh-token');
      localStorage.setItem('edutrack_user', JSON.stringify(mockUsers.admin));
      localStorage.removeItem('edutrack_selected_student');
    },
    switchMockRole(state, action: PayloadAction<string>) {
      let user: any;
      if (action.payload === 'TEACHER') {
        user = mockUsers.teacher;
      } else if (action.payload === 'PARENT') {
        user = mockUsers.parent;
      } else if (action.payload === 'STUDENT') {
        user = (mockUsers as any).student;
      } else if (action.payload === 'SCHOOL_ADMIN') {
        user = mockUsers.admin;
      } else {
        // Create a generic mock user for the selected role
        user = {
          ...mockUsers.admin,
          role: action.payload,
          first_name: 'Mock',
          last_name: action.payload,
          email: `${action.payload.toLowerCase()}@school.edu`,
        };
      }
      
      state.user = user;
      state.access_token = 'mock-access-token';
      state.refresh_token = 'mock-refresh-token';
      state.is_authenticated = true;
      if (action.payload === 'STUDENT') {
        state.selected_student = {
          id: 'student-001',
          first_name: 'Aanya',
          last_name: 'Sharma',
          student_code: 'STU0001',
          admission_no: 'ADM-2026-001',
          photo_url: 'https://api.dicebear.com/8.x/initials/svg?seed=Aanya-Sharma',
          class: { id: 'class-1-a', name: 'Class 1', section: 'A' },
          blood_group: 'A+',
          medical_conditions: 'None',
          allergies: 'None',
          emergency_contact: '+91 99887 66000'
        };
        localStorage.setItem('edutrack_selected_student', JSON.stringify(state.selected_student));
      } else {
        state.selected_student = null;
        localStorage.removeItem('edutrack_selected_student');
      }
      localStorage.setItem('edutrack_token', 'mock-access-token');
      localStorage.setItem('edutrack_refresh_token', 'mock-refresh-token');
      localStorage.setItem('edutrack_user', JSON.stringify(user));
    },
  },
});

export const { setCredentials, setSelectedStudent, updateTokens, logout, switchMockRole } = authSlice.actions;
export default authSlice.reducer;
