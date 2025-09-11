import { AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/pages/Index';

interface Alert {
  id: string;
  title: string;
  description: string;
  urgency: 'critical' | 'high' | 'medium' | 'low';
  type: 'safety' | 'compliance' | 'operational' | 'maintenance';
  deadline?: string;
  department: string;
  isNew?: boolean;
}

interface AlertsSectionProps {
  role: UserRole;
}

const mockAlerts: Record<UserRole, Alert[]> = {
  'station-controller': [
    {
      id: '1',
      title: 'Platform Safety Check Required',
      description: 'Daily platform safety inspection pending for Aluva Station',
      urgency: 'critical',
      type: 'safety',
      deadline: '2 hours',
      department: 'Operations',
      isNew: true
    },
    {
      id: '2',
      title: 'Passenger Flow Alert',
      description: 'High passenger volume expected at MG Road during evening rush',
      urgency: 'high',
      type: 'operational',
      deadline: '30 minutes',
      department: 'Operations'
    }
  ],
  'engineer': [
    {
      id: '3',
      title: 'Track Maintenance Scheduled',
      description: 'Section 12A-15B requires maintenance approval and resource allocation',
      urgency: 'high',
      type: 'maintenance',
      deadline: '1 day',
      department: 'Engineering',
      isNew: true
    }
  ],
  'procurement': [
    {
      id: '4',
      title: 'Vendor Contract Expiry',
      description: 'Cleaning services contract expires in 7 days - renewal required',
      urgency: 'high',
      type: 'compliance',
      deadline: '7 days',
      department: 'Procurement'
    }
  ],
  'hr': [
    {
      id: '5',
      title: 'Training Compliance Due',
      description: '15 staff members need safety certification renewal',
      urgency: 'medium',
      type: 'compliance',
      deadline: '5 days',
      department: 'HR'
    }
  ],
  'executive': [
    {
      id: '6',
      title: 'Monthly Compliance Report',
      description: 'Safety and operational compliance summary ready for review',
      urgency: 'medium',
      type: 'compliance',
      deadline: 'Today',
      department: 'All Departments'
    }
  ]
};

const urgencyColors = {
  critical: 'bg-gradient-urgent text-destructive-foreground animate-pulse-glow',
  high: 'bg-destructive text-destructive-foreground',
  medium: 'bg-warning text-warning-foreground',
  low: 'bg-muted text-muted-foreground'
};

const typeIcons = {
  safety: AlertTriangle,
  compliance: CheckCircle,
  operational: Clock,
  maintenance: XCircle
};

export const AlertsSection = ({ role }: AlertsSectionProps) => {
  const alerts = mockAlerts[role] || [];

  if (alerts.length === 0) {
    return (
      <Card className="bg-gradient-card border-success/20">
        <CardContent className="flex items-center gap-3 py-4">
          <CheckCircle className="h-5 w-5 text-success" />
          <p className="text-success font-medium">All clear - no urgent alerts for your role</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          Priority Alerts
        </h2>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {alerts.map((alert) => {
          const IconComponent = typeIcons[alert.type];
          return (
            <Card 
              key={alert.id} 
              className="shadow-card hover:shadow-hover transition-all duration-200 cursor-pointer"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-4 w-4" />
                    <CardTitle className="text-sm font-medium">{alert.title}</CardTitle>
                  </div>
                  {alert.isNew && (
                    <Badge className="bg-accent text-accent-foreground text-xs">New</Badge>
                  )}
                </div>
                <CardDescription className="text-xs">
                  {alert.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <Badge className={`text-xs px-2 py-1 ${urgencyColors[alert.urgency]}`}>
                    {alert.urgency.toUpperCase()}
                  </Badge>
                  {alert.deadline && (
                    <span className="text-xs text-muted-foreground">
                      Due: {alert.deadline}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};