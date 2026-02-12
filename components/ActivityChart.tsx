
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface ActivityChartProps {
    data: { [key: string]: number };
}

const ActivityChart: React.FC<ActivityChartProps> = ({ data }) => {
    const chartData = Object.entries(data).map(([hour, count]) => ({
        hour: `${hour.padStart(2, '0')}:00`,
        mensajes: count,
    }));

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <defs>
                        <linearGradient id="colorMensajes" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="hour" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1f2937',
                            borderColor: '#374151',
                            borderRadius: '0.5rem'
                        }}
                        labelStyle={{ color: '#d1d5db' }}
                    />
                    <Area type="monotone" dataKey="mensajes" stroke="#22d3ee" fillOpacity={1} fill="url(#colorMensajes)" strokeWidth={2} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ActivityChart;
