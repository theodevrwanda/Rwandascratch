import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Calendar, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { eventsApi } from '@/lib/api';
import { EmptyState } from '@/components/EmptyState';

interface Event {
  id: number;
  name: string;
  description: string;
  image?: string;
  date: string;
  location: string;
  authors: string[];
  created_at: string;
  updated_at: string;
}

export function EventsManager() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    date: '',
    location: '',
    authors: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await eventsApi.getAll();
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Error",
        description: "Failed to fetch events",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData = {
      ...formData,
      authors: formData.authors.split(',').map(author => author.trim()).filter(Boolean),
    };

    try {
      if (editingEvent) {
        await eventsApi.update(editingEvent.id.toString(), eventData);
        toast({
          title: "Success",
          description: "Event updated successfully",
        });
      } else {
        await eventsApi.create(eventData);
        toast({
          title: "Success",
          description: "Event created successfully",
        });
      }
      
      fetchEvents();
      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving event:', error);
      toast({
        title: "Error",
        description: "Failed to save event",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      name: event.name,
      description: event.description,
      image: event.image || '',
      date: event.date.split('T')[0], // Convert to YYYY-MM-DD format
      location: event.location,
      authors: event.authors.join(', ')
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    try {
      await eventsApi.delete(id.toString());
      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image: '',
      date: '',
      location: '',
      authors: ''
    });
    setEditingEvent(null);
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Events Management</CardTitle>
            <CardDescription>
              Manage your events, workshops, and training sessions
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingEvent ? 'Edit Event' : 'Add New Event'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Event Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image">Event Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="https://example.com/event-image.jpg"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Event Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Kigali, Rwanda"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="authors">Event Organizers *</Label>
                  <Input
                    id="authors"
                    value={formData.authors}
                    onChange={(e) => setFormData(prev => ({ ...prev, authors: e.target.value }))}
                    placeholder="John Doe, Jane Smith (comma separated)"
                    required
                  />
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingEvent ? 'Update Event' : 'Create Event'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="No events yet"
            description="Start by adding your first event to showcase your activities."
          />
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{event.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{event.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {event.authors.map((author) => (
                        <Badge key={author} variant="secondary" className="text-xs">
                          {author}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {event.image && (
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-24 h-24 object-cover rounded ml-4"
                    />
                  )}
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(event)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(event.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}