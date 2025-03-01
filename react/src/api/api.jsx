import axios from 'axios';
import Cookies from 'js-cookie';
import {
  AuthenticationAPI,
  UserAPI,
  TimeAPI,
  OverviewAPI,
  TaskAPI,
} from '../constants/endpoints';

const baseURL = import.meta.env.VITE_BACKEND_API_URL;

const api = async (endpoint, method, body, params, customHeaders = {}) => {
  const token = Cookies.get('Authorization');
  const isFormData = body instanceof FormData;

  console.log('api params with id', params);

  const url = endpoint.replace(/:\w+/g, (match) => {
    const key = match.slice(1);
    return params[key] || match;
  });

  const headers = {
    Authorization: `Bearer ${token}`,
    ...(isFormData
      ? { 'Content-Type': 'multipart/form-data' }
      : { 'Content-Type': 'application/json' }),
    ...customHeaders,
  };

  try {
    const response = await axios({
      method: method,
      url: `${baseURL}${url}`,
      headers: headers,
      data: body,
      params: params,
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error.response?.data;
  }
};

export const API = {
  // AUTHENTICATION API //
  login: (body) => api(AuthenticationAPI.login, 'post', body),
  register: (body) => api(AuthenticationAPI.register, 'post', body),
  // END AUTHENTICATION API //

  // USER API //
  currentUserDetails: () => api(UserAPI.user, 'get'),
  updateUserAvailability: () => api(UserAPI.userAvailability, 'post'),
  // END USER API //

  // TIME LOG API //
  postTimeEntry: () => api(TimeAPI.time_entries, 'post'),
  getMyTimeEntries: () => api(TimeAPI.time_entries, 'get'),
  // END TIME LOG API //

  // OVERVIEW API //
  getOverview: () => api(OverviewAPI.overview, 'get'),
  // END OVERVIEW API //

  // TASKS API //
  toggleStatusComplete: (id, body) => api(TaskAPI.taskCompleted, 'put', body, { id }),
  getTasks: () => api(TaskAPI.tasks, 'get'),
  // END TASKS API //
};
