import { Search, Filter, Calendar, Building2, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserRole } from '@/pages/Index';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilters: string[];
  onFiltersChange: (filters: string[]) => void;
  role: UserRole;
}

const departmentFilters = {
  'station-controller': ['Operations', 'Safety', 'Security', 'Customer Service'],
  'engineer': ['Engineering', 'Maintenance', 'Infrastructure', 'Technical'],
  'procurement': ['Procurement', 'Finance', 'Vendor Management', 'Contracts'],
  'hr': ['Human Resources', 'Training', 'Compliance', 'Staffing'],
  'executive': ['All Departments', 'Operations', 'Engineering', 'Finance', 'HR']
};

const urgencyFilters = ['Critical', 'High', 'Medium', 'Low'];
const typeFilters = ['Safety', 'Compliance', 'Operational', 'Maintenance', 'Administrative'];

export const FilterBar = ({ 
  searchQuery, 
  onSearchChange, 
  activeFilters, 
  onFiltersChange,
  role 
}: FilterBarProps) => {
  const availableDepartments = departmentFilters[role] || [];

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      onFiltersChange(activeFilters.filter(f => f !== filter));
    } else {
      onFiltersChange([...activeFilters, filter]);
    }
  };

  const clearFilters = () => {
    onFiltersChange([]);
    onSearchChange('');
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents, reports, policies..."
            className="pl-10 bg-card"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Date</span>
          </Button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
          <Building2 className="h-3 w-3" />
          Quick Filters:
        </span>
        
        {/* Department Filters */}
        {availableDepartments.slice(0, 3).map((dept) => (
          <Badge
            key={dept}
            variant={activeFilters.includes(dept) ? 'default' : 'outline'}
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => toggleFilter(dept)}
          >
            {dept}
          </Badge>
        ))}

        {/* Urgency Filters */}
        {urgencyFilters.slice(0, 2).map((urgency) => (
          <Badge
            key={urgency}
            variant={activeFilters.includes(urgency) ? 'default' : 'outline'}
            className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
            onClick={() => toggleFilter(urgency)}
          >
            <AlertCircle className="h-3 w-3 mr-1" />
            {urgency}
          </Badge>
        ))}

        {/* Clear Filters */}
        {(activeFilters.length > 0 || searchQuery) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              variant="default"
              className="cursor-pointer"
              onClick={() => toggleFilter(filter)}
            >
              {filter} ×
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};