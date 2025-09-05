import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, ExternalLink, Github, Linkedin, Twitter, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { teamApi } from '@/lib/api';
import { EmptyState } from '@/components/EmptyState';

interface TeamMember {
  id: number;
  name: string;
  username: string;
  role: string;
  bio: string;
  image?: string;
  portfolio_link?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export function TeamManager() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    role: '',
    bio: '',
    image: '',
    portfolio_link: '',
    github: '',
    linkedin: '',
    twitter: '',
    featured: false
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await teamApi.getAll();
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast({
        title: "Error",
        description: "Failed to fetch team members",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingMember) {
        await teamApi.update(editingMember.id.toString(), formData);
        toast({
          title: "Success",
          description: "Team member updated successfully",
        });
      } else {
        await teamApi.create(formData);
        toast({
          title: "Success",
          description: "Team member added successfully",
        });
      }
      
      fetchMembers();
      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving team member:', error);
      toast({
        title: "Error",
        description: "Failed to save team member",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      username: member.username,
      role: member.role,
      bio: member.bio,
      image: member.image || '',
      portfolio_link: member.portfolio_link || '',
      github: member.github || '',
      linkedin: member.linkedin || '',
      twitter: member.twitter || '',
      featured: member.featured
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    
    try {
      await teamApi.delete(id.toString());
      toast({
        title: "Success",
        description: "Team member deleted successfully",
      });
      fetchMembers();
    } catch (error) {
      console.error('Error deleting team member:', error);
      toast({
        title: "Error",
        description: "Failed to delete team member",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      username: '',
      role: '',
      bio: '',
      image: '',
      portfolio_link: '',
      github: '',
      linkedin: '',
      twitter: '',
      featured: false
    });
    setEditingMember(null);
  };

  if (loading) {
    return <div>Loading team members...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Team Management</CardTitle>
            <CardDescription>
              Manage your team members and their information
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username *</Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Role *</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    placeholder="e.g., Full Stack Developer, Frontend Developer"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio *</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image">Profile Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="portfolio_link">Portfolio Link</Label>
                  <Input
                    id="portfolio_link"
                    value={formData.portfolio_link}
                    onChange={(e) => setFormData(prev => ({ ...prev, portfolio_link: e.target.value }))}
                    placeholder="https://johndoe.dev"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={formData.github}
                      onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                      placeholder="https://github.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      value={formData.twitter}
                      onChange={(e) => setFormData(prev => ({ ...prev, twitter: e.target.value }))}
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  />
                  <Label htmlFor="featured">Featured Member</Label>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingMember ? 'Update Member' : 'Add Member'}
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
        {members.length === 0 ? (
          <EmptyState
            icon={User}
            title="No team members yet"
            description="Start by adding your first team member to showcase your team."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((member) => (
              <div key={member.id} className="border rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{member.name}</h3>
                      {member.featured && (
                        <Badge variant="default" className="text-xs">Featured</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">@{member.username}</p>
                    <Badge variant="outline" className="text-xs">{member.role}</Badge>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{member.bio}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {member.portfolio_link && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={member.portfolio_link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                    {member.github && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={member.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                    {member.linkedin && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                    {member.twitter && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(member)}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(member.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}