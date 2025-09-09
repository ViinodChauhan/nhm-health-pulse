import React, { useState } from "react";
import { Camera, Filter, Eye, Calendar, AlertTriangle, CheckCircle, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

// Mock data for nutrition monitoring
const mockIntakeRecords = [
  {
    id: "INT001",
    beneficiary: { name: "Priya Sharma", id: "NHM001", photo: "/placeholder.svg" },
    intakeRecorded: "IFA Tablets",
    photoUploaded: true,
    photoUrl: "/placeholder.svg",
    date: "2024-01-08",
    status: "complete",
    recordedBy: "ASHA Sunita",
    dosage: "1 tablet",
    compliance: "100%",
    notes: "Taken with food as advised"
  },
  {
    id: "INT002",
    beneficiary: { name: "Sunita Devi", id: "NHM002", photo: "/placeholder.svg" },
    intakeRecorded: "Calcium Supplements",
    photoUploaded: false,
    photoUrl: null,
    date: "2024-01-08",
    status: "pending",
    recordedBy: "AWW Meera",
    dosage: "2 tablets",
    compliance: "75%",
    notes: "Photo verification pending"
  },
  {
    id: "INT003",
    beneficiary: { name: "Rajesh Kumar", id: "NHM003", photo: "/placeholder.svg" },
    intakeRecorded: "Diabetic Medicine",
    photoUploaded: true,
    photoUrl: "/placeholder.svg",
    date: "2024-01-07",
    status: "missed",
    recordedBy: "ASHA Kavita",
    dosage: "2 tablets morning",
    compliance: "60%",
    notes: "Missed morning dose, needs follow-up"
  },
  {
    id: "INT004",
    beneficiary: { name: "Anita Singh", id: "NHM004", photo: "/placeholder.svg" },
    intakeRecorded: "Vitamin D",
    photoUploaded: true,
    photoUrl: "/placeholder.svg",
    date: "2024-01-08",
    status: "complete",
    recordedBy: "AWW Pooja",
    dosage: "1 capsule weekly",
    compliance: "95%",
    notes: "Regular intake maintained"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "complete":
      return <Badge className="bg-success/10 text-success border-success/20">Complete</Badge>;
    case "pending":
      return <Badge className="bg-warning/10 text-warning border-warning/20">Pending</Badge>;
    case "missed":
      return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Missed</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "complete":
      return <CheckCircle className="w-4 h-4 text-success" />;
    case "pending":
      return <Clock className="w-4 h-4 text-warning" />;
    case "missed":
      return <AlertTriangle className="w-4 h-4 text-destructive" />;
    default:
      return null;
  }
};

const getRowClassName = (status: string) => {
  switch (status) {
    case "complete":
      return "border-l-4 border-l-success/50 bg-success/5";
    case "pending":
      return "border-l-4 border-l-warning/50 bg-warning/5";
    case "missed":
      return "border-l-4 border-l-destructive/50 bg-destructive/5";
    default:
      return "";
  }
};

export default function NutritionMonitoring() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [supplementFilter, setSupplementFilter] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecords = mockIntakeRecords.filter(record => {
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    const matchesSupplement = supplementFilter === "all" || 
      (supplementFilter === "given" && record.photoUploaded) ||
      (supplementFilter === "not-given" && !record.photoUploaded) ||
      (supplementFilter === "missed" && record.status === "missed");
    const matchesSearch = 
      record.beneficiary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.beneficiary.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.intakeRecorded.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSupplement && matchesSearch;
  });

  // Calculate summary stats
  const totalRecords = mockIntakeRecords.length;
  const completeRecords = mockIntakeRecords.filter(r => r.status === "complete").length;
  const pendingRecords = mockIntakeRecords.filter(r => r.status === "pending").length;
  const missedRecords = mockIntakeRecords.filter(r => r.status === "missed").length;

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Nutrition & Medicine Intake Monitoring</h1>
          <p className="text-muted-foreground mt-1">Track daily supplements and medicine compliance by field workers</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Records</p>
                <p className="text-2xl font-bold">{totalRecords}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Complete</p>
                <p className="text-2xl font-bold text-success">{completeRecords}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-warning">{pendingRecords}</p>
              </div>
              <Clock className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Missed</p>
                <p className="text-2xl font-bold text-destructive">{missedRecords}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Search beneficiary or medicine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="complete">Complete</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="missed">Missed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={supplementFilter} onValueChange={setSupplementFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Supplement Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Records</SelectItem>
                <SelectItem value="given">Photo Uploaded</SelectItem>
                <SelectItem value="not-given">No Photo</SelectItem>
                <SelectItem value="missed">Missed Doses</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date Range
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Intake Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Intake Records ({filteredRecords.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Beneficiary</TableHead>
                <TableHead>Medicine/Supplement</TableHead>
                <TableHead>Photo</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Recorded By</TableHead>
                <TableHead>Compliance</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow 
                  key={record.id}
                  className={getRowClassName(record.status)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={record.beneficiary.photo} />
                        <AvatarFallback>{record.beneficiary.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{record.beneficiary.name}</p>
                        <p className="text-sm text-muted-foreground">{record.beneficiary.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{record.intakeRecorded}</p>
                      <p className="text-sm text-muted-foreground">{record.dosage}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {record.photoUploaded ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Camera className="w-4 h-4" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Intake Photo</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <img 
                              src={record.photoUrl || "/placeholder.svg"} 
                              alt="Intake verification"
                              className="w-full h-64 object-cover rounded-lg border"
                            />
                            <div className="text-sm space-y-1">
                              <p><strong>Beneficiary:</strong> {record.beneficiary.name}</p>
                              <p><strong>Medicine:</strong> {record.intakeRecorded}</p>
                              <p><strong>Date:</strong> {record.date}</p>
                              <p><strong>Notes:</strong> {record.notes}</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">
                        No Photo
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(record.status)}
                      {getStatusBadge(record.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{record.recordedBy}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            parseInt(record.compliance) >= 90 ? 'bg-success' :
                            parseInt(record.compliance) >= 70 ? 'bg-warning' : 'bg-destructive'
                          }`}
                          style={{ width: record.compliance }}
                        />
                      </div>
                      <span className="text-sm font-medium">{record.compliance}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}