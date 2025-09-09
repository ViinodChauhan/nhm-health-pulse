import React, { useState } from "react";
import { Search, Filter, User, Phone, MapPin, Calendar, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for beneficiaries
const mockBeneficiaries = [
  {
    id: "NHM001",
    name: "Priya Sharma",
    age: 28,
    gender: "Female",
    facility: "PHC Shimla",
    riskStatus: "high",
    lastUpdate: "2024-01-08",
    mobile: "+91 98765 43210",
    photo: "/placeholder.svg",
    address: "Village Kufri, Shimla",
    pregnancyWeek: 32,
    hemoglobin: 8.2,
    lastVisit: "2024-01-05"
  },
  {
    id: "NHM002", 
    name: "Sunita Devi",
    age: 24,
    gender: "Female",
    facility: "CHC Mandi",
    riskStatus: "medium",
    lastUpdate: "2024-01-07",
    mobile: "+91 98765 43211",
    photo: "/placeholder.svg",
    address: "Village Rewalsar, Mandi",
    pregnancyWeek: 16,
    hemoglobin: 10.1,
    lastVisit: "2024-01-03"
  },
  {
    id: "NHM003",
    name: "Rajesh Kumar",
    age: 45,
    gender: "Male", 
    facility: "PHC Kullu",
    riskStatus: "low",
    lastUpdate: "2024-01-06",
    mobile: "+91 98765 43212",
    photo: "/placeholder.svg",
    address: "Village Manali, Kullu",
    condition: "Diabetes monitoring",
    lastCheckup: "2024-01-01",
    bloodSugar: 140
  }
];

const getRiskBadgeVariant = (risk: string) => {
  switch (risk) {
    case "high": return "destructive";
    case "medium": return "secondary"; 
    case "low": return "default";
    default: return "default";
  }
};

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "high": return "text-destructive";
    case "medium": return "text-warning";
    case "low": return "text-success";
    default: return "text-muted-foreground";
  }
};

export default function BeneficiaryManagement() {
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(mockBeneficiaries[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [facilityFilter, setFacilityFilter] = useState("all");

  const filteredBeneficiaries = mockBeneficiaries.filter(beneficiary => {
    const matchesSearch = 
      beneficiary.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beneficiary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beneficiary.mobile.includes(searchTerm);
    
    const matchesRisk = riskFilter === "all" || beneficiary.riskStatus === riskFilter;
    const matchesFacility = facilityFilter === "all" || beneficiary.facility === facilityFilter;
    
    return matchesSearch && matchesRisk && matchesFacility;
  });

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Beneficiary Management</h1>
          <p className="text-muted-foreground mt-1">Search, monitor and manage beneficiary health records</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Search and Table Section */}
        <div className="xl:col-span-2 space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search & Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by Unique ID, Name, or Mobile..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Risk Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk Levels</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="low">Low Risk</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={facilityFilter} onValueChange={setFacilityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Facility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Facilities</SelectItem>
                    <SelectItem value="PHC Shimla">PHC Shimla</SelectItem>
                    <SelectItem value="CHC Mandi">CHC Mandi</SelectItem>
                    <SelectItem value="PHC Kullu">PHC Kullu</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Beneficiaries Table */}
          <Card>
            <CardHeader>
              <CardTitle>Beneficiaries ({filteredBeneficiaries.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unique ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Age/Gender</TableHead>
                    <TableHead>Facility</TableHead>
                    <TableHead>Risk Status</TableHead>
                    <TableHead>Last Update</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBeneficiaries.map((beneficiary) => (
                    <TableRow 
                      key={beneficiary.id}
                      className={`cursor-pointer transition-colors ${
                        selectedBeneficiary?.id === beneficiary.id ? "bg-muted/50" : ""
                      }`}
                      onClick={() => setSelectedBeneficiary(beneficiary)}
                    >
                      <TableCell className="font-medium">{beneficiary.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={beneficiary.photo} />
                            <AvatarFallback>{beneficiary.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {beneficiary.name}
                        </div>
                      </TableCell>
                      <TableCell>{beneficiary.age}/{beneficiary.gender.charAt(0)}</TableCell>
                      <TableCell>{beneficiary.facility}</TableCell>
                      <TableCell>
                        <Badge variant={getRiskBadgeVariant(beneficiary.riskStatus)}>
                          {beneficiary.riskStatus.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>{beneficiary.lastUpdate}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Profile Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Beneficiary Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedBeneficiary ? (
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="text-center space-y-4">
                    <Avatar className="w-20 h-20 mx-auto">
                      <AvatarImage src={selectedBeneficiary.photo} />
                      <AvatarFallback className="text-lg">
                        {selectedBeneficiary.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{selectedBeneficiary.name}</h3>
                      <p className="text-muted-foreground">ID: {selectedBeneficiary.id}</p>
                      <Badge 
                        variant={getRiskBadgeVariant(selectedBeneficiary.riskStatus)}
                        className="mt-2"
                      >
                        {selectedBeneficiary.riskStatus.toUpperCase()} RISK
                      </Badge>
                    </div>
                  </div>

                  {/* Demographics */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Demographics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedBeneficiary.age} years, {selectedBeneficiary.gender}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedBeneficiary.mobile}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedBeneficiary.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedBeneficiary.facility}</span>
                      </div>
                    </div>
                  </div>

                  {/* Health Details */}
                  <Tabs defaultValue="health" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="health">Health</TabsTrigger>
                      <TabsTrigger value="history">History</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="health" className="space-y-4">
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Current Status</h4>
                        <div className="space-y-2 text-sm">
                          {selectedBeneficiary.pregnancyWeek && (
                            <div className="flex justify-between">
                              <span>Pregnancy Week:</span>
                              <span className="font-medium">{selectedBeneficiary.pregnancyWeek}</span>
                            </div>
                          )}
                          {selectedBeneficiary.hemoglobin && (
                            <div className="flex justify-between">
                              <span>Hemoglobin:</span>
                              <span className={`font-medium ${
                                selectedBeneficiary.hemoglobin < 10 ? 'text-destructive' : 'text-success'
                              }`}>
                                {selectedBeneficiary.hemoglobin} g/dL
                              </span>
                            </div>
                          )}
                          {selectedBeneficiary.bloodSugar && (
                            <div className="flex justify-between">
                              <span>Blood Sugar:</span>
                              <span className={`font-medium ${
                                selectedBeneficiary.bloodSugar > 130 ? 'text-warning' : 'text-success'
                              }`}>
                                {selectedBeneficiary.bloodSugar} mg/dL
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="history" className="space-y-4">
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Recent Activity</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>Last Visit: {selectedBeneficiary.lastVisit || selectedBeneficiary.lastCheckup}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-muted-foreground" />
                            <span>Last Update: {selectedBeneficiary.lastUpdate}</span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <Button className="w-full">
                    View Full Profile
                  </Button>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select a beneficiary to view profile</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}