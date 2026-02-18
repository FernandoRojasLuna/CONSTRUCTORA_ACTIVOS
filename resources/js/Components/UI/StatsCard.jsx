export default function StatsCard({ title, value, icon: Icon, trend, trendValue, color = 'amber' }) {
    const colors = {
        amber: {
            bg: 'bg-amber-50',
            icon: 'bg-amber-100 text-amber-600',
            trend: 'text-amber-600',
        },
        green: {
            bg: 'bg-green-50',
            icon: 'bg-green-100 text-green-600',
            trend: 'text-green-600',
        },
        blue: {
            bg: 'bg-blue-50',
            icon: 'bg-blue-100 text-blue-600',
            trend: 'text-blue-600',
        },
        red: {
            bg: 'bg-red-50',
            icon: 'bg-red-100 text-red-600',
            trend: 'text-red-600',
        },
        purple: {
            bg: 'bg-purple-50',
            icon: 'bg-purple-100 text-purple-600',
            trend: 'text-purple-600',
        },
        gray: {
            bg: 'bg-gray-50',
            icon: 'bg-gray-100 text-gray-600',
            trend: 'text-gray-600',
        },
    };

    const colorClasses = colors[color] || colors.amber;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
                    {trend && (
                        <div className="mt-2 flex items-center gap-1">
                            <span
                                className={`text-sm font-medium ${
                                    trend === 'up' ? 'text-green-600' : 'text-red-600'
                                }`}
                            >
                                {trend === 'up' ? '↑' : '↓'} {trendValue}
                            </span>
                            <span className="text-sm text-gray-500">vs mes anterior</span>
                        </div>
                    )}
                </div>
                {Icon && (
                    <div className={`p-3 rounded-xl ${colorClasses.icon}`}>
                        <Icon className="h-6 w-6" />
                    </div>
                )}
            </div>
        </div>
    );
}
