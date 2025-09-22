import { useState } from "react";
import { Stethoscope, Search, AlertTriangle, FileText, Shield, ArrowLeft, User, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

interface HealthcareDashboardProps {
  healthcareData: {
    name: string;
    licenseNumber: string;
    specialty: string;
    hospital: string;
    status: string;
    email?: string;
    phone?: string;
  };
  onBack: () => void;
}

const HealthcareDashboard = ({ healthcareData, onBack }: HealthcareDashboardProps) => {
  const [searchWorkerId, setSearchWorkerId] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [emergencyAccess, setEmergencyAccess] = useState(false);

  const searchPatient = () => {
    if (!searchWorkerId) {
      toast({
        title: "Search Required",
        description: "Please enter a Worker ID to search",
        variant: "destructive",
      });
      return;
    }

    // Mock patient data
    const mockPatient = {
      workerId: searchWorkerId,
      name: "John Doe",
      age: 35,
      department: "Construction",
      lastVisit: "2024-01-15",
      conditions: ["Hypertension", "Diabetes Type 2"],
      medications: ["Metformin", "Lisinopril"],
      allergies: ["Penicillin"],
      emergencyContact: "+1 (555) 987-6543"
    };

    setSelectedPatient(mockPatient);
    toast({
      title: "Patient Found",
      description: `Records found for Worker ID: ${searchWorkerId}`,
    });
  };

  const verifyOTP = () => {
    if (otpCode.length === 6) {
      toast({
        title: "OTP Verified",
        description: "Access granted to patient records",
      });
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP code",
        variant: "destructive",
      });
    }
  };

  const simulateFingerprint = () => {
    toast({
      title: "Fingerprint Verified",
      description: "Biometric authentication successful",
    });
  };

  const breakGlassAccess = () => {
    setEmergencyAccess(true);
    toast({
      title: "Emergency Access Activated",
      description: "Break Glass access granted - This action is logged",
    });
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
            <Stethoscope className="w-12 h-12" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Healthcare Dashboard</h1>
        <p className="text-white/80">Welcome, {healthcareData.name}</p>
      </div>

      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search">Patient Search</TabsTrigger>
            <TabsTrigger value="emergency">Emergency Access</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Patient Search */}
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5 text-healthcare" />
                    Patient Record Search
                  </CardTitle>
                  <CardDescription>Search patient records using Worker ID</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="workerId">Worker ID</Label>
                    <Input
                      id="workerId"
                      placeholder="Enter Worker ID (e.g., WKR12345)"
                      value={searchWorkerId}
                      onChange={(e) => setSearchWorkerId(e.target.value)}
                      className="medical-input"
                    />
                  </div>
                  <Button onClick={searchPatient} className="w-full bg-healthcare hover:bg-healthcare/90">
                    <Search className="w-4 h-4 mr-2" />
                    Search Patient
                  </Button>
                </CardContent>
              </Card>

              {/* Authentication */}
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-healthcare" />
                    Two-Factor Authentication
                  </CardTitle>
                  <CardDescription>Verify your identity to access records</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">OTP Code</Label>
                    <Input
                      id="otp"
                      placeholder="Enter 6-digit OTP"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      maxLength={6}
                      className="medical-input"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={verifyOTP} variant="outline">
                      Verify OTP
                    </Button>
                    <Button onClick={simulateFingerprint} variant="outline">
                      <Fingerprint className="w-4 h-4 mr-2" />
                      Fingerprint
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Patient Records */}
            {selectedPatient && (
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-healthcare" />
                    Patient Medical Records
                  </CardTitle>
                  <CardDescription>Worker ID: {selectedPatient.workerId}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Basic Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Name:</span>
                          <span>{selectedPatient.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Age:</span>
                          <span>{selectedPatient.age}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Department:</span>
                          <span>{selectedPatient.department}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last Visit:</span>
                          <span>{selectedPatient.lastVisit}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Medical History</h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Conditions:</p>
                          <div className="space-y-1">
                            {selectedPatient.conditions.map((condition: string, index: number) => (
                              <Badge key={index} variant="outline" className="mr-1">
                                {condition}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Medications:</p>
                          <div className="space-y-1">
                            {selectedPatient.medications.map((medication: string, index: number) => (
                              <Badge key={index} className="status-active mr-1">
                                {medication}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Alerts & Allergies</h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Allergies:</p>
                          {selectedPatient.allergies.map((allergy: string, index: number) => (
                            <Badge key={index} className="status-emergency mr-1">
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-muted-foreground">Emergency Contact:</p>
                          <p className="text-sm font-medium">{selectedPatient.emergencyContact}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="emergency" className="space-y-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-emergency" />
                  Break Glass Emergency Access
                </CardTitle>
                <CardDescription>Emergency access to patient records without standard authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-emergency/5 rounded-lg border border-emergency/20">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-emergency mt-0.5" />
                    <div>
                      <p className="font-medium text-emergency">Emergency Access Warning</p>
                      <p className="text-emergency/80 text-sm mt-1">
                        This action bypasses normal authentication and is only for life-threatening emergencies. 
                        All access is logged and audited.
                      </p>
                    </div>
                  </div>
                </div>
                
                {!emergencyAccess ? (
                  <Button onClick={breakGlassAccess} className="w-full" variant="destructive">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Activate Emergency Access
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-secondary/10 rounded-lg">
                      <p className="text-secondary font-medium">Emergency Access Activated</p>
                      <p className="text-secondary/80 text-sm">You now have access to patient records without standard authentication.</p>
                    </div>
                    <Input
                      placeholder="Enter Worker ID for emergency access"
                      value={searchWorkerId}
                      onChange={(e) => setSearchWorkerId(e.target.value)}
                      className="medical-input"
                    />
                    <Button onClick={searchPatient} className="w-full bg-emergency hover:bg-emergency/90">
                      <Search className="w-4 h-4 mr-2" />
                      Emergency Patient Search
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-healthcare" />
                  Professional Profile
                </CardTitle>
                <CardDescription>Your healthcare professional information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Name:</span>
                      <span className="font-medium">{healthcareData.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">License:</span>
                      <Badge className="status-active">{healthcareData.licenseNumber}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Specialty:</span>
                      <span className="font-medium">{healthcareData.specialty}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Hospital:</span>
                      <span className="font-medium">{healthcareData.hospital}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <Badge className={healthcareData.status === "Verified" ? "status-active" : "bg-yellow-100 text-yellow-800"}>
                        {healthcareData.status}
                      </Badge>
                    </div>
                    {healthcareData.email && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Email:</span>
                        <span className="text-sm">{healthcareData.email}</span>
                      </div>
                    )}
                    {healthcareData.phone && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Phone:</span>
                        <span className="text-sm">{healthcareData.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HealthcareDashboard;