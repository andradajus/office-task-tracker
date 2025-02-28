import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { API } from '@/api/api';
import { formatTime } from '@/lib/utils';

const UserTimeLogs = () => {
  const [timeLogs, setTimeLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const date = new Date();

  const fetchTimeLogs = async () => {
    try {
      const response = await API.getMyTimeEntries();
      setTimeLogs(response.data.time_entries);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeLogs();
  }, []);

  return (
    <div className="p-5">
      <div className="text-lg font-bold">
        Total Hours Rendered for the month of
        <span className="ml-1">
          {date.toLocaleString('default', { month: 'long' })}:
        </span>
      </div>
      <div className="overflow-x-auto p-5">
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : timeLogs.length === 0 ? (
          <div className="text-center text-gray-500">
            No time logs available.
          </div>
        ) : (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="text-lg px-6 py-3">
                  Date
                </th>
                <th scope="col" className="text-lg px-6 py-3">
                  Time
                </th>
                <th scope="col" className="text-lg px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {timeLogs.map((log) => (
                <tr
                  key={log.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{log.date}</td>
                  <td className="px-6 py-4">
                    <Clock className="inline-block w-4 h-4 mr-2 text-blue-500" />
                    {formatTime(log.time)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        log.status === 'time_in'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {log.status === 'time_in' ? 'Time In' : 'Time Out'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserTimeLogs;
