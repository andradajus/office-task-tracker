import { useEffect, useState } from 'react';
import { API } from '@/api/api';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { appendBackendBaseUrl } from '@/lib/utils';

const AdminSA = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await API.getStudents();
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedUser(null);
    setEditModalOpen(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const saveUser = async () => {
    try {
      const response = await API.updateStudent(selectedUser.id, selectedUser);
      setStudents(
        students.map((user) =>
          user.id === selectedUser.id ? response.data : user
        )
      );
      closeEditModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-10">
      <div className="overflow-x-auto p-5">
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : students?.length === 0 ? (
          <div className="text-center text-gray-500">No students available</div>
        ) : (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="text-lg px-6 py-3">
                  ID Number
                </th>
                <th scope="col" className="text-lg px-6 py-3">
                  Name
                </th>
                <th scope="col" className="text-lg px-6 py-3">
                  Email
                </th>
                <th scope="col" className="text-lg px-6 py-3">
                  Contact Number
                </th>
                <th scope="col" className="text-lg px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {students?.map((user) => (
                <tr
                  key={user.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{user.id_number}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {user.profile_photo_path ? (
                        <img
                          src={appendBackendBaseUrl(user.profile_photo_path)}
                          alt="Profile"
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                      )}
                      <span>
                        {user.last_name}, {user.first_name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.contact_number}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <Button
                      onClick={() => openEditModal(user)}
                      size="sm"
                      variant="outline"
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <Input
                type="text"
                name="first_name"
                value={selectedUser?.first_name || ''}
                onChange={handleEditChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Middle Name
              </label>
              <Input
                type="text"
                name="middle_name"
                value={selectedUser?.middle_name || ''}
                onChange={handleEditChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <Input
                type="text"
                name="last_name"
                value={selectedUser?.last_name || ''}
                onChange={handleEditChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={selectedUser?.email || ''}
                onChange={handleEditChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <Input
                type="text"
                name="contact_number"
                value={selectedUser?.contact_number || ''}
                onChange={handleEditChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={closeEditModal} variant="outline">
              Cancel
            </Button>
            <Button onClick={saveUser}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSA;
