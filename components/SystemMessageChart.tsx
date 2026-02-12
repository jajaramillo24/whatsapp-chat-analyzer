
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SystemMessageChartProps {
    data: { [key: string]: number };
    descriptions: { [key: string]: string };
}

const SystemMessageChart: React.FC<SystemMessageChartProps> = ({ data, descriptions }) => {
    const chartData = Object.entries(data)
        .map(([type, count]) => ({
            name: descriptions[type] || type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            count: count,
        }))
        .sort((a, b) => b.count - a.count);

    return (
        <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
                <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
                    <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                    <YAxis 
                        type="category" 
                        dataKey="name" 
                        stroke="#9ca3af" 
                        fontSize={12} 
                        width={120} 
                        tickLine={false} 
                        axisLine={false}
                        tick={{ fill: '#d1d5db' }}
                    />
                    <Tooltip
                        cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }}
                        contentStyle={{
                            backgroundColor: '#1f2937',
                            borderColor: '#374151',
                            borderRadius: '0.5rem'
                        }}
                        labelStyle={{ color: '#d1d5db', fontWeight: 'bold' }}
                        formatter={(value) => [value, 'Cantidad']}
                    />
                    <Bar dataKey="count" fill="#a78bfa" radius={[0, 4, 4, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SystemMessageChart;
