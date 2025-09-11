import { Plus, Upload, Search, MessageSquare, AlertTriangle, CheckCircle, Clock, BarChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/pages/Index';

interface QuickAction {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  action: string;
}

interface QuickActionsProps {
  role: UserRole;
}

const roleActions: Record<UserRole, QuickAction[]> = {
  'station-controller': [
    {
      title: 'Report Safety Issue',
      description: 'Quick incident reporting',
      icon: AlertTriangle,
      color: 'bg-gradient-urgent text-destructive-foreground',
      action: 'report-safety'
    },
    {
      title: 'Complete Inspection',
      description: 'Mark daily checks complete',
      icon: CheckCircle,
      color: 'bg-success text-success-foreground',
      action: 'complete-inspection'
    },
    {
      title: 'Search Protocols',
      description: 'Find safety procedures',
      icon: Search,
      color: 'bg-primary text-primary-foreground',
      action: 'search-protocols'
    },
    {
      title: 'Staff Communication',
      description: 'Send updates to team',
      icon: MessageSquare,
      color: 'bg-accent text-accent-foreground',
      action: 'communicate'
    }
  ],
  'engineer': [
    {
      title: 'Log Maintenance',
      description: 'Record maintenance activity',
      icon: Plus,
      color: 'bg-primary text-primary-foreground',
      action: 'log-maintenance'
    },
    {
      title: 'Upload Drawings',
      description: 'Submit technical documents',
      icon: Upload,
      color: 'bg-success text-success-foreground',
      action: 'upload-drawings'
    },
    {
      title: 'Schedule Work',
      description: 'Plan maintenance tasks',
      icon: Clock,
      color: 'bg-warning text-warning-foreground',
      action: 'schedule-work'
    },
    {
      title: 'Generate Report',
      description: 'Technical status summary',
      icon: BarChart,
      color: 'bg-accent text-accent-foreground',
      action: 'generate-report'
    }
  ],
  'procurement': [
    {
      title: 'New Purchase Request',
      description: 'Initiate procurement process',
      icon: Plus,
      color: 'bg-primary text-primary-foreground',
      action: 'new-purchase'
    },
    {
      title: 'Upload Invoice',
      description: 'Submit vendor invoices',
      icon: Upload,
      color: 'bg-success text-success-foreground',
      action: 'upload-invoice'
    },
    {
      title: 'Vendor Search',
      description: 'Find approved vendors',
      icon: Search,
      color: 'bg-accent text-accent-foreground',
      action: 'vendor-search'
    },
    {
      title: 'Compliance Check',
      description: 'Verify contract status',
      icon: CheckCircle,
      color: 'bg-warning text-warning-foreground',
      action: 'compliance-check'
    }
  ],
  'hr': [
    {
      title: 'Schedule Training',
      description: 'Plan staff development',
      icon: Clock,
      color: 'bg-primary text-primary-foreground',
      action: 'schedule-training'
    },
    {
      title: 'Upload Policy',
      description: 'Distribute new policies',
      icon: Upload,
      color: 'bg-success text-success-foreground',
      action: 'upload-policy'
    },
    {
      title: 'Track Certifications',
      description: 'Monitor staff credentials',
      icon: CheckCircle,
      color: 'bg-warning text-warning-foreground',
      action: 'track-certs'
    },
    {
      title: 'Staff Directory',
      description: 'Search employee records',
      icon: Search,
      color: 'bg-accent text-accent-foreground',
      action: 'staff-directory'
    }
  ],
  'executive': [
    {
      title: 'Generate Dashboard',
      description: 'Create executive summary',
      icon: BarChart,
      color: 'bg-primary text-primary-foreground',
      action: 'generate-dashboard'
    },
    {
      title: 'Cross-Dept Review',
      description: 'View all department status',
      icon: Search,
      color: 'bg-success text-success-foreground',
      action: 'cross-dept-review'
    },
    {
      title: 'Compliance Report',
      description: 'System-wide compliance',
      icon: CheckCircle,
      color: 'bg-warning text-warning-foreground',
      action: 'compliance-report'
    },
    {
      title: 'Strategic Planning',
      description: 'Access planning documents',
      icon: MessageSquare,
      color: 'bg-accent text-accent-foreground',
      action: 'strategic-planning'
    }
  ]
};

export const QuickActions = ({ role }: QuickActionsProps) => {
  const actions = roleActions[role] || [];

  const handleAction = (action: string) => {
    // In a real app, this would trigger the appropriate action
    console.log(`Executing action: ${action}`);
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-base font-medium text-foreground">
          Quick Actions
        </CardTitle>
        <CardDescription className="text-sm">
          Frequently used tools for your role
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {actions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col gap-2 hover:shadow-hover transition-all duration-200"
                onClick={() => handleAction(action.action)}
              >
                <div className={`w-8 h-8 rounded-md flex items-center justify-center ${action.color}`}>
                  <IconComponent className="h-4 w-4" />
                </div>
                <div className="text-center">
                  <div className="text-xs font-medium">{action.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {action.description}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};