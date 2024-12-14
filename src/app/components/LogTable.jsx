import React from "react";

const LogTable = ({ logs }) => {
  if (!logs || logs.length === 0) {
    return <p>No logs available</p>; // Added check for empty logs
  }

  return (
    <div className="overflow-auto">
      {logs[0].battery ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4 border-b text-primary">Last Updated</th>
              <th className="py-2 px-4 border-b text-primary">Severity</th>
              <th className="py-2 px-4 border-b text-primary">Robot Id </th>
              <th className="py-2 px-4 border-b text-primary">Online/Offline</th>
              <th className="py-2 px-4 border-b text-primary">Battery Percentage</th>
              <th className="py-2 px-4 border-b text-primary">CPU Usage</th>
              <th className="py-2 px-4 border-b text-primary">RAM Consumption</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
              >
                <td className="py-2 px-4 border-b text-secondary">
                  {log.timestamp}
                </td>
                <td
                  className={`py-2 px-4 border-b ${
                    log.severity === 'ERROR'
                      ? 'text-red-500'
                      : log.severity === 'WARN'
                      ? 'text-yellow-500'
                      : 'text-green-500'
                  }`}
                >
                  {log.severity}
                </td>
                <td className="py-2 px-4 border-b text-secondary">{log.node}</td>
                <td className="py-2 px-4 border-b text-secondary">
                  {log.active ? 'Online' : 'Offline'}
                </td>
                <td className="py-2 px-4 border-b text-secondary">{log.battery}%</td>
                <td className="py-2 px-4 border-b text-secondary">{log.CPU}%</td>
                <td className="py-2 px-4 border-b text-secondary">{log.RAM} MB</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4 border-b text-primary">Timestamp</th>
              <th className="py-2 px-4 border-b text-primary">Severity</th>
              <th className="py-2 px-4 border-b text-primary">Message</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => {
              const message = log.message || '';
              return (
                <tr
                  key={index}
                  className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="py-2 px-4 border-b text-secondary">
                    {log.timestamp.replace(/[\[\]]/g, '')}
                  </td>
                  <td
                    className={`py-2 px-4 border-b ${
                      log.severity === 'ERROR'
                        ? 'text-red-500'
                        : log.severity === 'WARN'
                        ? 'text-yellow-500'
                        : 'text-green-500'
                    }`}
                  >
                    {log.severity}
                  </td>
                  <td className="py-2 px-4 border-b text-secondary">
                    {message.split(']').slice(1).join(']').trim()} {/* Message after the severity */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LogTable;
