import { useState } from "react";
import { Shield, Stethoscope, Building2, Heart, QrCode, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import WorkerLogin from "@/components/WorkerLogin";
import HealthcareLogin from "@/components/HealthcareLogin";
import GovernmentLogin from "@/components/GovernmentLogin";

const Index = () => {
  const [activeView, setActiveView] = useState<'home' | 'worker' | 'healthcare' | 'government'>('home');

  const renderActiveView = () => {
    switch (activeView) {
      case 'worker':
        return <WorkerLogin onBack={() => setActiveView('home')} />;
      case 'healthcare':
        return <HealthcareLogin onBack={() => setActiveView('home')} />;
      case 'government':
        return <GovernmentLogin onBack={() => setActiveView('home')} />;
      default:
        return <HomePage onSelectView={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-hero)] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute bottom-40 right-32 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
      </div>
      
      <div className="relative z-10">
        {renderActiveView()}
      </div>
    </div>
  );
};

const HomePage = ({ onSelectView }: { onSelectView: (view: 'worker' | 'healthcare' | 'government') => void }) => {
  return (
    <div className="container mx-auto px-6 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16 text-white">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
            <Heart className="w-16 h-16" />
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
          Secure Health Records System
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
          Advanced multilingual health record management with three-tier security access for workers, healthcare professionals, and government officials.
        </p>
        <div className="flex items-center justify-center gap-2 text-white/80">
          <Shield className="w-5 h-5" />
          <span>Secure • Multilingual • HIPAA Compliant</span>
        </div>
      </div>

      {/* Login Options Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Worker Login */}
        <Card className="medical-card hover:scale-105 transition-[var(--transition-bounce)] cursor-pointer group" 
              onClick={() => onSelectView('worker')}>
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 p-4 bg-worker/10 rounded-full w-fit group-hover:bg-worker/20 transition-colors">
              <QrCode className="w-8 h-8 text-worker" />
            </div>
            <CardTitle className="text-2xl text-worker">Worker Portal</CardTitle>
            <CardDescription className="text-muted-foreground">
              Register with Worker ID and manage emergency access cards
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>Unique Worker ID Registration</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <QrCode className="w-4 h-4" />
                <span>QR Code Generation</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertTriangle className="w-4 h-4" />
                <span>Emergency Access Cards</span>
              </div>
            </div>
            <Button className="w-full medical-button-primary bg-worker hover:bg-worker/90">
              Access Worker Portal
            </Button>
          </CardContent>
        </Card>

        {/* Healthcare Login */}
        <Card className="medical-card hover:scale-105 transition-[var(--transition-bounce)] cursor-pointer group"
              onClick={() => onSelectView('healthcare')}>
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 p-4 bg-healthcare/10 rounded-full w-fit group-hover:bg-healthcare/20 transition-colors">
              <Stethoscope className="w-8 h-8 text-healthcare" />
            </div>
            <CardTitle className="text-2xl text-healthcare">Healthcare Portal</CardTitle>
            <CardDescription className="text-muted-foreground">
              Medical professionals access with OTP and fingerprint verification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>Professional Registration</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Stethoscope className="w-4 h-4" />
                <span>Patient Record Access</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertTriangle className="w-4 h-4" />
                <span>Break Glass Emergency Access</span>
              </div>
            </div>
            <Button className="w-full medical-button-secondary bg-healthcare hover:bg-healthcare/90">
              Access Healthcare Portal
            </Button>
          </CardContent>
        </Card>

        {/* Government Login */}
        <Card className="medical-card hover:scale-105 transition-[var(--transition-bounce)] cursor-pointer group"
              onClick={() => onSelectView('government')}>
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 p-4 bg-government/10 rounded-full w-fit group-hover:bg-government/20 transition-colors">
              <Building2 className="w-8 h-8 text-government" />
            </div>
            <CardTitle className="text-2xl text-government">Government Portal</CardTitle>
            <CardDescription className="text-muted-foreground">
              Officials access aggregated statistics and audit logs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>Official Registration</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="w-4 h-4" />
                <span>Aggregate Statistics</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertTriangle className="w-4 h-4" />
                <span>Real-time Access Logs</span>
              </div>
            </div>
            <Button className="w-full medical-button-government bg-government hover:bg-government/90">
              Access Government Portal
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Features Section */}
      <div className="mt-20 text-center text-white">
        <h2 className="text-3xl font-bold mb-8">Security Features</h2>
        <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
            <Shield className="w-12 h-12 mx-auto mb-4 text-white" />
            <h3 className="text-lg font-semibold mb-2">Multi-Layer Security</h3>
            <p className="text-white/80 text-sm">Three-tier authentication with role-based access control</p>
          </div>
          <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
            <QrCode className="w-12 h-12 mx-auto mb-4 text-white" />
            <h3 className="text-lg font-semibold mb-2">QR Code Access</h3>
            <p className="text-white/80 text-sm">Secure QR codes for emergency access and identification</p>
          </div>
          <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
            <Heart className="w-12 h-12 mx-auto mb-4 text-white" />
            <h3 className="text-lg font-semibold mb-2">HIPAA Compliant</h3>
            <p className="text-white/80 text-sm">Full compliance with healthcare privacy regulations</p>
          </div>
          <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
            <Building2 className="w-12 h-12 mx-auto mb-4 text-white" />
            <h3 className="text-lg font-semibold mb-2">Audit Trails</h3>
            <p className="text-white/80 text-sm">Complete access logging and statistical reporting</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;