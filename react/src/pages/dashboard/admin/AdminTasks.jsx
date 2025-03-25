import { useState, useEffect } from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { API } from '@/api/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

const AdminTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [staffs, setStaffs] = useState([]);
  const [students, setStudents] = useState([]);
  const [newTask, setNewTask] = useState({
    task_name: '',
    assigned_to: '',
    assigned_by: '',
    remarks: '',
    is_routinary: false,
    date: new Date().toISOString().split('T')[0],
  });
  const date = new Date();

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

      const response = await API.toggleStatusComplete(id, updatedTask);

      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
    } catch (error) {
      console.error(error);
    }
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedTask(null);
    setEditModalOpen(false);
  };

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setNewTask({
      task_name: '',
      assigned_to: '',
      assigned_by: '',
      remarks: '',
      is_routinary: false,
      date: new Date().toISOString().split('T')[0],
    });
    setCreateModalOpen(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: checked,
    }));
  };

  const handleSelectChange = (name, value) => {
    setSelectedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const saveTask = async () => {
    try {
      const response = await API.updateTask(selectedTask.id, selectedTask);
      setTasks(
        tasks.map((task) =>
          task.id === selectedTask.id ? response.data : task
        )
      );
      closeEditModal();
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async () => {
    try {
      await API.createTask(newTask);
      closeCreateModal();
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStaff = async () => {
    try {
      const response = await API.getStaff();
      setStaffs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await API.getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await API.getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (task) => {
    try {
      await API.deleteTask(task.id);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchStaff(), fetchStudents(), fetchTasks()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">Loading...</div>
    );
  }

  const routinaryTasks = tasks.filter((task) => task.is_routinary);
  const nonRoutinaryTasks = tasks.filter((task) => !task.is_routinary);

  return (
    <>
      <span className="font-bold text-center px-5 py-4 text-3xl">
        Tasks today - {date.toLocaleDateString()}
      </span>
      <div className="overflow-x-auto p-7">
        <Button onClick={openCreateModal} size="sm" variant="outline">
          Add Task
        </Button>
        {nonRoutinaryTasks.length === 0 && routinaryTasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks today.</p>
        ) : (
          <>
            <h2 className="text-xl font-bold my-5">Routinary Tasks</h2>
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
                {routinaryTasks.map((task) => (
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
                    <td className="px-6 py-4 flex gap-2">
                      <Button
                        onClick={() => toggleTaskStatus(task.id)}
                        size="sm"
                        variant="outline"
                      >
                        {task.is_completed ? 'Reopen' : 'Complete'}
                      </Button>
                      <Button
                        onClick={() => openEditModal(task)}
                        size="sm"
                        variant="outline"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(task)}
                        size="sm"
                        variant="outline"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="text-xl font-bold my-5">Non-Routinary Tasks</h2>
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
                {nonRoutinaryTasks.map((task) => (
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
                    <td className="px-6 py-4 flex gap-2">
                      <Button
                        onClick={() => toggleTaskStatus(task.id)}
                        size="sm"
                        variant="outline"
                      >
                        {task.is_completed ? 'Reopen' : 'Complete'}
                      </Button>
                      <Button
                        onClick={() => openEditModal(task)}
                        size="sm"
                        variant="outline"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(task)}
                        size="sm"
                        variant="outline"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Task Name
              </label>
              <Input
                type="text"
                name="task_name"
                value={selectedTask?.task_name || ''}
                onChange={handleEditChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Assigned To
              </label>
              <Select
                name="assigned_to"
                value={selectedTask?.assigned_to || ''}
                onValueChange={(value) =>
                  handleSelectChange('assigned_to', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select User" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((user) => (
                    <SelectItem
                      key={user.id}
                      value={`${user.first_name} ${user.last_name}`}
                    >
                      {user.first_name} {user.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Assigned By
              </label>
              <Select
                name="assigned_by"
                value={selectedTask?.assigned_by || ''}
                onValueChange={(value) =>
                  handleSelectChange('assigned_by', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select User" />
                </SelectTrigger>
                <SelectContent>
                  {staffs.map((user) => (
                    <SelectItem
                      key={user.id}
                      value={`${user.first_name} ${user.last_name}`}
                    >
                      {user.first_name} {user.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Remarks
              </label>
              <Input
                as="textarea"
                name="remarks"
                value={selectedTask?.remarks || ''}
                onChange={handleEditChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={closeEditModal} variant="outline">
              Cancel
            </Button>
            <Button onClick={saveTask}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Task Name
              </label>
              <Input
                type="text"
                name="task_name"
                value={newTask.task_name}
                onChange={handleCreateChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Assigned To
              </label>
              <Select
                name="assigned_to"
                value={newTask.assigned_to}
                onValueChange={(value) =>
                  setNewTask((prevTask) => ({
                    ...prevTask,
                    assigned_to: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select User" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((user) => (
                    <SelectItem
                      key={user.id}
                      value={`${user.first_name} ${user.last_name}`}
                    >
                      {user.first_name} {user.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Assigned By
              </label>
              <Select
                name="assigned_by"
                value={newTask.assigned_by}
                onValueChange={(value) =>
                  setNewTask((prevTask) => ({
                    ...prevTask,
                    assigned_by: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select User" />
                </SelectTrigger>
                <SelectContent>
                  {staffs.map((user) => (
                    <SelectItem
                      key={user.id}
                      value={`${user.first_name} ${user.last_name}`}
                    >
                      {user.first_name} {user.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <Input
                type="date"
                name="date"
                value={newTask.date}
                onChange={handleCreateChange}
                disabled={newTask.is_routinary}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Remarks
              </label>
              <Input
                as="textarea"
                name="remarks"
                value={newTask.remarks}
                onChange={handleCreateChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_routinary"
                name="is_routinary"
                checked={newTask.is_routinary}
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor="is_routinary"
                className="ml-2 block text-sm font-medium text-gray-700"
              >
                Is Routinary
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={closeCreateModal} variant="outline">
              Cancel
            </Button>
            <Button onClick={createTask}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminTasks;
