import { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { AlertsSection } from '@/components/dashboard/AlertsSection';
import { DocumentGrid } from '@/components/dashboard/DocumentGrid';
import { FilterBar } from '@/components/dashboard/FilterBar';
import { RoleDashboard } from '@/components/dashboard/RoleDashboard';

export type UserRole = 'station-controller' | 'engineer' | 'procurement' | 'hr' | 'executive';

const Index = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>('station-controller');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        currentRole={currentRole} 
        onRoleChange={setCurrentRole} 
      />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Alerts Section - Always visible */}
        <AlertsSection role={currentRole} />
        
        {/* Search and Filters */}
        <FilterBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilters={activeFilters}
          onFiltersChange={setActiveFilters}
          role={currentRole}
        />
        
        {/* Role-specific Dashboard */}
        <RoleDashboard 
          role={currentRole}
          searchQuery={searchQuery}
          activeFilters={activeFilters}
        />
      </main>
    </div>
  );
};

export default Index;