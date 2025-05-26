type KPICardProps = {
    title: string;
    value: string | number;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    subtext?: string;
};

const KPICard: React.FC<KPICardProps> = ({ title, value, icon: Icon, subtext }) => (
    <div className={`bg-white border border-gray-300 dark:border-gray-800 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg px-6 py-2 flex items-center justify-between hover:shadow-sm transition-all duration-300 transform hover:scale-101`}>
        <div className="space-y-4">
            <h3 className="font-bold text-[15px] uppercase tracking-wide opacity-90">{title}</h3>
            <div className="text-3xl font-bold mt-2">{value}</div>
            {subtext && <p className="text-sm opacity-80 mt-1">{subtext}</p>}
        </div>
        <div className="ml-4">
            <Icon className="w-8 h-8 opacity-80" />
        </div>
    </div>
);

export default KPICard;