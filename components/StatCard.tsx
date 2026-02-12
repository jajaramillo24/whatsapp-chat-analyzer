
import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    isSmallText?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, isSmallText = false }) => {
    return (
        <div className="bg-slate-800 p-4 rounded-xl shadow-lg animate-fade-in">
            <h3 className="text-sm font-medium text-slate-400 truncate">{title}</h3>
            <p className={`font-bold text-white ${isSmallText ? 'text-base' : 'text-2xl'} mt-1`}>{value}</p>
        </div>
    );
};

export default StatCard;
