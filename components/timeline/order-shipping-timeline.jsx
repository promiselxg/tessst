import { format } from "date-fns";

const ShippingTimeline = ({ logs = [] }) => {
  const groupedLogs = logs.reduce((acc, log) => {
    const dateKey = format(new Date(log.timestamp), "EEEE, d MMMM");
    acc[dateKey] = acc[dateKey] || [];
    acc[dateKey].push(log);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedLogs).sort((a, b) => {
    return (
      new Date(groupedLogs[a][0].timestamp) -
      new Date(groupedLogs[b][0].timestamp)
    );
  });

  return (
    <div className="bg-white border p-4">
      {sortedDates.map((date, i) => (
        <div key={i} className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-3">
            {date}
          </p>
          <div className="space-y-4 relative border-l border-gray-300 ml-3">
            {groupedLogs[date].map((log, j) => (
              <div key={j} className="relative pl-6">
                <div className="absolute -left-[6.5px] top-1 w-3 h-3 rounded-full bg-gray-400 border-2 border-white"></div>
                <p className="font-semibold text-sm">{log.status}</p>
                {log.note && (
                  <p className="text-xs text-gray-500">{log.note}</p>
                )}
                <p className="text-xs text-gray-400">
                  {format(new Date(log.timestamp), "h:mm a")}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="w-full py-4">
        <p className="text-sm text-slate-700">
          Times are shown in the local time zone.
        </p>
      </div>
    </div>
  );
};

export default ShippingTimeline;
