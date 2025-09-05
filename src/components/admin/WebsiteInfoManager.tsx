import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

export function WebsiteInfoManager() {
  const [websiteInfo, setWebsiteInfo] = useState({
    companyName: '',
    description: '',
    services: '',
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { userData } = useAuth();

  useEffect(() => {
    fetchWebsiteInfo();
  }, []);

  const fetchWebsiteInfo = async () => {
    try {
      const docRef = doc(db, 'website_info', 'main');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setWebsiteInfo({
          companyName: data.companyName || '',
          description: data.description || '',
          services: Array.isArray(data.services) ? data.services.join(', ') : '',
          email: data.contact?.email || '',
          phone: data.contact?.phone || '',
          address: data.contact?.address || ''
        });
      }
    } catch (error) {
      console.error('Error fetching website info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!userData) return;
    
    setSaving(true);
    try {
      const docRef = doc(db, 'website_info', 'main');
      await setDoc(docRef, {
        companyName: websiteInfo.companyName,
        description: websiteInfo.description,
        services: websiteInfo.services.split(',').map(s => s.trim()).filter(s => s),
        contact: {
          email: websiteInfo.email,
          phone: websiteInfo.phone,
          address: websiteInfo.address
        },
        updatedAt: new Date(),
        updatedBy: userData.uid
      });

      toast({
        title: "Success",
        description: "Website information updated successfully",
      });
    } catch (error) {
      console.error('Error updating website info:', error);
      toast({
        title: "Error",
        description: "Failed to update website information",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Loading website information...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Information Management</CardTitle>
        <CardDescription>
          Manage the website information used by the AI chat assistant
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={websiteInfo.companyName}
                onChange={(e) => setWebsiteInfo(prev => ({ ...prev, companyName: e.target.value }))}
                placeholder="RwandaScratch"
              />
            </div>
            <div>
              <Label htmlFor="services">Services (comma-separated)</Label>
              <Input
                id="services"
                value={websiteInfo.services}
                onChange={(e) => setWebsiteInfo(prev => ({ ...prev, services: e.target.value }))}
                placeholder="Web Development, Mobile Apps, Training"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Company Description</Label>
            <Textarea
              id="description"
              value={websiteInfo.description}
              onChange={(e) => setWebsiteInfo(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Company description for AI context..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="email">Contact Email</Label>
              <Input
                id="email"
                type="email"
                value={websiteInfo.email}
                onChange={(e) => setWebsiteInfo(prev => ({ ...prev, email: e.target.value }))}
                placeholder="hello@rwandascratch.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={websiteInfo.phone}
                onChange={(e) => setWebsiteInfo(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+250 788 123 456"
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={websiteInfo.address}
                onChange={(e) => setWebsiteInfo(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Kigali, Rwanda"
              />
            </div>
          </div>

          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}