import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { EmptyState } from '@/components/EmptyState';
import api  from '@/lib/api';
import { BlogPost, BlogFormData } from '@/types';


export function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    tags: [],
    imageUrl: '',
    published: false,
    readTime: 5
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.getBlogPosts();
      if (response.success && response.data) {
        setPosts(response.data);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch blog posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      category: '',
      tags: [],
      imageUrl: '',
      published: false,
      readTime: 5
    });
    setIsEditing(false);
    setSelectedPost(null);
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      if (isEditing && selectedPost) {
        const response = await api.updateBlogPost(selectedPost.id, formData);
        if (response.success) {
          toast({
            title: "Success",
            description: "Blog post updated successfully",
          });
        }
      } else {
        const response = await api.createBlogPost(formData);
        if (response.success) {
          toast({
            title: "Success",
            description: "Blog post created successfully",
          });
        }
      }

      await fetchPosts();
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? 'update' : 'create'} blog post`,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      tags: post.tags,
      imageUrl: post.imageUrl,
      published: post.published,
      readTime: post.readTime
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
      const response = await api.deleteBlogPost(id);
      if (response.success) {
        await fetchPosts();
        toast({
          title: "Success",
          description: "Blog post deleted successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    }
  };

  if (loading) return <div>Loading blog posts...</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Blog Post' : 'Add New Blog Post'}</CardTitle>
          <CardDescription>
            {isEditing ? 'Update blog post details' : 'Create a new blog post or article'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Blog post title"
              />
            </div>
            <div>
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                placeholder="Author name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                placeholder="Technology, Development, etc."
              />
            </div>
            <div>
              <Label htmlFor="readTime">Read Time (minutes)</Label>
              <Input
                id="readTime"
                type="number"
                value={formData.readTime}
                onChange={(e) => setFormData(prev => ({ ...prev, readTime: parseInt(e.target.value) || 5 }))}
                placeholder="5"
              />
            </div>
          </div>

          <div className="mb-4">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              value={formData.imageUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div className="mb-4">
            <Label htmlFor="excerpt">Excerpt *</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Brief description..."
              rows={3}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Full blog content..."
              rows={6}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              value={formData.tags.join(', ')}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean) 
              }))}
              placeholder="react, javascript, web development"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                className="rounded"
              />
              <Label htmlFor="published">Publish immediately</Label>
            </div>

            <div className="flex gap-2">
              {isEditing && (
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
              <Button onClick={handleSubmit}>
                {isEditing ? (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Update Post
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Post
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage Blog Posts</CardTitle>
          <CardDescription>View, edit, or delete existing blog posts</CardDescription>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <EmptyState
              icon={Plus}
              title="No Blog Posts"
              description="Create your first blog post to get started."
            />
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{post.title}</h3>
                        <Badge variant={post.published ? "default" : "secondary"}>
                          {post.published ? "Published" : "Draft"}
                        </Badge>
                        {post.category && (
                          <Badge variant="outline">{post.category}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>By: {post.author}</span>
                        <span>{post.readTime} min read</span>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(post)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
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
    </div>
  );
}