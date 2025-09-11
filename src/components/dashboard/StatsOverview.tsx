import { TrendingUp, TrendingDown, FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRole } from '@/pages/Index';

interface Stat {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  description: string;
  icon: React.ElementType;
}

interface StatsOverviewProps {
  role: UserRole;
}

const roleStats: Record<UserRole, Stat[]> = {
  'station-controller': [
    {
      title: 'Safety Checks',
      value: '12/15',
      change: '+2 today',
      trend: 'up',
      description: 'Completed today',
      icon: CheckCircle
    },
    {
      title: 'Pending Reports',
      value: '3',
      change: '-1 from yesterday',
      trend: 'down',
      description: 'Requires attention',
      icon: FileText
    },
    {
      title: 'Critical Alerts',
      value: '1',
      change: 'New in last hour',
      trend: 'up',
      description: 'Active issues',
      icon: AlertTriangle
    }
  ],
  'engineer': [
    {
      title: 'Maintenance Tasks',
      value: '8/12',
      change: '+3 completed',
      trend: 'up',
      description: 'This week',
      icon: CheckCircle
    },
    {
      title: 'Technical Docs',
      value: '24',
      change: '+5 new',
      trend: 'up',
      description: 'Updated this month',
      icon: FileText
    },
    {
      title: 'Pending Approvals',
      value: '2',
      change: 'Urgent',
      trend: 'stable',
      description: 'Design changes',
      icon: Clock
    }
  ],
  'procurement': [
    {
      title: 'Active Contracts',
      value: '45',
      change: '+2 renewed',
      trend: 'up',
      description: 'Total portfolio',
      icon: FileText
    },
    {
      title: 'Pending Invoices',
      value: '12',
      change: '-3 processed',
      trend: 'down',
      description: 'Awaiting approval',
      icon: Clock
    },
    {
      title: 'Vendor Compliance',
      value: '98%',
      change: '+2%',
      trend: 'up',
      description: 'Current rate',
      icon: CheckCircle
    }
  ],
  'hr': [
    {
      title: 'Staff Training',
      value: '85%',
      change: '+5% this month',
      trend: 'up',
      description: 'Completion rate',
      icon: CheckCircle
    },
    {
      title: 'Policy Updates',
      value: '6',
      change: '2 new this week',
      trend: 'up',
      description: 'Recent changes',
      icon: FileText
    },
    {
      title: 'Certifications Due',
      value: '15',
      change: '5 urgent',
      trend: 'up',
      description: 'Next 30 days',
      icon: AlertTriangle
    }
  ],
  'executive': [
    {
      title: 'Overall Compliance',
      value: '94%',
      change: '+2%',
      trend: 'up',
      description: 'System-wide',
      icon: CheckCircle
    },
    {
      title: 'Reports Pending',
      value: '8',
      change: '3 overdue',
      trend: 'up',
      description: 'Department summaries',
      icon: Clock
    },
    {
      title: 'Critical Issues',
      value: '2',
      change: '-1 resolved',
      trend: 'down',
      description: 'Cross-department',
      icon: AlertTriangle
    }
  ]
};

const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
  switch (trend) {
    case 'up':
      return <TrendingUp className="h-4 w-4 text-success" />;
    case 'down':
      return <TrendingDown className="h-4 w-4 text-destructive" />;
    default:
      return <Clock className="h-4 w-4 text-warning" />;
  }
};

const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
  switch (trend) {
    case 'up':
      return 'text-success';
    case 'down':
      return 'text-destructive';
    default:
      return 'text-warning';
  }
};

export const StatsOverview = ({ role }: StatsOverviewProps) => {
  const stats = roleStats[role] || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index} className="shadow-card hover:shadow-hover transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <IconComponent className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center space-x-1 text-xs">
                {getTrendIcon(stat.trend)}
                <span className={getTrendColor(stat.trend)}>
                  {stat.change}
                </span>
              </div>
              <CardDescription className="mt-1 text-xs">
                {stat.description}
              </CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};