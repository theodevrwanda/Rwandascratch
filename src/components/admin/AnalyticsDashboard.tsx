import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, FileText, Calendar, TrendingUp } from 'lucide-react';

export function AnalyticsDashboard() {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Page Views',
      value: '45,678',
      change: '+8%',
      icon: BarChart3,
      color: 'text-green-600'
    },
    {
      title: 'Blog Posts',
      value: '56',
      change: '+4',
      icon: FileText,
      color: 'text-purple-600'
    },
    {
      title: 'Events',
      value: '12',
      change: '+2',
      icon: Calendar,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Overview</CardTitle>
          <CardDescription>
            Website analytics and key metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.title} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm">New user registered: john@example.com</p>
                <span className="text-xs text-muted-foreground ml-auto">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm">Blog post published: "React Best Practices"</p>
                <span className="text-xs text-muted-foreground ml-auto">4 hours ago</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <p className="text-sm">Event created: "Flutter Workshop"</p>
                <span className="text-xs text-muted-foreground ml-auto">1 day ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <FileText className="h-6 w-6 mb-2" />
                <p className="text-sm font-medium">New Blog Post</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <Calendar className="h-6 w-6 mb-2" />
                <p className="text-sm font-medium">Create Event</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <Users className="h-6 w-6 mb-2" />
                <p className="text-sm font-medium">Manage Users</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <TrendingUp className="h-6 w-6 mb-2" />
                <p className="text-sm font-medium">View Analytics</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}