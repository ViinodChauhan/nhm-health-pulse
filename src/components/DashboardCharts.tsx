import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

// Sample data for charts
const nutritionCoverageData = [
  { district: "Shimla", coverage: 85, target: 90 },
  { district: "Kullu", coverage: 78, target: 90 },
  { district: "Mandi", coverage: 92, target: 90 },
  { district: "Bilaspur", coverage: 76, target: 90 },
  { district: "Kangra", coverage: 88, target: 90 },
  { district: "Chamba", coverage: 82, target: 90 }
];

const anemiaTrendsData = [
  { month: "Jan", mild: 45, moderate: 25, severe: 8 },
  { month: "Feb", mild: 42, moderate: 23, severe: 7 },
  { month: "Mar", mild: 38, moderate: 20, severe: 6 },
  { month: "Apr", mild: 35, moderate: 18, severe: 5 },
  { month: "May", mild: 32, moderate: 16, severe: 4 },
  { month: "Jun", mild: 29, moderate: 14, severe: 3 }
];

const facilityPerformanceData = [
  { name: "PHCs", value: 45, color: "#2563eb" },
  { name: "CHCs", value: 23, color: "#059669" },
  { name: "Sub-Centers", value: 78, color: "#d97706" },
  { name: "District Hospitals", value: 12, color: "#dc2626" }
];

const COLORS = ["#2563eb", "#059669", "#d97706", "#dc2626"];

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Nutrition Coverage Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Nutrition Coverage by District</CardTitle>
          <CardDescription>Current vs Target Coverage (%)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={nutritionCoverageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="district" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="coverage" fill="hsl(var(--primary))" name="Current Coverage" />
              <Bar dataKey="target" fill="hsl(var(--muted))" name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Anemia Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Anemia Trends</CardTitle>
          <CardDescription>Cases by severity over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={anemiaTrendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="mild" 
                stroke="hsl(var(--warning))" 
                strokeWidth={2}
                name="Mild"
              />
              <Line 
                type="monotone" 
                dataKey="moderate" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={2}
                name="Moderate"
              />
              <Line 
                type="monotone" 
                dataKey="severe" 
                stroke="#dc2626" 
                strokeWidth={2}
                name="Severe"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Facility Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Facility Performance</CardTitle>
          <CardDescription>Active facilities by type</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={facilityPerformanceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {facilityPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Additional Charts Section */}
      <Card>
        <CardHeader>
          <CardTitle>Health Indicators</CardTitle>
          <CardDescription>Key health metrics overview</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="nutrition" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="medicine">Medicine</TabsTrigger>
              <TabsTrigger value="screening">Screening</TabsTrigger>
            </TabsList>
            
            <TabsContent value="nutrition" className="mt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Take Home Ration</span>
                  <span className="font-medium">87%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: "87%" }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Hot Cooked Meals</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: "92%" }}></div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="medicine" className="mt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">IFA Tablets</span>
                  <span className="font-medium">84%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "84%" }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Deworming</span>
                  <span className="font-medium">78%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "78%" }}></div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="screening" className="mt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Height/Weight</span>
                  <span className="font-medium">95%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: "95%" }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Hemoglobin</span>
                  <span className="font-medium">89%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: "89%" }}></div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}