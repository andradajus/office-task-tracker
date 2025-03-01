export const AuthenticationAPI = {
  login: '/login',
  register: '/signup',
  forgotPassword: '/forgot-password',
};

export const UserAPI = {
  user: '/user',
  userAvailability: '/user/toggle_availability',
  index_students: '/user/index_students',
};

export const TimeAPI = {
  time_entries: '/time_entries',
};

export const OverviewAPI = {
  overview: '/overview',
};

export const TaskAPI = {
  tasks: '/tasks',
  taskCompleted: '/tasks/:id/complete_tasks',
  taskId: '/tasks/:id',
};

export const StaffAPI = {
  staff: '/staffs',
  staffId: '/staffs/:id',
};
