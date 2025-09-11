import { useState } from 'react';
import { FileText, Download, ExternalLink, Clock, User, Building2, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/pages/Index';

interface Document {
  id: string;
  title: string;
  summary: string;
  type: string;
  department: string;
  urgency: 'critical' | 'high' | 'medium' | 'low';
  lastUpdated: string;
  author: string;
  size: string;
  language: 'english' | 'malayalam' | 'bilingual';
  actionRequired?: string;
  deadline?: string;
  tags: string[];
}

interface DocumentGridProps {
  role: UserRole;
  searchQuery: string;
  activeFilters: string[];
}

const mockDocuments: Record<UserRole, Document[]> = {
  'station-controller': [
    {
      id: '1',
      title: 'Daily Safety Inspection Protocol',
      summary: 'Updated safety checklist for platform operations including crowd management and emergency procedures. Critical updates highlighted in Malayalam.',
      type: 'Safety Protocol',
      department: 'Operations',
      urgency: 'high',
      lastUpdated: '2 hours ago',
      author: 'Safety Team',
      size: '2.3 MB',
      language: 'bilingual',
      actionRequired: 'Review and acknowledge new procedures',
      deadline: 'End of shift',
      tags: ['Safety', 'Operations', 'Daily']
    },
    {
      id: '2',
      title: 'Emergency Response Guidelines',
      summary: 'Comprehensive guide for handling various emergency scenarios at metro stations.',
      type: 'Emergency Manual',
      department: 'Operations',
      urgency: 'critical',
      lastUpdated: '1 day ago',
      author: 'Emergency Response Team',
      size: '5.7 MB',
      language: 'english',
      tags: ['Emergency', 'Safety', 'Manual']
    }
  ],
  'engineer': [
    {
      id: '3',
      title: 'Track Maintenance Schedule Q4',
      summary: 'Detailed maintenance schedule for tracks 12A-15B with equipment requirements and safety protocols.',
      type: 'Maintenance Report',
      department: 'Engineering',
      urgency: 'high',
      lastUpdated: '3 hours ago',
      author: 'Engineering Team',
      size: '4.1 MB',
      language: 'english',
      actionRequired: 'Approve resource allocation',
      deadline: 'Tomorrow 5 PM',
      tags: ['Maintenance', 'Scheduling', 'Resources']
    }
  ],
  'procurement': [
    {
      id: '4',
      title: 'Vendor Compliance Report',
      summary: 'Monthly assessment of vendor performance including safety standards and contract compliance.',
      type: 'Compliance Report',
      department: 'Procurement',
      urgency: 'medium',
      lastUpdated: '1 day ago',
      author: 'Procurement Team',
      size: '1.8 MB',
      language: 'english',
      tags: ['Compliance', 'Vendors', 'Monthly']
    }
  ],
  'hr': [
    {
      id: '5',
      title: 'Staff Training Requirements 2024',
      summary: 'Updated training modules for all staff including safety certification and technical skills development.',
      type: 'Training Manual',
      department: 'HR',
      urgency: 'medium',
      lastUpdated: '2 days ago',
      author: 'HR Training Team',
      size: '3.2 MB',
      language: 'bilingual',
      actionRequired: 'Schedule training sessions',
      deadline: 'Next week',
      tags: ['Training', 'Certification', 'Skills']
    }
  ],
  'executive': [
    {
      id: '6',
      title: 'Monthly Operations Summary',
      summary: 'Comprehensive overview of all department activities, compliance status, and key performance indicators.',
      type: 'Executive Report',
      department: 'All Departments',
      urgency: 'high',
      lastUpdated: '4 hours ago',
      author: 'Operations Director',
      size: '6.4 MB',
      language: 'english',
      actionRequired: 'Review and approve',
      deadline: 'Today',
      tags: ['Executive', 'Summary', 'KPI']
    }
  ]
};

const urgencyColors = {
  critical: 'bg-gradient-urgent text-destructive-foreground',
  high: 'bg-destructive text-destructive-foreground',
  medium: 'bg-warning text-warning-foreground',
  low: 'bg-muted text-muted-foreground'
};

const languageLabels = {
  english: 'EN',
  malayalam: 'ML',
  bilingual: 'EN/ML'
};

const languageColors = {
  english: 'bg-primary text-primary-foreground',
  malayalam: 'bg-success text-success-foreground',
  bilingual: 'bg-accent text-accent-foreground'
};

export const DocumentGrid = ({ role, searchQuery, activeFilters }: DocumentGridProps) => {
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);
  
  let documents = mockDocuments[role] || [];
  
  // Apply search filter
  if (searchQuery) {
    documents = documents.filter(doc =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }
  
  // Apply active filters
  if (activeFilters.length > 0) {
    documents = documents.filter(doc =>
      activeFilters.some(filter =>
        doc.department.includes(filter) ||
        doc.urgency.includes(filter.toLowerCase()) ||
        doc.tags.some(tag => tag.includes(filter)) ||
        doc.type.includes(filter)
      )
    );
  }

  const toggleExpanded = (docId: string) => {
    setExpandedDoc(expandedDoc === docId ? null : docId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Documents & Reports
          <Badge variant="outline" className="ml-2">
            {documents.length} items
          </Badge>
        </h2>
        <Button variant="outline" size="sm">
          Sort by Priority
        </Button>
      </div>

      {documents.length === 0 ? (
        <Card className="p-8 text-center">
          <CardContent>
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">No documents found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search terms or filters
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <Card 
              key={doc.id} 
              className="shadow-card hover:shadow-hover transition-all duration-200 cursor-pointer"
              onClick={() => toggleExpanded(doc.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-sm font-medium mb-2 leading-tight">
                      {doc.title}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      {expandedDoc === doc.id ? doc.summary : doc.summary.slice(0, 100) + '...'}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-1 flex-shrink-0">
                    <Badge className={`text-xs px-2 py-1 ${urgencyColors[doc.urgency]}`}>
                      {doc.urgency.toUpperCase()}
                    </Badge>
                    <Badge className={`text-xs px-2 py-1 ${languageColors[doc.language]}`}>
                      {languageLabels[doc.language]}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 space-y-3">
                {/* Action Required Section */}
                {doc.actionRequired && (
                  <div className="bg-gradient-card rounded-md p-3 border-l-4 border-l-warning">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-warning-foreground">Action Required</p>
                        <p className="text-xs text-muted-foreground mt-1">{doc.actionRequired}</p>
                        {doc.deadline && (
                          <p className="text-xs text-destructive font-medium mt-1">
                            Deadline: {doc.deadline}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Document Metadata */}
                <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    {doc.department}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {doc.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {doc.lastUpdated}
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    {doc.size}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {doc.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t">
                  <Button size="sm" variant="default" className="flex-1">
                    <FileText className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};