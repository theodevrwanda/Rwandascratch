import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Briefcase, 
  Calendar, 
  MessageSquare, 
  Star,
  Settings,
  BarChart3,
  Globe,
  UserCheck
} from 'lucide-react';

// Import admin components
import { SiteContentManager } from '@/components/admin/SiteContentManager';
import { ServicesManager } from '@/components/admin/ServicesManager';
import { ProjectsManager } from '@/components/admin/ProjectsManager';
import { TeamManager } from '@/components/admin/TeamManager';
import { EventsManager } from '@/components/admin/EventsManager';
import { BlogManager } from '@/components/admin/BlogManager';
import { TestimonialsManager } from '@/components/admin/TestimonialsManager';
import { UsersManager } from '@/components/admin/UsersManager';
import { AnalyticsDashboard } from '@/components/admin/AnalyticsDashboard';
import { WebsiteInfoManager } from '@/components/admin/WebsiteInfoManager';
import { WebsiteRequestsManager } from '@/components/admin/WebsiteRequestsManager';

export default function AdminDashboard() {
  const { userData } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Redirect if not admin
  if (!userData || userData.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your website content and settings</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-11 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Services</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Team</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Events</span>
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Blog</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span className="hidden sm:inline">Reviews</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="website-requests" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">Requests</span>
            </TabsTrigger>
            <TabsTrigger value="website-info" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">AI Info</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <SiteContentManager />
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <ServicesManager />
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <ProjectsManager />
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <TeamManager />
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <EventsManager />
          </TabsContent>

          <TabsContent value="blog" className="space-y-6">
            <BlogManager />
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-6">
            <TestimonialsManager />
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <UsersManager />
          </TabsContent>

          <TabsContent value="website-requests" className="space-y-6">
            <WebsiteRequestsManager />
          </TabsContent>

          <TabsContent value="website-info" className="space-y-6">
            <WebsiteInfoManager />
          </TabsContent>
        </Tabs>
        
        <footer className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} RwandaScratch Admin Dashboard</p>
        </footer>
      </div>
    </div>
  );
}