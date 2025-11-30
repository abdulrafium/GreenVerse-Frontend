import Card from './Card';

const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function StatCard({ title, value, change, changeType = "positive", icon, trend, color = "text-[#3AA174]" }) {
  return (
    <Card className="flex items-start justify-between">
      <div>
        <p className="text-stone-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-stone-800">{value}</h3>
        {(trend || change) && (
          <span className={cn(
            "text-xs font-medium flex items-center mt-2",
            changeType === "positive" ? "text-green-600" : "text-red-600"
          )}>
            {trend ? `+${trend}% from last month` : change}
          </span>
        )}
      </div>
      <div className={cn("p-3 rounded-xl bg-[#F6F3EB]", color)}>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
    </Card>
  );
}
