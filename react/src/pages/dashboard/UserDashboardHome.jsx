import { useState, useEffect } from 'react';
import {
  CheckCircle,
  Circle,
  Clock,
  ListTodo,
  LogIn,
  LogOut,
} from 'lucide-react';
import { API } from '@/api/api';

const UserDashboardHome = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete project proposal', completed: false },
    { id: 2, text: 'Review client feedback', completed: false },
    { id: 3, text: 'Prepare for team meeting', completed: false },
    { id: 4, text: 'Update documentation', completed: true },
    { id: 5, text: 'Fix reported bugs', completed: false },
  ]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const pendingTasks = tasks.filter((task) => !task.completed);

  const toggleTaskStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const toggleCheckIn = async () => {
    try {
      await API.postTimeEntry();
      fetchOverview();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOverview = async () => {
    try {
      const response = await API.getOverview();
      const timeEntries = response.data.time_entries;
      console.log('timeEntries', timeEntries);

      const todayEntries = timeEntries.filter(
        (entry) =>
          new Date(entry.date).toDateString() === new Date().toDateString()
      );
      const latestTimeIn = todayEntries.find(
        (entry) => entry.status === 'time_in'
      );
      const latestTimeOut = todayEntries.find(
        (entry) => entry.status === 'time_out'
      );

      setIsCheckedIn(!!latestTimeIn && !latestTimeOut);
      setCheckInTime(
        latestTimeIn
          ? new Date(latestTimeIn.time).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })
          : null
      );
      setCheckOutTime(
        latestTimeOut
          ? new Date(latestTimeOut.time).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })
          : null
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  console.log('isCheckedIn', isCheckedIn);

  return (
    <div className="min-h-screen  p-4 md:p-8">
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
                  Task Summary
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
                {isCheckedIn ? 'Checked In' : 'Checked Out'}
              </h2>
              <div className="mb-4">
                {checkInTime && (
                  <p className="text-sm text-gray-600">
                    Check-in Time: {checkInTime}
                  </p>
                )}
                {checkOutTime && (
                  <p className="text-sm text-gray-600">
                    Check-out Time: {checkOutTime}
                  </p>
                )}
              </div>
              <button
                onClick={toggleCheckIn}
                className={`${
                  isCheckedIn
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-green-500 hover:bg-green-600'
                } text-black px-4 py-2 rounded-lg flex items-center gap-2 transition-colors w-full justify-center`}
              >
                {isCheckedIn ? (
                  <LogOut className="h-5 w-5" />
                ) : (
                  <LogIn className="h-5 w-5" />
                )}
                {isCheckedIn ? 'Check Out' : 'Check In'}
              </button>
            </div>
          </div>

          {/* Right Column - Task List */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <ListTodo className="h-6 w-6 text-blue-500" />
                <h2 className="font-semibold text-gray-700">My Daily Tasks</h2>
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
                      task.completed
                        ? 'bg-gray-50 border-gray-200'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleTaskStatus(task.id)}
                        className="focus:outline-none"
                      >
                        {task.completed ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : (
                          <Circle className="h-6 w-6 text-gray-400" />
                        )}
                      </button>
                      <span
                        className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
                      >
                        {task.text}
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

export default UserDashboardHome;
