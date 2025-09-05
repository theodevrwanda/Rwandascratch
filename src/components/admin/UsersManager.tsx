import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function UsersManager() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users Management</CardTitle>
        <CardDescription>
          Manage user accounts and permissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-8 text-center">
          <div>
            <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Users Manager</h3>
            <p className="text-muted-foreground mb-4">
              This feature will allow you to manage user accounts and roles.
            </p>
            <Button>Coming Soon</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}