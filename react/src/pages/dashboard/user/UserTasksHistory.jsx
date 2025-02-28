import { useState } from "react"
import { CheckCircle, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"

const UserTasksHistory = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete project proposal",
      completed: false,
      assignedTo: "John Doe",
      assignedBy: "Jane Smith",
      dateCompleted: null,
      remarks: "High priority",
    },
    {
      id: 2,
      title: "Review client feedback",
      completed: false,
      assignedTo: "Alice Johnson",
      assignedBy: "Bob Williams",
      dateCompleted: null,
      remarks: "Feedback due by EOD",
    },
    {
      id: 3,
      title: "Prepare for team meeting",
      completed: false,
      assignedTo: "Emma Brown",
      assignedBy: "David Lee",
      dateCompleted: null,
      remarks: "Agenda items needed",
    },
    {
      id: 4,
      title: "Update documentation",
      completed: true,
      assignedTo: "Michael Wilson",
      assignedBy: "Sarah Davis",
      dateCompleted: "2023-06-15",
      remarks: "Version 2.0 complete",
    },
    {
      id: 5,
      title: "Fix reported bugs",
      completed: false,
      assignedTo: "Chris Taylor",
      assignedBy: "Lisa Anderson",
      dateCompleted: null,
      remarks: "Critical issues first",
    },
    {
      id: 6,
      title: "Complete project proposal",
      completed: false,
      assignedTo: "John Doe",
      assignedBy: "Jane Smith",
      dateCompleted: null,
      remarks: "High priority",
    },
    {
      id: 7,
      title: "Review client feedback",
      completed: false,
      assignedTo: "Alice Johnson",
      assignedBy: "Bob Williams",
      dateCompleted: null,
      remarks: "Feedback due by EOD",
    },
    {
      id: 8,
      title: "Prepare for team meeting",
      completed: false,
      assignedTo: "Emma Brown",
      assignedBy: "David Lee",
      dateCompleted: null,
      remarks: "Agenda items needed",
    },
    {
      id: 9,
      title: "Update documentation",
      completed: true,
      assignedTo: "Michael Wilson",
      assignedBy: "Sarah Davis",
      dateCompleted: "2023-06-15",
      remarks: "Version 2.0 complete",
    },
    {
      id: 10,
      title: "Fix reported bugs",
      completed: false,
      assignedTo: "Chris Taylor",
      assignedBy: "Lisa Anderson",
      dateCompleted: null,
      remarks: "Critical issues first",
    },
  ])

  const toggleTaskStatus = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
            dateCompleted: !task.completed ? new Date().toISOString().split("T")[0] : null,
          }
        }
        return task
      }),
    )
  }

  return (
    <>
      <div className="overflow-x-auto p-7">
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
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {task.completed ? (
                    <CheckCircle className="inline-block w-4 h-4 mr-2 text-green-500" />
                  ) : (
                    <Circle className="inline-block w-4 h-4 mr-2 text-gray-400" />
                  )}
                  {task.title}
                </td>
                <td className="px-6 py-4">{task.assignedTo}</td>
                <td className="px-6 py-4">{task.assignedBy}</td>
                <td className="px-6 py-4">{task.dateCompleted || "-"}</td>
                <td className="px-6 py-4">{task.completedBy || "-"}</td>
                <td className="px-6 py-4">{task.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
};

export default UserTasksHistory;
