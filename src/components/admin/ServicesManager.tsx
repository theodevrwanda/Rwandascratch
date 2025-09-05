import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  isActive: boolean;
  popular: boolean;
  createdAt: Date;
}

export function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    price: '',
    features: '',
    isActive: true,
    popular: false
  });
  const { toast } = useToast();
  const { userData } = useAuth();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const q = query(collection(db, 'services'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const servicesData: Service[] = [];
      
      querySnapshot.forEach((doc) => {
        servicesData.push({ id: doc.id, ...doc.data() } as Service);
      });
      
      setServices(servicesData);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: "Error",
        description: "Failed to fetch services",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async () => {
    if (!userData || !newService.title.trim()) return;
    
    try {
      const docRef = await addDoc(collection(db, 'services'), {
        ...newService,
        features: newService.features.split(',').map(f => f.trim()).filter(f => f),
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: userData.uid
      });

      await fetchServices();
      setNewService({
        title: '',
        description: '',
        price: '',
        features: '',
        isActive: true,
        popular: false
      });

      toast({
        title: "Success",
        description: "Service added successfully",
      });
    } catch (error) {
      console.error('Error adding service:', error);
      toast({
        title: "Error",
        description: "Failed to add service",
        variant: "destructive",
      });
    }
  };

  const handleUpdateService = async (id: string, updates: Partial<Service>) => {
    if (!userData) return;
    
    try {
      const docRef = doc(db, 'services', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date(),
        updatedBy: userData.uid
      });

      await fetchServices();
      setEditingId(null);

      toast({
        title: "Success",
        description: "Service updated successfully",
      });
    } catch (error) {
      console.error('Error updating service:', error);
      toast({
        title: "Error",
        description: "Failed to update service",
        variant: "destructive",
      });
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!userData) return;
    
    try {
      await deleteDoc(doc(db, 'services', id));
      await fetchServices();

      toast({
        title: "Success",
        description: "Service deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading services...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Service</CardTitle>
          <CardDescription>Create a new service offering</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="title">Service Title</Label>
              <Input
                id="title"
                value={newService.title}
                onChange={(e) => setNewService(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Web Development"
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                value={newService.price}
                onChange={(e) => setNewService(prev => ({ ...prev, price: e.target.value }))}
                placeholder="Starting from $500"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newService.description}
              onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Detailed service description..."
              rows={3}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="features">Features (comma-separated)</Label>
            <Textarea
              id="features"
              value={newService.features}
              onChange={(e) => setNewService(prev => ({ ...prev, features: e.target.value }))}
              placeholder="Responsive design, SEO optimization, Mobile app"
              rows={2}
            />
          </div>

          <div className="flex items-center gap-6 mb-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={newService.isActive}
                onCheckedChange={(checked) => setNewService(prev => ({ ...prev, isActive: checked }))}
              />
              <Label htmlFor="active">Active</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="popular"
                checked={newService.popular}
                onCheckedChange={(checked) => setNewService(prev => ({ ...prev, popular: checked }))}
              />
              <Label htmlFor="popular">Popular</Label>
            </div>
          </div>

          <Button onClick={handleAddService} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage Services</CardTitle>
          <CardDescription>Edit or delete existing services</CardDescription>
        </CardHeader>
        <CardContent>
          {services.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No services available. Add your first service above.
            </p>
          ) : (
            <div className="space-y-4">
              {services.map((service) => (
                <div key={service.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{service.title}</h3>
                      {service.popular && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                          Popular
                        </span>
                      )}
                      {!service.isActive && (
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                          Inactive
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingId(service.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                  <p className="text-sm font-medium mb-2">{service.price}</p>
                  {service.features && service.features.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {service.features.map((feature, index) => (
                        <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}