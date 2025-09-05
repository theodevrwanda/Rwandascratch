import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Eye, Mail, Phone, Globe, Calendar } from 'lucide-react';
import { collection, getDocs, updateDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

interface WebsiteRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  description: string;
  budget: string;
  timeline: string;
  features: string[];
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  submittedAt: Date;
}

export function WebsiteRequestsManager() {
  const [requests, setRequests] = useState<WebsiteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<WebsiteRequest | null>(null);
  const { toast } = useToast();
  const { userData } = useAuth();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const q = query(collection(db, 'website_requests'), orderBy('submittedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const requestsData: WebsiteRequest[] = [];
      
      querySnapshot.forEach((doc) => {
        requestsData.push({ id: doc.id, ...doc.data() } as WebsiteRequest);
      });
      
      setRequests(requestsData);
    } catch (error) {
      console.error('Error fetching website requests:', error);
      toast({
        title: "Error",
        description: "Failed to fetch website requests",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: WebsiteRequest['status']) => {
    if (!userData) return;
    
    try {
      const docRef = doc(db, 'website_requests', id);
      await updateDoc(docRef, {
        status: newStatus,
        updatedAt: new Date(),
        updatedBy: userData.uid
      });

      await fetchRequests();
      toast({
        title: "Success",
        description: "Request status updated successfully",
      });
    } catch (error) {
      console.error('Error updating request status:', error);
      toast({
        title: "Error",
        description: "Failed to update request status",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusOptions = (currentStatus: string) => {
    const allStatuses = ['pending', 'in-progress', 'completed', 'rejected'];
    return allStatuses.filter(status => status !== currentStatus);
  };

  if (loading) {
    return <div>Loading website requests...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Website Requests Management</CardTitle>
          <CardDescription>
            Manage incoming website development requests from clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No website requests available. Requests will appear here when clients submit them.
            </p>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">
                        {request.firstName} {request.lastName}
                      </h3>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedRequest(request)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{request.email}</span>
                    </div>
                    {request.phone && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{request.phone}</span>
                      </div>
                    )}
                    {request.company && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Globe className="h-4 w-4" />
                        <span>{request.company}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(request.submittedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {request.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Budget: {request.budget}</span>
                      <span>Timeline: {request.timeline}</span>
                    </div>
                    <div className="flex gap-2">
                      {getStatusOptions(request.status).map((status) => (
                        <Button
                          key={status}
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusUpdate(request.id, status as WebsiteRequest['status'])}
                        >
                          Mark as {status.replace('-', ' ')}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Request Details Modal/Card */}
      {selectedRequest && (
        <Card>
          <CardHeader>
            <CardTitle>Request Details</CardTitle>
            <CardDescription>
              Full details for {selectedRequest.firstName} {selectedRequest.lastName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Contact Information</h4>
                  <p><strong>Name:</strong> {selectedRequest.firstName} {selectedRequest.lastName}</p>
                  <p><strong>Email:</strong> {selectedRequest.email}</p>
                  {selectedRequest.phone && <p><strong>Phone:</strong> {selectedRequest.phone}</p>}
                  {selectedRequest.company && <p><strong>Company:</strong> {selectedRequest.company}</p>}
                  {selectedRequest.website && <p><strong>Current Website:</strong> {selectedRequest.website}</p>}
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Project Details</h4>
                  <p><strong>Budget:</strong> {selectedRequest.budget}</p>
                  <p><strong>Timeline:</strong> {selectedRequest.timeline}</p>
                  <p><strong>Status:</strong> 
                    <Badge className={`ml-2 ${getStatusColor(selectedRequest.status)}`}>
                      {selectedRequest.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </p>
                  <p><strong>Submitted:</strong> {new Date(selectedRequest.submittedAt).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Project Description</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {selectedRequest.description}
                </p>
              </div>

              {selectedRequest.features && selectedRequest.features.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Requested Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRequest.features.map((feature, index) => (
                      <Badge key={index} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setSelectedRequest(null)}
                >
                  Close
                </Button>
                <div className="flex gap-2">
                  {getStatusOptions(selectedRequest.status).map((status) => (
                    <Button
                      key={status}
                      variant={status === 'completed' ? 'default' : 'outline'}
                      onClick={() => {
                        handleStatusUpdate(selectedRequest.id, status as WebsiteRequest['status']);
                        setSelectedRequest(null);
                      }}
                    >
                      Mark as {status.replace('-', ' ')}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}