import { useState } from "react";
import { ArrowLeft, Stethoscope, Shield, Fingerprint, Smartphone, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import HealthcareDashboard from "@/components/HealthcareDashboard";

interface HealthcareLoginProps {
  onBack: () => void;
}

const HealthcareLogin = ({ onBack }: HealthcareLoginProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [healthcareData, setHealthcareData] = useState<any>(null);

  const handleLogin = (formData: FormData) => {
    const licenseNumber = formData.get('licenseNumber') as string;
    const password = formData.get('password') as string;

    if (licenseNumber && password) {
      // Mock authentication
      setHealthcareData({
        licenseNumber,
        name: "Dr. Sarah Johnson",
        specialty: "Emergency Medicine",
        hospital: "City General Hospital",
        status: "Verified"
      });
      setIsLoggedIn(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the Healthcare Portal",
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
    const licenseNumber = formData.get('licenseNumber') as string;
    const specialty = formData.get('specialty') as string;
    const hospital = formData.get('hospital') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    if (name && licenseNumber && specialty && hospital && email && phone) {
      setHealthcareData({
        name,
        licenseNumber,
        specialty,
        hospital,
        email,
        phone,
        status: "Pending Verification"
      });
      setIsLoggedIn(true);
      
      toast({
        title: "Registration Successful",
        description: "Your account is pending verification",
      });
    } else {
      toast({
        title: "Registration Failed",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };

  if (isLoggedIn && healthcareData) {
    return <HealthcareDashboard healthcareData={healthcareData} onBack={onBack} />;
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
              <Stethoscope className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Healthcare Portal</h1>
          <p className="text-white/80">Secure access for medical professionals</p>
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
                  <Shield className="w-5 h-5 text-healthcare" />
                  Healthcare Login
                </CardTitle>
                <CardDescription>
                  Secure access with medical license verification
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
                      <Label htmlFor="licenseNumber">Medical License Number</Label>
                      <Input
                        id="licenseNumber"
                        name="licenseNumber"
                        placeholder="MD123456"
                        className="medical-input"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        className="medical-input"
                        required
                      />
                    </div>
                    
                    {/* Two-Factor Options */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex items-center gap-2 h-12"
                          onClick={() => toast({ title: "OTP Sent", description: "Check your phone for verification code" })}
                        >
                          <Smartphone className="w-4 h-4" />
                          Send OTP
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="flex items-center gap-2 h-12"
                          onClick={() => toast({ title: "Fingerprint Ready", description: "Please scan your fingerprint" })}
                        >
                          <Fingerprint className="w-4 h-4" />
                          Fingerprint
                        </Button>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full bg-healthcare hover:bg-healthcare/90">
                      <Shield className="w-4 h-4 mr-2" />
                      Secure Login
                    </Button>
                  </div>
                </form>
                
                <div className="mt-6 p-4 bg-accent rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-healthcare mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-accent-foreground">Break Glass Access</p>
                      <p className="text-accent-foreground/80 mt-1">
                        Emergency access to patient records using Worker Card available for critical situations.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="register">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-healthcare" />
                  Professional Registration
                </CardTitle>
                <CardDescription>
                  Register with professional credentials
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
                        placeholder="Dr. Sarah Johnson"
                        className="medical-input"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">Medical License Number</Label>
                      <Input
                        id="licenseNumber"
                        name="licenseNumber"
                        placeholder="MD123456"
                        className="medical-input"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialty">Medical Specialty</Label>
                      <Input
                        id="specialty"
                        name="specialty"
                        placeholder="Emergency Medicine, Cardiology, etc."
                        className="medical-input"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hospital">Hospital/Clinic</Label>
                      <Input
                        id="hospital"
                        name="hospital"
                        placeholder="City General Hospital"
                        className="medical-input"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Professional Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="doctor@hospital.com"
                        className="medical-input"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="medical-input"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-healthcare hover:bg-healthcare/90">
                      <Stethoscope className="w-4 h-4 mr-2" />
                      Register Professional Account
                    </Button>
                  </div>
                </form>
                
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-healthcare mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-muted-foreground">Verification Process</p>
                      <ul className="text-muted-foreground/80 mt-1 space-y-1">
                        <li>• Medical license verification required</li>
                        <li>• Hospital credentials validation</li>
                        <li>• Two-factor authentication setup</li>
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

export default HealthcareLogin;