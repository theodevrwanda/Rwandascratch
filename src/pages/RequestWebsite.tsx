import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { saveWebsiteRequest } from '@/lib/firebase-utils';

const projectTypes = [
  'Business Website',
  'E-commerce Store',
  'Portfolio Website',
  'Blog/News Site',
  'Mobile App',
  'Web Application',
  'Landing Page',
  'Other',
];

const budgetRanges = [
  'Under 100,000 RWF',
  '100,000 - 250,000 RWF',
  '250,000 - 500,000 RWF',
  '500,000 - 1,000,000 RWF',
  'Over 1,000,000 RWF',
];

export default function RequestWebsite() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    company: '',
    projectType: '',
    budget: '',
    deadline: '',
    description: '',
    features: '',
    inspiration: '',
  });
  const { toast } = useToast();

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const result = await saveWebsiteRequest(formData);
      
      if (result.success) {
        toast({
          title: "Request Submitted Successfully!",
          description: "Thank you for your project request. We'll get back to you within 24 hours.",
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          whatsapp: '',
          company: '',
          projectType: '',
          budget: '',
          deadline: '',
          description: '',
          features: '',
          inspiration: '',
        });
      } else {
        throw new Error('Failed to submit request');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            Request a Website
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-slide-up">
            Tell us about your project and we'll create a custom solution that brings your vision to life.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-card rounded-2xl shadow-xl p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+250 xxx xxx xxx"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                    Project Type *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select project type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium mb-2">
                    Budget Range *
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select budget range</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="deadline" className="block text-sm font-medium mb-2">
                  Preferred Deadline
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Project Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Project Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Describe your project, its goals, and what you want to achieve..."
                  required
                />
              </div>

              <div>
                <label htmlFor="features" className="block text-sm font-medium mb-2">
                  Required Features
                </label>
                <textarea
                  id="features"
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="List the specific features you need (e.g., contact form, online payments, user login, etc.)"
                />
              </div>

              <div>
                <label htmlFor="inspiration" className="block text-sm font-medium mb-2">
                  Inspiration/Reference Websites
                </label>
                <textarea
                  id="inspiration"
                  name="inspiration"
                  value={formData.inspiration}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Share URLs of websites you like or want to use as inspiration..."
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <Button type="submit" variant="hero" size="lg" className="w-full sm:w-auto" disabled={submitting}>
                  <Send className="h-5 w-5 mr-2" />
                  {submitting ? 'Submitting...' : 'Submit Project Request'}
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  We'll review your request and get back to you within 24 hours.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">What Happens Next?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Here's how we'll work together to bring your project to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Review & Contact',
                description: 'We review your request and contact you within 24 hours to discuss details.',
              },
              {
                step: '2',
                title: 'Proposal & Quote',
                description: 'We provide a detailed proposal with timeline and pricing for your project.',
              },
              {
                step: '3',
                title: 'Development',
                description: 'Our team begins building your solution with regular updates on progress.',
              },
              {
                step: '4',
                title: 'Launch & Support',
                description: 'We launch your project and provide ongoing support and maintenance.',
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gradient-primary text-white text-xl font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}