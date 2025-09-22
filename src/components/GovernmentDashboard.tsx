import { useState } from "react";
import { Building2, BarChart3, Activity, Eye, Shield, ArrowLeft, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GovernmentDashboardProps {
  governmentData: {
    officialId: string;
    name: string;
    department: string;
    clearanceLevel?: string;
    position?: string;
    status: string;
    email?: string;
    phone?: string;
  };
  onBack: () => void;
}

const GovernmentDashboard = ({ governmentData, onBack }: GovernmentDashboardProps) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");

  // Mock data for demonstration
  const mockStats = {
    totalRecordAccess: 1247,
    uniqueWorkers: 892,
    healthcareProviders: 34,
    emergencyAccess: 12,
    commonConditions: [
      { name: "Hypertension", count: 234, percentage: 26.2 },
      { name: "Diabetes", count: 189, percentage: 21.2 },
      { name: "Back Injury", count: 156, percentage: 17.5 },
      { name: "Respiratory Issues", count: 98, percentage: 11.0 },
      { name: "Vision Problems", count: 67, percentage: 7.5 }
    ],
    recentAccess: [
      { time: "2024-01-20 14:30", provider: "Dr. Sarah Johnson", action: "Record Access", workerId: "WKR12345", type: "routine" },
      { time: "2024-01-20 13:45", provider: "Dr. Mike Chen", action: "Emergency Access", workerId: "WKR67890", type: "emergency" },
      { time: "2024-01-20 12:15", provider: "Dr. Emily Wilson", action: "Record Access", workerId: "WKR54321", type: "routine" },
      { time: "2024-01-20 11:30", provider: "Dr. James Brown", action: "Break Glass Access", workerId: "WKR98765", type: "emergency" },
      { time: "2024-01-20 10:45", provider: "Dr. Lisa Davis", action: "Record Access", workerId: "WKR11111", type: "routine" }
    ]
  };

  return (
    <div className="container mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center text-white mb-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="absolute top-8 left-8 text-white hover:text-white/80"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portal Selection
        </Button>
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
            <Building2 className="w-12 h-12" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Government Dashboard</h1>
        <p className="text-white/80">Welcome, {governmentData.name}</p>
      </div>

      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="statistics">Health Statistics</TabsTrigger>
            <TabsTrigger value="access-logs">Access Logs</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="dashboard-stat">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Record Access</p>
                      <p className="text-2xl font-bold text-government">{mockStats.totalRecordAccess.toLocaleString()}</p>
                    </div>
                    <Eye className="w-8 h-8 text-government/60" />
                  </div>
                </CardContent>
              </Card>

              <Card className="dashboard-stat">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Workers</p>
                      <p className="text-2xl font-bold text-secondary">{mockStats.uniqueWorkers.toLocaleString()}</p>
                    </div>
                    <Users className="w-8 h-8 text-secondary/60" />
                  </div>
                </CardContent>
              </Card>

              <Card className="dashboard-stat">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Healthcare Providers</p>
                      <p className="text-2xl font-bold text-healthcare">{mockStats.healthcareProviders}</p>
                    </div>
                    <Activity className="w-8 h-8 text-healthcare/60" />
                  </div>
                </CardContent>
              </Card>

              <Card className="dashboard-stat">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Emergency Access</p>
                      <p className="text-2xl font-bold text-emergency">{mockStats.emergencyAccess}</p>
                    </div>
                    <Shield className="w-8 h-8 text-emergency/60" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-government" />
                  Recent Access Activity
                </CardTitle>
                <CardDescription>Latest health record access events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockStats.recentAccess.map((access, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge className={access.type === 'emergency' ? 'status-emergency' : 'status-active'}>
                            {access.action}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{access.time}</span>
                        </div>
                        <p className="text-sm font-medium mt-1">{access.provider}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Worker ID</p>
                        <p className="text-sm font-medium">{access.workerId}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-6">
            {/* Time Range Selector */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-government" />
                  Health Statistics Analysis
                </CardTitle>
                <CardDescription>Aggregated health data insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-6">
                  {['7d', '30d', '90d', '1y'].map((range) => (
                    <Button
                      key={range}
                      variant={selectedTimeRange === range ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTimeRange(range)}
                    >
                      {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '90d' ? '90 Days' : '1 Year'}
                    </Button>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Common Conditions */}
                  <div>
                    <h4 className="font-semibold mb-4">Most Common Health Conditions</h4>
                    <div className="space-y-3">
                      {mockStats.commonConditions.map((condition, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-government/10 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-government">{index + 1}</span>
                            </div>
                            <span className="font-medium">{condition.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-government">{condition.count}</span>
                            <span className="text-sm text-muted-foreground ml-2">({condition.percentage}%)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Department Breakdown */}
                  <div>
                    <h4 className="font-semibold mb-4">Department Health Overview</h4>
                    <div className="space-y-3">
                      {[
                        { dept: "Construction", incidents: 45, risk: "High" },
                        { dept: "Manufacturing", incidents: 32, risk: "Medium" },
                        { dept: "Office", incidents: 12, risk: "Low" },
                        { dept: "Transportation", incidents: 28, risk: "Medium" },
                        { dept: "Warehouse", incidents: 19, risk: "Low" }
                      ].map((dept, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <span className="font-medium">{dept.dept}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{dept.incidents} incidents</span>
                            <Badge className={
                              dept.risk === 'High' ? 'status-emergency' : 
                              dept.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                              'status-active'
                            }>
                              {dept.risk} Risk
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="access-logs" className="space-y-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-government" />
                  Detailed Access Logs
                </CardTitle>
                <CardDescription>Complete audit trail of health record access</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-6 gap-4 py-2 border-b font-semibold text-sm">
                    <span>Timestamp</span>
                    <span>Healthcare Provider</span>
                    <span>Action</span>
                    <span>Worker ID</span>
                    <span>Access Type</span>
                    <span>Status</span>
                  </div>
                  {mockStats.recentAccess.concat(mockStats.recentAccess).map((log, index) => (
                    <div key={index} className="grid grid-cols-6 gap-4 py-3 text-sm border-b border-border/50">
                      <span className="text-muted-foreground">{log.time}</span>
                      <span className="font-medium">{log.provider}</span>
                      <span>{log.action}</span>
                      <span className="font-mono">{log.workerId}</span>
                      <Badge className={log.type === 'emergency' ? 'status-emergency' : 'status-active'}>
                        {log.type}
                      </Badge>
                      <Badge className="status-active">Authorized</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-government" />
                  Official Profile
                </CardTitle>
                <CardDescription>Your government official information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Official ID:</span>
                      <Badge className="status-active">{governmentData.officialId}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Name:</span>
                      <span className="font-medium">{governmentData.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Department:</span>
                      <span className="font-medium">{governmentData.department}</span>
                    </div>
                    {governmentData.position && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Position:</span>
                        <span className="font-medium">{governmentData.position}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    {governmentData.clearanceLevel && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Clearance Level:</span>
                        <Badge className="bg-government/10 text-government">{governmentData.clearanceLevel}</Badge>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <Badge className={governmentData.status === "Active" ? "status-active" : "bg-yellow-100 text-yellow-800"}>
                        {governmentData.status}
                      </Badge>
                    </div>
                    {governmentData.email && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Email:</span>
                        <span className="text-sm">{governmentData.email}</span>
                      </div>
                    )}
                    {governmentData.phone && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Phone:</span>
                        <span className="text-sm">{governmentData.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Access Permissions</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• View aggregated health statistics</li>
                    <li>• Access audit logs and access trails</li>
                    <li>• Generate compliance reports</li>
                    <li>• Monitor emergency access events</li>
                    <li>• No access to individual health records</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GovernmentDashboard;