import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Calendar, FileText, TrendingUp, TrendingDown } from "lucide-react";

const mockDiagnosticData = [
  {
    id: "1",
    beneficiaryName: "Priya Sharma",
    uniqueId: "BEN001234",
    testType: "Hemoglobin",
    date: "2024-12-08",
    uploadedBy: "Dr. Amit Kumar",
    resultValue: "8.2 g/dL",
    status: "Critical",
    facility: "Primary Health Center - Shimla"
  },
  {
    id: "2",
    beneficiaryName: "Rajesh Verma",
    uniqueId: "BEN001235",
    testType: "Blood Sugar",
    date: "2024-12-07",
    uploadedBy: "Nurse Kavita",
    resultValue: "140 mg/dL",
    status: "Borderline",
    facility: "Community Health Center - Mandi"
  },
  {
    id: "3",
    beneficiaryName: "Sunita Devi",
    uniqueId: "BEN001236",
    testType: "Hemoglobin",
    date: "2024-12-06",
    uploadedBy: "Dr. Ravi Singh",
    resultValue: "12.5 g/dL",
    status: "Normal",
    facility: "District Hospital - Kangra"
  },
  {
    id: "4",
    beneficiaryName: "Mohan Lal",
    uniqueId: "BEN001237",
    testType: "Blood Pressure",
    date: "2024-12-05",
    uploadedBy: "ASHA Meera",
    resultValue: "150/95 mmHg",
    status: "Critical",
    facility: "Sub Center - Kullu"
  },
  {
    id: "5",
    beneficiaryName: "Geeta Singh",
    uniqueId: "BEN001238",
    testType: "BMI",
    date: "2024-12-04",
    uploadedBy: "AWW Lakshmi",
    resultValue: "18.5 kg/m²",
    status: "Normal",
    facility: "Anganwadi Center - Solan"
  }
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "normal":
      return "bg-success text-success-foreground";
    case "borderline":
      return "bg-warning text-warning-foreground";
    case "critical":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "normal":
      return <TrendingUp className="w-3 h-3" />;
    case "borderline":
      return <TrendingDown className="w-3 h-3" />;
    case "critical":
      return <TrendingDown className="w-3 h-3" />;
    default:
      return null;
  }
};

export default function DiagnosticResults() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFacility, setSelectedFacility] = useState("all");
  const [selectedTestType, setSelectedTestType] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  const filteredData = mockDiagnosticData.filter(record => {
    const matchesSearch = 
      record.beneficiaryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.uniqueId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFacility = selectedFacility === "all" || record.facility.includes(selectedFacility);
    const matchesTestType = selectedTestType === "all" || record.testType === selectedTestType;
    
    return matchesSearch && matchesFacility && matchesTestType;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Diagnostic Results Monitoring</h1>
          <p className="text-muted-foreground">Track and monitor diagnostic test results and health indicators</p>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tests</p>
                <p className="text-2xl font-bold text-foreground">1,247</p>
              </div>
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Normal Results</p>
                <p className="text-2xl font-bold text-success">876</p>
              </div>
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Borderline Cases</p>
                <p className="text-2xl font-bold text-warning">245</p>
              </div>
              <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Cases</p>
                <p className="text-2xl font-bold text-destructive">126</p>
              </div>
              <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={selectedFacility} onValueChange={setSelectedFacility}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Facility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Facilities</SelectItem>
                <SelectItem value="Primary Health Center">Primary Health Centers</SelectItem>
                <SelectItem value="Community Health Center">Community Health Centers</SelectItem>
                <SelectItem value="District Hospital">District Hospitals</SelectItem>
                <SelectItem value="Sub Center">Sub Centers</SelectItem>
                <SelectItem value="Anganwadi">Anganwadi Centers</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedTestType} onValueChange={setSelectedTestType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Test Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tests</SelectItem>
                <SelectItem value="Hemoglobin">Hemoglobin</SelectItem>
                <SelectItem value="Blood Sugar">Blood Sugar</SelectItem>
                <SelectItem value="Blood Pressure">Blood Pressure</SelectItem>
                <SelectItem value="BMI">BMI</SelectItem>
                <SelectItem value="Other">Other Tests</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Diagnostic Results ({filteredData.length} records)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Beneficiary Details</TableHead>
                  <TableHead>Test Type</TableHead>
                  <TableHead>Result Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Uploaded By</TableHead>
                  <TableHead>Facility</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((record) => (
                  <TableRow key={record.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <div className="font-medium text-foreground">{record.beneficiaryName}</div>
                        <div className="text-sm text-muted-foreground">{record.uniqueId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">
                        {record.testType}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {record.resultValue}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(record.status)} flex items-center gap-1 w-fit`}>
                        {getStatusIcon(record.status)}
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(record.date).toLocaleDateString('en-IN')}
                    </TableCell>
                    <TableCell className="text-sm">{record.uploadedBy}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {record.facility}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}