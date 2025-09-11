import { DocumentGrid } from './DocumentGrid';
import { QuickActions } from './QuickActions';
import { StatsOverview } from './StatsOverview';
import { UserRole } from '@/pages/Index';

interface RoleDashboardProps {
  role: UserRole;
  searchQuery: string;
  activeFilters: string[];
}

export const RoleDashboard = ({ role, searchQuery, activeFilters }: RoleDashboardProps) => {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <StatsOverview role={role} />
      
      {/* Quick Actions */}
      <QuickActions role={role} />
      
      {/* Document Grid */}
      <DocumentGrid 
        role={role} 
        searchQuery={searchQuery} 
        activeFilters={activeFilters} 
      />
    </div>
  );
};