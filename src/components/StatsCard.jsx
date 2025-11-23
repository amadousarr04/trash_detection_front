import React from 'react';

const StatsCard = ({ icon: Icon, title, value, subtitle, color = 'primary' }) => {
  const colorClasses = {
    primary: 'from-primary-500 to-emerald-500',
    blue: 'from-blue-500 to-cyan-500',
    purple: 'from-purple-500 to-pink-500',
    orange: 'from-orange-500 to-red-500',
  };

  return (
    <div className="card-dark group hover:scale-105 transform transition-all duration-300 cursor-pointer">
      <div className="flex items-center gap-4">
        <div className={`bg-gradient-to-br ${colorClasses[color]} p-4 rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-gray-300 text-sm font-medium">{title}</p>
          <p className="text-white text-3xl font-bold mt-1">{value}</p>
          {subtitle && (
            <p className="text-gray-400 text-xs mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
