import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, ExternalLink, Github, Eye, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { projectsApi } from '@/lib/api';
import { EmptyState } from '@/components/EmptyState';

interface Project {
  id: number;
  name: string;
  type: string;
  description: string;
  technologies: string[];
  authors: string[];
  live_link?: string;
  github_link?: string;
  image?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    technologies: '',
    authors: '',
    live_link: '',
    github_link: '',
    image: '',
    featured: false
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsApi.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
      authors: formData.authors.split(',').map(author => author.trim()).filter(Boolean),
    };

    try {
      if (editingProject) {
        await projectsApi.update(editingProject.id.toString(), projectData);
        toast({
          title: "Success",
          description: "Project updated successfully",
        });
      } else {
        await projectsApi.create(projectData);
        toast({
          title: "Success",
          description: "Project created successfully",
        });
      }
      
      fetchProjects();
      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      type: project.type,
      description: project.description,
      technologies: project.technologies.join(', '),
      authors: project.authors.join(', '),
      live_link: project.live_link || '',
      github_link: project.github_link || '',
      image: project.image || '',
      featured: project.featured
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await projectsApi.delete(id.toString());
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: '',
      description: '',
      technologies: '',
      authors: '',
      live_link: '',
      github_link: '',
      image: '',
      featured: false
    });
    setEditingProject(null);
  };

  if (loading) {
    return <div>Loading projects...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Projects Management</CardTitle>
            <CardDescription>
              Manage your portfolio projects and showcases
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Project Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type *</Label>
                    <Input
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                      placeholder="e.g., Web Application, Mobile App"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="technologies">Technologies *</Label>
                    <Input
                      id="technologies"
                      value={formData.technologies}
                      onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
                      placeholder="React, Node.js, MongoDB (comma separated)"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="authors">Authors *</Label>
                    <Input
                      id="authors"
                      value={formData.authors}
                      onChange={(e) => setFormData(prev => ({ ...prev, authors: e.target.value }))}
                      placeholder="John Doe, Jane Smith (comma separated)"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="live_link">Live Link</Label>
                    <Input
                      id="live_link"
                      value={formData.live_link}
                      onChange={(e) => setFormData(prev => ({ ...prev, live_link: e.target.value }))}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github_link">GitHub Link</Label>
                    <Input
                      id="github_link"
                      value={formData.github_link}
                      onChange={(e) => setFormData(prev => ({ ...prev, github_link: e.target.value }))}
                      placeholder="https://github.com/user/repo"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  />
                  <Label htmlFor="featured">Featured Project</Label>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingProject ? 'Update Project' : 'Create Project'}
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
        {projects.length === 0 ? (
          <EmptyState
            icon={Plus}
            title="No projects yet"
            description="Start by adding your first project to showcase your work."
          />
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{project.name}</h3>
                      <Badge variant="outline">{project.type}</Badge>
                      {project.featured && (
                        <Badge variant="default">Featured</Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      By: {project.authors.join(', ')}
                    </p>
                  </div>
                  
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-20 h-20 object-cover rounded ml-4"
                    />
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {project.live_link && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.live_link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Live
                        </a>
                      </Button>
                    )}
                    {project.github_link && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.github_link} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-1" />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(project)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(project.id)}
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
  );
}