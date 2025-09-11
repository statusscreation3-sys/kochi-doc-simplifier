import { Bell, Menu, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserRole } from '@/pages/Index';

interface DashboardHeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const roleLabels = {
  'station-controller': 'Station Controller',
  'engineer': 'Engineer',
  'procurement': 'Procurement/Finance',
  'hr': 'Human Resources',
  'executive': 'Executive'
};

const roleColors = {
  'station-controller': 'bg-gradient-primary text-primary-foreground',
  'engineer': 'bg-success text-success-foreground',
  'procurement': 'bg-warning text-warning-foreground',
  'hr': 'bg-accent text-accent-foreground',
  'executive': 'bg-gradient-urgent text-destructive-foreground'
};

export const DashboardHeader = ({ currentRole, onRoleChange }: DashboardHeaderProps) => {
  return (
    <header className="border-b bg-card shadow-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">K</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">KMRL Dashboard</h1>
              <p className="text-sm text-muted-foreground">Document Intelligence System</p>
            </div>
          </div>

          {/* Role Selector and Actions */}
          <div className="flex items-center space-x-3">
            {/* Role Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{roleLabels[currentRole]}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {Object.entries(roleLabels).map(([role, label]) => (
                  <DropdownMenuItem
                    key={role}
                    onClick={() => onRoleChange(role as UserRole)}
                    className={currentRole === role ? 'bg-primary text-primary-foreground' : ''}
                  >
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className={`absolute -top-2 -right-2 ${roleColors[currentRole]} text-xs px-1 min-w-[1rem] h-5`}>
                3
              </Badge>
            </Button>

            {/* Menu */}
            <Button variant="outline" size="icon" className="sm:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Role Badge */}
        <div className="mt-3 sm:hidden">
          <Badge className={`${roleColors[currentRole]} px-3 py-1`}>
            {roleLabels[currentRole]}
          </Badge>
        </div>
      </div>
    </header>
  );
};