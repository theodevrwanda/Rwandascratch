import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Save, Edit, Plus } from 'lucide-react';
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  addDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

interface ContentSection {
  id: string;
  section: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl?: string;
  isActive: boolean;
  updatedAt: any;
  updatedBy: string;
}

const defaultSections = [
  { section: 'hero', title: 'Hero Section', description: 'Main landing page hero content' },
  { section: 'about_mission', title: 'Mission', description: 'Company mission statement' },
  { section: 'about_vision', title: 'Vision', description: 'Company vision statement' },
  { section: 'contact_info', title: 'Contact Info', description: 'Contact information' },
];

export function SiteContentManager() {
  const [contentSections, setContentSections] = useState<ContentSection[]>([]);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { userData } = useAuth();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const q = query(collection(db, 'site_content'), orderBy('section'));
      const querySnapshot = await getDocs(q);
      const content: ContentSection[] = [];
      
      querySnapshot.forEach((doc) => {
        content.push({ id: doc.id, ...doc.data() } as ContentSection);
      });

      setContentSections(content);
    } catch (error) {
      console.error('Error fetching content:', error);
      toast({
        title: "Error",
        description: "Failed to fetch content sections",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (section: ContentSection) => {
    if (!userData) return;
    
    setSaving(true);
    try {
      const docRef = doc(db, 'site_content', section.id);
      await updateDoc(docRef, {
        ...section,
        updatedAt: new Date(),
        updatedBy: userData.uid
      });

      setContentSections(prev => 
        prev.map(s => s.id === section.id ? section : s)
      );

      setEditingSection(null);
      toast({
        title: "Success",
        description: "Content updated successfully",
      });
    } catch (error) {
      console.error('Error updating content:', error);
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCreateSection = async () => {
    if (!userData) return;

    try {
      const newSection = {
        section: 'new_section',
        title: 'New Section',
        subtitle: '',
        description: 'Description for new section',
        imageUrl: '',
        isActive: true,
        updatedAt: new Date(),
        updatedBy: userData.uid
      };

      const docRef = await addDoc(collection(db, 'site_content'), newSection);
      const sectionWithId = { id: docRef.id, ...newSection };
      
      setContentSections(prev => [...prev, sectionWithId]);
      setEditingSection(docRef.id);

      toast({
        title: "Success",
        description: "New section created",
      });
    } catch (error) {
      console.error('Error creating section:', error);
      toast({
        title: "Error",
        description: "Failed to create section",
        variant: "destructive",
      });
    }
  };

  const SectionEditor = ({ section }: { section: ContentSection }) => {
    const [formData, setFormData] = useState(section);

    return (
      <div className="space-y-4 border rounded-lg p-4 bg-muted/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`section-${section.id}`}>Section ID</Label>
            <Input
              id={`section-${section.id}`}
              value={formData.section}
              onChange={(e) => setFormData(prev => ({ ...prev, section: e.target.value }))}
              placeholder="Section identifier"
            />
          </div>
          <div>
            <Label htmlFor={`title-${section.id}`}>Title</Label>
            <Input
              id={`title-${section.id}`}
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Section title"
            />
          </div>
        </div>

        <div>
          <Label htmlFor={`subtitle-${section.id}`}>Subtitle</Label>
          <Input
            id={`subtitle-${section.id}`}
            value={formData.subtitle || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
            placeholder="Section subtitle (optional)"
          />
        </div>

        <div>
          <Label htmlFor={`description-${section.id}`}>Description</Label>
          <Textarea
            id={`description-${section.id}`}
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Section description"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor={`image-${section.id}`}>Image URL</Label>
          <Input
            id={`image-${section.id}`}
            value={formData.imageUrl || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id={`active-${section.id}`}
            checked={formData.isActive}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
          />
          <Label htmlFor={`active-${section.id}`}>Active</Label>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={() => handleSave(formData)}
            disabled={saving}
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save'}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setEditingSection(null)}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div>Loading content sections...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Site Content Management</CardTitle>
          <CardDescription>
            Manage all website content sections including hero, about, contact, etc.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Button onClick={handleCreateSection}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Section
            </Button>

            {contentSections.map((section) => (
              <div key={section.id} className="border rounded-lg p-4">
                {editingSection === section.id ? (
                  <SectionEditor section={section} />
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{section.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Section: {section.section}
                      </p>
                      <p className="text-sm mt-1">{section.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          section.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {section.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setEditingSection(section.id)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}