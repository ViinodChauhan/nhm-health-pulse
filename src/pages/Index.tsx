import { useState } from "react";
import { KPICards } from "@/components/KPICards";
import { DashboardCharts } from "@/components/DashboardCharts";
import { NavigationBreadcrumb } from "@/components/NavigationBreadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Calendar, Users, MapPin } from "lucide-react";

const Index = () => {
  const [navigationLevels, setNavigationLevels] = useState([
    {
      label: "State",
      value: "Himachal Pradesh",
      options: [
        { label: "Himachal Pradesh", value: "Himachal Pradesh" },
        { label: "Punjab", value: "Punjab" },
        { label: "Haryana", value: "Haryana" }
      ]
    },
    {
      label: "District",
      value: "Shimla",
      options: [
        { label: "Shimla", value: "Shimla" },
        { label: "Kullu", value: "Kullu" },
        { label: "Mandi", value: "Mandi" },
        { label: "Kangra", value: "Kangra" }
      ]
    },
    {
      label: "Block",
      value: "Shimla Rural",
      options: [
        { label: "Shimla Rural", value: "Shimla Rural" },
        { label: "Shimla Urban", value: "Shimla Urban" },
        { label: "Theog", value: "Theog" }
      ]
    },
    {
      label: "Facility",
      value: "All Facilities"
    }
  ]);

  const handleLevelChange = (level: string, value: string) => {
    setNavigationLevels(prev => 
      prev.map(l => l.label.toLowerCase() === level ? { ...l, value } : l)
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              NHM HP Monitoring Dashboard
            </h1>
            <p className="text-muted-foreground">
              Real-time monitoring of health programs and beneficiary data
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <Calendar className="w-3 h-3" />
              Last Updated: 2 mins ago
            </Badge>
          </div>
        </div>

        {/* Navigation Breadcrumb */}
        <NavigationBreadcrumb levels={navigationLevels} onLevelChange={handleLevelChange} />
      </div>

      {/* KPI Cards */}
      <KPICards />

      {/* Charts Section */}
      <DashboardCharts />

      {/* Alerts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Priority Alerts
            </CardTitle>
            <CardDescription>
              Recent alerts requiring immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg border-l-4 border-destructive bg-destructive/5">
              <div className="w-2 h-2 bg-destructive rounded-full mt-2"></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Severe Malnutrition Cases</p>
                <p className="text-xs text-muted-foreground">
                  3 children identified in Theog block requiring immediate intervention
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="destructive" className="text-xs">High Priority</Badge>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg border-l-4 border-warning bg-warning/5">
              <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Missed Follow-ups</p>
                <p className="text-xs text-muted-foreground">
                  12 beneficiaries have missed their scheduled health check-ups
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">Medium Priority</Badge>
                  <span className="text-xs text-muted-foreground">4 hours ago</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg border-l-4 border-primary bg-primary/5">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Teleconsultation Requests</p>
                <p className="text-xs text-muted-foreground">
                  5 new requests pending doctor assignment
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">Standard</Badge>
                  <span className="text-xs text-muted-foreground">6 hours ago</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest system activities and updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-8 h-8 bg-success/10 text-success rounded-full flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">New Beneficiary Registration</p>
                <p className="text-xs text-muted-foreground">
                  15 new beneficiaries registered in Shimla Rural block
                </p>
                <span className="text-xs text-muted-foreground">10 minutes ago</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Facility Data Updated</p>
                <p className="text-xs text-muted-foreground">
                  Monthly reports uploaded for 8 health facilities
                </p>
                <span className="text-xs text-muted-foreground">1 hour ago</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-8 h-8 bg-secondary/10 text-secondary rounded-full flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Health Camp Scheduled</p>
                <p className="text-xs text-muted-foreground">
                  Nutrition screening camp planned for next week
                </p>
                <span className="text-xs text-muted-foreground">3 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
