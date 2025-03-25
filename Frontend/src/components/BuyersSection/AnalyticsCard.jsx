import React from "react";
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const data = [
  { name: '', value1: 400, value2: 240 },
  { name: '', value1: 300, value2: 139 },
  { name: '', value1: 500, value2: 380 },
  { name: '', value1: 280, value2: 190 },
  { name: '', value1: 590, value2: 390 },
  { name: '', value1: 350, value2: 290 },
  { name: '', value1: 600, value2: 380 },
];

const AnalyticsCard = () => {
  return (
    <div style={{ height: '200px', width: '100%', transform: 'rotate(90deg)' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6B7280" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#6B7280" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value1"
            stroke="#10B981"
            fill="url(#gradient1)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="value2"
            stroke="#6B7280"
            fill="url(#gradient2)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsCard;