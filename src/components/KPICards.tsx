import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Video,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react";

const kpiData = [
  {
    title: "Active Beneficiaries",
    value: "12,847",
    change: "+2.3%",
    trend: "up",
    description: "Total registered beneficiaries",
    icon: Users,
    color: "primary"
  },
  {
    title: "High-Risk Cases",
    value: "234",
    change: "-5.2%",
    trend: "down",
    description: "Requiring immediate attention",
    icon: AlertTriangle,
    color: "destructive"
  },
  {
    title: "Completed Nutrition Cycles",
    value: "8,456",
    change: "+12.7%",
    trend: "up",
    description: "This month",
    icon: CheckCircle,
    color: "success"
  },
  {
    title: "Pending Teleconsultations",
    value: "67",
    change: "0%",
    trend: "neutral",
    description: "Awaiting doctor assignment",
    icon: Video,
    color: "warning"
  }
];

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <TrendingUp className="w-3 h-3 text-success" />;
    case "down":
      return <TrendingDown className="w-3 h-3 text-success" />;
    case "neutral":
      return <Minus className="w-3 h-3 text-muted-foreground" />;
    default:
      return null;
  }
};

const getColorClasses = (color: string) => {
  switch (color) {
    case "primary":
      return "bg-primary/10 text-primary border-primary/20";
    case "destructive":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "success":
      return "bg-success/10 text-success border-success/20";
    case "warning":
      return "bg-warning/10 text-warning border-warning/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <div className={`p-2 rounded-lg border ${getColorClasses(kpi.color)}`}>
                <Icon className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-3xl font-bold">{kpi.value}</div>
                <div className="flex items-center justify-between">
                  <CardDescription className="text-xs">
                    {kpi.description}
                  </CardDescription>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(kpi.trend)}
                    <span className={`text-xs font-medium ${
                      kpi.trend === "up" ? "text-success" : 
                      kpi.trend === "down" ? "text-success" : 
                      "text-muted-foreground"
                    }`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}