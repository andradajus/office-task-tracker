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

const AdminStaff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    designation: '',
  });

  const fetchStaff = async () => {
    try {
      const response = await API.getStaff();
      setStaff(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedUser(null);
    setEditModalOpen(false);
  };

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setNewUser({
      first_name: '',
      middle_name: '',
      last_name: '',
      designation: '',
    });
    setCreateModalOpen(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const saveUser = async () => {
    try {
      const response = await API.updateStaff(selectedUser.id, selectedUser);
      setStaff(
        staff.map((user) =>
          user.id === selectedUser.id ? response.data : user
        )
      );
      closeEditModal();
    } catch (error) {
      console.error(error);
    }
  };

  const createUser = async () => {
    try {
      const response = await API.createStaff(newUser);
      setStaff([...staff, response.data]);
      closeCreateModal();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await API.deleteStaff(id);
      setStaff(staff.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-10">
      <div className="flex justify-end mb-4">
        <Button onClick={openCreateModal} size="sm" variant="outline">
          Add Staff
        </Button>
      </div>
      <div className="overflow-x-auto p-5">
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : staff?.length === 0 ? (
          <div className="text-center text-gray-500">No staff available</div>
        ) : (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="text-lg px-6 py-3">
                  Name
                </th>
                <th scope="col" className="text-lg px-6 py-3">
                  Designation
                </th>
                <th scope="col" className="text-lg px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {staff?.map((user) => (
                <tr
                  key={user.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">
                    {user.first_name} {user.last_name}
                  </td>
                  <td className="px-6 py-4">{user.designation}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <Button
                      onClick={() => openEditModal(user)}
                      size="sm"
                      variant="outline"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteUser(user.id)}
                      size="sm"
                      variant="outline"
                      color="red"
                    >
                      Delete
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
            <DialogTitle>Edit User</DialogTitle>
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
                Designation
              </label>
              <Input
                type="text"
                name="designation"
                value={selectedUser?.designation || ''}
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

      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <Input
                type="text"
                name="first_name"
                value={newUser.first_name}
                onChange={handleCreateChange}
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
                value={newUser.middle_name}
                onChange={handleCreateChange}
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
                value={newUser.last_name}
                onChange={handleCreateChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Designation
              </label>
              <Input
                type="text"
                name="designation"
                value={newUser.designation}
                onChange={handleCreateChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={closeCreateModal} variant="outline">
              Cancel
            </Button>
            <Button onClick={createUser}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminStaff;
