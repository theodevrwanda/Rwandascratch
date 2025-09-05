import React from 'react';
import { Calendar, User, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/EmptyState';

const blogPosts = [
  // Technology Category
  {
    title: 'Rwanda’s Tech Future: Trends in Software and Networking',
    excerpt: 'Discover how software development and networking solutions are shaping Rwanda’s digital landscape.',
    author: 'Theogene Iradukunda',
    date: '2025-08-10',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=300&fit=crop',
    category: 'Technology',
    link: '#',
  },
  {
    title: 'The Role of Cloud Computing in African Businesses',
    excerpt: 'Exploring how cloud solutions enhance efficiency for Rwandan enterprises.',
    author: 'Isezerano Roger',
    date: '2025-07-20',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=300&fit=crop',
    category: 'Technology',
    link: '#',
  },
  {
    title: 'Cybersecurity Essentials for Rwanda’s Tech Ecosystem',
    excerpt: 'Key practices to secure software and networks in Rwanda’s growing tech scene.',
    author: 'Theogene Iradukunda',
    date: '2025-06-15',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee9b6b6774?w=600&h=300&fit=crop',
    category: 'Technology',
    link: '#',
  },
  // Development Category
  {
    title: 'Building Full-Stack Apps with React and Node.js',
    excerpt: 'Best practices for creating scalable web applications using modern JavaScript frameworks.',
    author: 'Claudine Uwase',
    date: '2025-08-05',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=300&fit=crop',
    category: 'Development',
    link: '#',
  },
  {
    title: 'Designing Mobile Apps with Flutter for Rwanda',
    excerpt: 'How RwandaScratch builds cross-platform mobile apps with Flutter and Dart.',
    author: 'Didier Niyonzima',
    date: '2025-07-10',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=300&fit=crop',
    category: 'Development',
    link: '#',
  },
  {
    title: 'Optimizing UI/UX with Tailwind CSS',
    excerpt: 'Tips for creating stunning, user-friendly interfaces for web applications.',
    author: 'Aline Ingabire',
    date: '2025-06-20',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1610878180933-123728745d22?w=600&h=300&fit=crop',
    category: 'Development',
    link: '#',
  },
  // Education Category
  {
    title: 'Empowering Rwandan Youth Through Coding Bootcamps',
    excerpt: 'How RwandaScratch’s training programs are building the next generation of tech leaders.',
    author: 'Theogene Iradukunda',
    date: '2025-08-15',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=300&fit=crop',
    category: 'Education',
    link: '#',
  },
  {
    title: 'Teaching Graphic Design to Rwandan Students',
    excerpt: 'RwandaScratch’s approach to fostering creativity through design education.',
    author: 'Aline Ingabire',
    date: '2025-07-15',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=300&fit=crop',
    category: 'Education',
    link: '#',
  },
  {
    title: 'Bridging the Digital Skills Gap in Rwanda',
    excerpt: 'Strategies for expanding tech education across Rwandan communities.',
    author: 'Theogene Iradukunda',
    date: '2025-06-10',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=300&fit=crop',
    category: 'Education',
    link: '#',
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen">
      {/* CROSS-REFERENCE: Theogene, this is the Blog page for RwandaScratch, complementing the About (artifact_id: 7b8e4f2a-9c1d-4b7a-b2e3-5f6c8a7d3e2f), Projects (artifact_id: f8d7e6b5-3c2a-4e9b-9a1f-6d4c8b3e2a1d), and Events (artifact_id: 9c3b2e4d-5a1f-4e8b-b7c2-6f4d8a3e2b1c) pages. */}
      
      {/* Hero Section */}
      <section className="hero-bg py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            RwandaScratch Blog
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-slide-up">
            Insights, tutorials, and tips on software development, graphic design, and tech education from RwandaScratch.
          </p>
        </div>
      </section>
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {blogPosts.length === 0 ? (
            <EmptyState
              icon={BookOpen}
              title="No Blog Posts"
              description="RwandaScratch is crafting new content on tech and innovation. Check back soon!"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <article
                  key={post.title}
                  className="bg-gradient-card rounded-2xl shadow-lg overflow-hidden hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                      {post.category}
                    </span>
                    <h2 className="text-xl font-bold mt-4 mb-3">{post.title}</h2>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <a href={post.link}>
                        Read More <ArrowRight className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Contribute to Our Blog</h2>
          <p className="text-xl text-white/90 mb-8">
            Share your tech insights with RwandaScratch! Contact Theogene at theodevrwanda@gmail.com or +250 792 734 752.
          </p>
          <Button variant="outline" size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
            <a href="/contact">Get in Touch</a>
          </Button>
        </div>
      </section>
    </div>
  );
}