import { useState } from "react";
import { ArrowLeft, User, Shield, QrCode, IdCard, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import WorkerDashboard from "@/components/WorkerDashboard";

interface WorkerLoginProps {
  onBack: () => void;
}

const WorkerLogin = ({ onBack }: WorkerLoginProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [workerData, setWorkerData] = useState<any>(null);

  const handleLogin = (formData: FormData) => {
    const workerId = formData.get('workerId') as string;
    const password = formData.get('password') as string;

    if (workerId && password) {
      // Mock authentication
      setWorkerData({
        workerId,
        name: "John Doe",
        department: "Construction",
        status: "Active"
      });
      setIsLoggedIn(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the Worker Portal",
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
    const email = formData.get('email') as string;
    const department = formData.get('department') as string;
    const phone = formData.get('phone') as string;

    if (name && email && department && phone) {
      // Mock registration - generate worker ID
      const newWorkerId = `WKR${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;
      
      setWorkerData({
        workerId: newWorkerId,
        name,
        email,
        department,
        phone,
        status: "Active"
      });
      setIsLoggedIn(true);
      
      toast({
        title: "Registration Successful",
        description: `Your Worker ID is: ${newWorkerId}`,
      });
    } else {
      toast({
        title: "Registration Failed",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };

  if (isLoggedIn && workerData) {
    return <WorkerDashboard workerData={workerData} onBack={onBack} />;
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
              <User className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Worker Portal</h1>
          <p className="text-white/80">Secure access for workplace health records</p>
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
                  <Shield className="w-5 h-5 text-worker" />
                  Worker Login
                </CardTitle>
                <CardDescription>
                  Enter your Worker ID and password to access your portal
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
                      <Label htmlFor="workerId">Worker ID</Label>
                      <Input
                        id="workerId"
                        name="workerId"
                        placeholder="WKR12345"
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
                    <Button type="submit" className="w-full bg-worker hover:bg-worker/90">
                      <Shield className="w-4 h-4 mr-2" />
                      Secure Login
                    </Button>
                  </div>
                </form>
                
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-yellow-800">Privacy Notice</p>
                      <p className="text-yellow-700 mt-1">
                        Workers cannot view their own health records for privacy protection. 
                        You can only generate emergency access cards.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="register">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IdCard className="w-5 h-5 text-worker" />
                  Worker Registration
                </CardTitle>
                <CardDescription>
                  Create your secure worker account with unique ID
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
                        placeholder="John Doe"
                        className="medical-input"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john.doe@company.com"
                        className="medical-input"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        name="department"
                        placeholder="Construction, Manufacturing, etc."
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
                    <Button type="submit" className="w-full bg-worker hover:bg-worker/90">
                      <QrCode className="w-4 h-4 mr-2" />
                      Register & Generate ID
                    </Button>
                  </div>
                </form>
                
                <div className="mt-6 p-4 bg-accent rounded-lg">
                  <div className="flex items-start gap-2">
                    <QrCode className="w-5 h-5 text-secondary mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-accent-foreground">Registration Benefits</p>
                      <ul className="text-accent-foreground/80 mt-1 space-y-1">
                        <li>• Unique Worker ID with QR code</li>
                        <li>• Emergency access card generation</li>
                        <li>• Secure workplace identification</li>
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

export default WorkerLogin;