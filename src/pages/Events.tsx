import React from 'react';
import { Calendar, MapPin, Clock, Users, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/EmptyState';

const upcomingEvents = [
  {
    title: 'RwandaScratch Coding Bootcamp',
    date: '2025-10-15',
    time: '09:00 - 17:00',
    location: 'kLab, Kigali',
    attendees: 40,
    maxAttendees: 50,
    description: 'Learn full-stack development with React, Node.js, and MongoDB, led by RwandaScratch experts.',
    image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=300&fit=crop',
    registrationLink: '#',
    price: 'Free',
    authors: ['Theogene Iradukunda'],
  },
  {
    title: 'Graphic Design Masterclass',
    date: '2025-11-10',
    time: '10:00 - 16:00',
    location: 'University of Rwanda, Kigali',
    attendees: 30,
    maxAttendees: 40,
    description: 'Master UI/UX design and graphic creation with tools like Figma and Adobe Creative Suite.',
    image: 'https://images.unsplash.com/photo-1610878180933-123728745d22?w=600&h=300&fit=crop',
    registrationLink: '#',
    price: '7,000 RWF',
    authors: ['Theogene Iradukunda', 'Aline Ingabire'],
  },
  {
    title: 'Networking Essentials Workshop',
    date: '2025-12-05',
    time: '14:00 - 18:00',
    location: 'Online (Zoom)',
    attendees: 60,
    maxAttendees: 100,
    description: 'Explore networking fundamentals and cloud solutions for modern businesses.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=300&fit=crop',
    registrationLink: '#',
    price: 'Free',
    authors: ['Theogene Iradukunda'],
  },
];

const pastEvents = [
  {
    title: 'Intro to Software Development',
    date: '2025-01-20',
    attendees: 50,
    description: 'A beginner-friendly workshop on coding with JavaScript and Python.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop',
    authors: ['Theogene Iradukunda', 'Isezerano Roger'],
  },
  {
    title: 'Tech Entrepreneurship Summit',
    date: '2024-12-10',
    attendees: 45,
    description: 'Insights on launching tech startups in Rwanda’s growing ecosystem.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop',
    authors: ['Theogene Iradukunda'],
  },
  {
    title: 'Mobile App Development Crash Course',
    date: '2024-11-15',
    attendees: 35,
    description: 'Hands-on session on building mobile apps with Flutter and Dart.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop',
    authors: ['Theogene Iradukunda', 'Didier Niyonzima'],
  },
];

export default function Events() {
  return (
    <div className="min-h-screen">
      {/* CROSS-REFERENCE: Theogene, this is the Events page for RwandaScratch, complementing the About (artifact_id: 7b8e4f2a-9c1d-4b7a-b2e3-5f6c8a7d3e2f) and Projects (artifact_id: f8d7e6b5-3c2a-4e9b-9a1f-6d4c8b3e2a1d) pages. */}
      
      {/* Hero Section */}
      <section className="hero-bg py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            RwandaScratch Events & Training
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-slide-up">
            Join RwandaScratch’s workshops and training sessions to master software development, graphic design, and networking skills.
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover RwandaScratch’s latest workshops to boost your tech skills and connect with the community.
            </p>
          </div>

          {upcomingEvents.length === 0 ? (
            <EmptyState
              icon={Calendar}
              title="No Upcoming Events"
              description="We're planning new workshops at RwandaScratch. Check back soon!"
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => (
                <div
                  key={event.title}
                  className="bg-gradient-card rounded-2xl shadow-lg overflow-hidden hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        {event.price}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {event.attendees}/{event.maxAttendees} registered
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 text-primary mr-2" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 text-primary mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 text-primary mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 text-primary mr-2" />
                        <span>By: {event.authors.join(', ')}</span>
                      </div>
                    </div>

                    <Button className="w-full" asChild>
                      <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                        Register Now
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Past Events</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Relive RwandaScratch’s impactful workshops and training sessions.
            </p>
          </div>

          {pastEvents.length === 0 ? (
            <EmptyState
              icon={Clock}
              title="No Past Events"
              description="RwandaScratch is gearing up for more events. Stay tuned!"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event, index) => (
                <div
                  key={event.title}
                  className="bg-gradient-card rounded-2xl shadow-lg overflow-hidden hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{event.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-4 w-4 text-primary mr-1" />
                        {event.authors.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Subscribe to RwandaScratch’s newsletter for updates on upcoming tech workshops and events.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button variant="hero">Subscribe</Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Want to Host an Event?</h2>
          <p className="text-xl text-white/90 mb-8">
            Partner with Theogene at theodevrwanda@gmail.com or +250 792 734 752 to organize tech workshops with RwandaScratch.
          </p>
          <Button variant="outline" size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
            <a href="/contact">Contact Us</a>
          </Button>
        </div>
      </section>
    </div>
  );
}