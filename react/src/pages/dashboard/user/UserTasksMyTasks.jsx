import { useState, useEffect } from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { API } from '@/api/api';

const UserTasksMyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const date = new Date();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await API.getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskStatus = async (id) => {
    try {
      const task = tasks.find((task) => task.id === id);
      const updatedTask = {
        ...task,
        is_completed: !task.is_completed,
        date_completed: !task.is_completed
          ? new Date().toISOString().split('T')[0]
          : null,
        completed_by: !task.is_completed
          ? `${task.assigned_to.split(' ')[1]}, ${task.assigned_to.split(' ')[0]}`
          : null,
      };

      const response = await API.updateTask(id, updatedTask);

      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">Loading...</div>
    );
  }

  return (
    <>
      <span className="font-bold text-center px-5 py-4 text-3xl">
        My Tasks today - {date.toLocaleDateString()}
      </span>
      <div className="overflow-x-auto p-7">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks today.</p>
        ) : (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Task
                </th>
                <th scope="col" className="px-6 py-3">
                  Assigned to
                </th>
                <th scope="col" className="px-6 py-3">
                  Assigned by
                </th>
                <th scope="col" className="px-6 py-3">
                  Date Completed
                </th>
                <th scope="col" className="px-6 py-3">
                  Completed By
                </th>
                <th scope="col" className="px-6 py-3">
                  Remarks
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {task.is_completed ? (
                      <CheckCircle className="inline-block w-4 h-4 mr-2 text-green-500" />
                    ) : (
                      <Circle className="inline-block w-4 h-4 mr-2 text-gray-400" />
                    )}
                    {task.task_name}
                  </td>
                  <td className="px-6 py-4">{task.assigned_to}</td>
                  <td className="px-6 py-4">{task.assigned_by}</td>
                  <td className="px-6 py-4">{task.date_completed || '-'}</td>
                  <td className="px-6 py-4">{task.completed_by || '-'}</td>
                  <td className="px-6 py-4">{task.remarks}</td>
                  <td className="px-6 py-4">
                    <Button
                      onClick={() => toggleTaskStatus(task.id)}
                      size="sm"
                      variant="outline"
                    >
                      {task.is_completed ? 'Reopen' : 'Complete'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default UserTasksMyTasks;
