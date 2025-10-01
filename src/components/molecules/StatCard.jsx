import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const StatCard = ({ title, value, icon, trend, gradient }) => {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {value}
          </p>
          {trend && (
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              <ApperIcon name="TrendingUp" size={14} />
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient}`}>
          <ApperIcon name={icon} size={24} className="text-white" />
        </div>
      </div>
    </Card>
  );
};

export default StatCard;