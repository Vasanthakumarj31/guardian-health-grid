import { useState } from "react";
import { ArrowLeft, Building2, Shield, FileText, BarChart3, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import GovernmentDashboard from "@/components/GovernmentDashboard";

interface GovernmentLoginProps {
  onBack: () => void;
}

const GovernmentLogin = ({ onBack }: GovernmentLoginProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [governmentData, setGovernmentData] = useState<any>(null);

  const handleLogin = (formData: FormData) => {
    const officialId = formData.get('officialId') as string;
    const password = formData.get('password') as string;

    if (officialId && password) {
      // Mock authentication
      setGovernmentData({
        officialId,
        name: "Director Emily Chen",
        department: "Department of Health",
        clearanceLevel: "Level 3",
        status: "Active"
      });
      setIsLoggedIn(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the Government Portal",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Please provide valid credentials",
        variant: "destructive",
      });
    }
  };

  const handleRegister = (formData: FormData) => {
    const name = formData.get('name') as string;
    const department = formData.get('department') as string;
    const position = formData.get('position') as string;
    const clearanceLevel = formData.get('clearanceLevel') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    if (name && department && position && clearanceLevel && email && phone) {
      // Mock registration - generate official ID
      const newOfficialId = `GOV${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;
      
      setGovernmentData({
        officialId: newOfficialId,
        name,
        department,
        position,
        clearanceLevel,
        email,
        phone,
        status: "Pending Clearance"
      });
      setIsLoggedIn(true);
      
      toast({
        title: "Registration Successful",
        description: `Your Official ID is: ${newOfficialId}`,
      });
    } else {
      toast({
        title: "Registration Failed",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };

  if (isLoggedIn && governmentData) {
    return <GovernmentDashboard governmentData={governmentData} onBack={onBack} />;
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center text-white mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="absolute top-8 left-8 text-white hover:text-white/80"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
              <Building2 className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Government Portal</h1>
          <p className="text-white/80">Secure access for government officials</p>
        </div>

        {/* Login/Register Form */}
        <Card className="medical-card">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-government" />
                  Official Login
                </CardTitle>
                <CardDescription>
                  Secure access with government credentials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleLogin(formData);
                }}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="officialId">Official ID</Label>
                      <Input
                        id="officialId"
                        name="officialId"
                        placeholder="GOV12345"
                        className="medical-input"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Secure Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        className="medical-input"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-government hover:bg-government/90">
                      <Shield className="w-4 h-4 mr-2" />
                      Secure Access
                    </Button>
                  </div>
                </form>
                
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-yellow-800">Privacy Protection</p>
                      <p className="text-yellow-700 mt-1">
                        Government officials cannot access individual health records. 
                        Only aggregated statistics and access logs are available.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="register">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-government" />
                  Official Registration
                </CardTitle>
                <CardDescription>
                  Register with government department credentials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleRegister(formData);
                }}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Director Emily Chen"
                        className="medical-input"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        name="department"
                        placeholder="Department of Health"
                        className="medical-input"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Position/Title</Label>
                      <Input
                        id="position"
                        name="position"
                        placeholder="Director, Analyst, etc."
                        className="medical-input"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clearanceLevel">Security Clearance Level</Label>
                      <Input
                        id="clearanceLevel"
                        name="clearanceLevel"
                        placeholder="Level 1, Level 2, Level 3"
                        className="medical-input"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Official Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="official@government.gov"
                        className="medical-input"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Official Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="medical-input"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-government hover:bg-government/90">
                      <FileText className="w-4 h-4 mr-2" />
                      Submit for Clearance
                    </Button>
                  </div>
                </form>
                
                <div className="mt-6 p-4 bg-accent rounded-lg">
                  <div className="flex items-start gap-2">
                    <BarChart3 className="w-5 h-5 text-government mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-accent-foreground">Access Privileges</p>
                      <ul className="text-accent-foreground/80 mt-1 space-y-1">
                        <li>• Real-time access logs and audit trails</li>
                        <li>• Aggregated health statistics</li>
                        <li>• Disease and accident trend analysis</li>
                        <li>• No individual record access</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default GovernmentLogin;