type KPICardProps = {
    title: string;
    value: string | number;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    color: string;
    subtext?: string;
};

const KPICard: React.FC<KPICardProps> = ({ title, value, icon: Icon, color, subtext }) => (
    <div className={`${color} rounded-xl p-6 flex items-center justify-between text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
        <div className="flex-1">
            <h3 className="font-semibold text-sm uppercase tracking-wide opacity-90">{title}</h3>
            <div className="text-3xl font-bold mt-2">{value}</div>
            {subtext && <p className="text-sm opacity-80 mt-1">{subtext}</p>}
        </div>
        <div className="ml-4">
            <Icon className="w-8 h-8 opacity-80" />
        </div>
    </div>
);

export default KPICard;