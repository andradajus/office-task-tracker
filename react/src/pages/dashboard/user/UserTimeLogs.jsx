
import { useState } from "react"
import { Clock } from "lucide-react"

const UserTimeLogs = () => {
  const [timeLogs, setTimeLogs] = useState([
    {
      id: 1,
      date: "2023-06-20",
      time: "09:00 AM",
      status: "Time In",
    },
    {
      id: 2,
      date: "2023-06-20",
      time: "05:30 PM",
      status: "Time Out",
    },
    {
      id: 3,
      date: "2023-06-21",
      time: "08:45 AM",
      status: "Time In",
    },
    {
      id: 4,
      date: "2023-06-21",
      time: "06:15 PM",
      status: "Time Out",
    },
    {
      id: 5,
      date: "2023-06-22",
      time: "09:15 AM",
      status: "Time In",
    },
  ])

  return (
    <div className="overflow-x-auto p-5">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Time
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {timeLogs.map((log) => (
            <tr key={log.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">{log.date}</td>
              <td className="px-6 py-4">
                <Clock className="inline-block w-4 h-4 mr-2 text-blue-500" />
                {log.time}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    log.status === "Time In" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {log.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default UserTimeLogs;
