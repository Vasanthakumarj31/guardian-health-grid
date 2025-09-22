import { useState } from "react";
import { QrCode, Shield, IdCard, AlertTriangle, Download, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface WorkerDashboardProps {
  workerData: {
    workerId: string;
    name: string;
    department: string;
    status: string;
    email?: string;
    phone?: string;
  };
  onBack: () => void;
}

const WorkerDashboard = ({ workerData, onBack }: WorkerDashboardProps) => {
  const [showQRCode, setShowQRCode] = useState(false);

  const generateQRCode = () => {
    setShowQRCode(!showQRCode);
    toast({
      title: "QR Code Generated",
      description: "Your secure QR code is ready for use",
    });
  };

  const generateEmergencyCard = () => {
    toast({
      title: "Emergency Card Generated",
      description: "Your emergency access card has been created and will be sent securely",
    });
  };

  const downloadCard = () => {
    toast({
      title: "Card Downloaded",
      description: "Your Worker Card has been downloaded successfully",
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
            <Shield className="w-12 h-12" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Worker Dashboard</h1>
        <p className="text-white/80">Welcome, {workerData.name}</p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Worker Information */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IdCard className="w-5 h-5 text-worker" />
              Worker Information
            </CardTitle>
            <CardDescription>Your secure worker profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Worker ID:</span>
                <Badge className="status-active">{workerData.workerId}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Name:</span>
                <span className="font-medium">{workerData.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Department:</span>
                <span className="font-medium">{workerData.department}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge className="status-active">{workerData.status}</Badge>
              </div>
              {workerData.email && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <span className="text-sm">{workerData.email}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* QR Code Generator */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-worker" />
              QR Code Access
            </CardTitle>
            <CardDescription>Generate secure QR code for identification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {showQRCode ? (
              <div className="text-center">
                <div className="bg-white p-4 rounded-lg inline-block mb-4">
                  <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded">
                    <QrCode className="w-16 h-16 text-gray-400" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  QR Code for Worker ID: {workerData.workerId}
                </p>
                <Button onClick={downloadCard} className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download QR Code
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Generate a secure QR code for quick identification and access
                </p>
                <Button onClick={generateQRCode} className="w-full bg-worker hover:bg-worker/90">
                  <QrCode className="w-4 h-4 mr-2" />
                  Generate QR Code
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Emergency Access Card */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-emergency" />
              Emergency Access Card
            </CardTitle>
            <CardDescription>Generate secure card for emergency situations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-emergency/5 rounded-lg border border-emergency/20">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-emergency mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-emergency">Emergency Use Only</p>
                  <p className="text-emergency/80 mt-1">
                    This card provides healthcare professionals with emergency access to your health records when you cannot provide consent.
                  </p>
                </div>
              </div>
            </div>
            <Button onClick={generateEmergencyCard} className="w-full" variant="outline">
              <IdCard className="w-4 h-4 mr-2" />
              Generate Emergency Card
            </Button>
          </CardContent>
        </Card>

        {/* Privacy Notice */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-secondary" />
              Privacy Protection
            </CardTitle>
            <CardDescription>Your health record privacy rights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                <p className="text-sm text-muted-foreground">
                  You cannot view your own health records through this portal for privacy protection
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                <p className="text-sm text-muted-foreground">
                  Only authorized healthcare professionals can access your records with proper authentication
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                <p className="text-sm text-muted-foreground">
                  Emergency access cards can be used by medical staff in critical situations
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                <p className="text-sm text-muted-foreground">
                  All access attempts are logged and monitored for security
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkerDashboard;