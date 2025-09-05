import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Mail, Eye, Trash2, MessageSquare } from 'lucide-react';
import { EmptyState } from '@/components/EmptyState';
import api  from '@/lib/api';
import { ContactMessage } from '@/types';

export function ContactManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await api.getContactMessages();
      if (response.success && response.data) {
        setMessages(response.data);
      }
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      toast({
        title: "Error",
        description: "Failed to fetch contact messages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: 'read' | 'replied') => {
    try {
      const response = await api.updateContactMessage(id, { status });
      if (response.success) {
        await fetchMessages();
        toast({
          title: "Success",
          description: "Message status updated successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update message status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
      const response = await api.deleteContactMessage(id);
      if (response.success) {
        await fetchMessages();
        setSelectedMessage(null);
        toast({
          title: "Success",
          description: "Message deleted successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'destructive';
      case 'read': return 'secondary';
      case 'replied': return 'default';
      default: return 'secondary';
    }
  };

  if (loading) return <div>Loading contact messages...</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Messages</CardTitle>
          <CardDescription>
            Manage customer inquiries and contact form submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {messages.length === 0 ? (
            <EmptyState
              icon={MessageSquare}
              title="No Contact Messages"
              description="No messages have been received yet."
            />
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{message.subject}</h3>
                        <Badge variant={getStatusColor(message.status)}>
                          {message.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        <strong>From:</strong> {message.name} ({message.email})
                      </div>
                      <p className="text-sm mb-2 line-clamp-2">{message.message}</p>
                      <div className="text-xs text-muted-foreground">
                        Received: {new Date(message.submittedAt).toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedMessage(message)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(message.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedMessage && (
        <Card>
          <CardHeader>
            <CardTitle>Message Details</CardTitle>
            <CardDescription>Full message content and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{selectedMessage.subject}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={getStatusColor(selectedMessage.status)}>
                    {selectedMessage.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <strong>Name:</strong> {selectedMessage.name}
                </div>
                <div>
                  <strong>Email:</strong> {selectedMessage.email}
                </div>
                <div>
                  <strong>Submitted:</strong> {new Date(selectedMessage.submittedAt).toLocaleString()}
                </div>
                {selectedMessage.repliedAt && (
                  <div>
                    <strong>Replied:</strong> {new Date(selectedMessage.repliedAt).toLocaleString()}
                  </div>
                )}
              </div>

              <div>
                <strong>Message:</strong>
                <div className="mt-2 p-4 bg-muted rounded-lg">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedMessage(null)}
                >
                  Close
                </Button>
                {selectedMessage.status === 'unread' && (
                  <Button
                    onClick={() => handleUpdateStatus(selectedMessage.id, 'read')}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Mark as Read
                  </Button>
                )}
                {selectedMessage.status !== 'replied' && (
                  <Button
                    onClick={() => handleUpdateStatus(selectedMessage.id, 'replied')}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Mark as Replied
                  </Button>
                )}
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(selectedMessage.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}