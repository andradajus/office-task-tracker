import { useState, useEffect } from 'react';
import { CheckCircle, Circle, Clock, ListTodo } from 'lucide-react';
import { API } from '@/api/api';
import { appendBackendBaseUrl } from '@/lib/utils';
import OverviewChannel from '@/channels/overview_channel';
import { useWebSocket } from '@/context/WebSocketContext';

const AdminDashboardHome = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const { data } = useWebSocket();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const pendingTasks = tasks.filter((task) => !task.is_completed);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const fetchOverview = async () => {
    try {
      const response = await API.getOverview();
      setTasks(response.data.daily_tasks);
      setUsers(response.data.users_with_time_in);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOverview();

    const subscription = OverviewChannel;

    subscription.received = (data) => {
      console.log("Received data:", data);
      setTasks(data.daily_tasks || []);
      setUsers(data.users_with_time_in || []);
    };

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Time Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-700">
                  Current Time
                </h2>
              </div>
              <div className="text-4xl font-bold text-gray-800">
                {formatTime(currentTime)}
              </div>
              <div className="mt-2 text-gray-500">
                {currentTime.toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>

            {/* Task Stats */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <ListTodo className="h-6 w-6 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-700">
                  SA Task Summary
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-600 font-medium">
                    Pending Tasks
                  </p>
                  <p className="text-3xl font-bold text-blue-700">
                    {pendingTasks.length}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-600 font-medium">
                    Completed
                  </p>
                  <p className="text-3xl font-bold text-green-700">
                    {tasks.length - pendingTasks.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Add Task Form */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                SA On Duty
              </h2>
              <div className="space-y-2">
                {users?.length === 0 ? (
                  <p className="text-center text-gray-500">No SA on duty.</p>
                ) : (
                  users?.map((user) => (
                    <div
                      key={user.id}
                      className={`flex items-center gap-4 p-4 rounded-lg ${
                        user.is_available ? 'bg-green-500' : 'bg-orange-500'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-5">
                          <img
                            src={appendBackendBaseUrl(user.profile_photo_path)}
                            alt={user.first_name}
                            className="w-10 h-10 rounded-full"
                          />
                          <span className="text-white font-bold text-sm">
                            {user.first_name} {user.last_name}
                          </span>
                        </div>

                        {!user.is_available && ( 
                          <span className="text-xs text-white italic max-w-64 truncate">{user.away_remarks}</span>
                        )}

                        <div className="flex items-center gap-3">
                          <span className="text-white text-xs">
                            {user.is_available ? 'Available' : 'Busy/Away'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Task List */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <ListTodo className="h-6 w-6 text-blue-500" />
                <h2 className="font-semibold text-gray-700">SA Todays Tasks</h2>
              </div>
              <div className="text-sm text-gray-500">
                {pendingTasks.length} pending / {tasks.length} total
              </div>
            </div>

            {/* Task List */}
            <div className="space-y-3 max-h-[calc(100vh-16rem)] overflow-y-auto pr-2">
              {tasks.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No tasks yet. Add a task to get started!
                </p>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      task.is_completed
                        ? 'bg-gray-50 border-gray-200'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="focus:outline-none">
                        {task.is_completed ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : (
                          <Circle className="h-6 w-6 text-gray-400" />
                        )}
                      </span>
                      <span
                        className={`${task.is_completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
                      >
                        {task.task_name}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;