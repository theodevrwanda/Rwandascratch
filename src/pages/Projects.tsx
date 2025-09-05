import React from 'react';
import { ExternalLink, Github, Smartphone, Globe, Code, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import projectsBg from '@/assets/projects-bg.jpg';

const projects = [
  {
    title: 'RwandaShop',
    description: 'An e-commerce platform for Rwandan businesses to sell products online with secure payments and intuitive design.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    liveDemo: '#',
    github: '#',
    category: 'web',
  },
  {
    title: 'KigaliConnect',
    description: 'A web platform connecting local communities with services, featuring real-time networking and user-friendly interfaces.',
    techStack: ['Next.js', 'Firebase', 'TypeScript', 'Bootstrap'],
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    liveDemo: '#',
    github: '#',
    category: 'web',
  },
  {
    title: 'RwandanLearn',
    description: 'An educational platform offering coding tutorials and graphic design courses tailored for Rwandan youth.',
    techStack: ['Vue.js', 'Python', 'PostgreSQL', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
    liveDemo: '#',
    github: '#',
    category: 'web',
  },
  {
    title: 'RwandaScratch Mobile',
    description: 'A mobile app for accessing RwandaScratch’s services, including project management and client communication.',
    techStack: ['Flutter', 'Dart', 'Firebase', 'REST API'],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
    liveDemo: '#',
    github: '#',
    category: 'mobile',
  },
  {
    title: 'KigaliTransit',
    description: 'A mobile app for real-time public transport tracking in Kigali, with networking for seamless updates.',
    techStack: ['React Native', 'Node.js', 'MongoDB', 'Google Maps'],
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e7f50f4?w=600&h=400&fit=crop',
    liveDemo: '#',
    github: '#',
    category: 'mobile',
  },
  {
    title: 'RwandaHealth',
    description: 'A health app connecting users to local clinics with appointment booking and health tips.',
    techStack: ['Flutter', 'Dart', 'PostgreSQL', 'GraphQL'],
    image: 'https://images.unsplash.com/photo-1576091160399-1123a9de18fa?w=600&h=400&fit=crop',
    liveDemo: '#',
    github: '#',
    category: 'mobile',
  },
];

const categories = [
  { id: 'all', name: 'All Projects', icon: Code },
  { id: 'web', name: 'Web Apps', icon: Globe },
  { id: 'mobile', name: 'Mobile Apps', icon: Smartphone },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = React.useState('all');
  
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="py-20 lg:py-32 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(37, 99, 235, 0.9) 0%, rgba(29, 78, 216, 0.8) 50%, rgba(30, 41, 59, 0.9) 100%), url(${projectsBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
        data-aos="zoom-in"
        data-aos-duration="1200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 
            className="text-4xl lg:text-6xl font-bold text-white mb-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Our Projects
          </h1>
          <p 
            className="text-xl text-white/90 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Explore RwandaScratch's innovative solutions in software development, graphic design, and networking, empowering Rwanda and Africa.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-12 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                onClick={() => setActiveCategory(category.id)}
                className="flex items-center gap-2"
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.title}
                  className="bg-gradient-card rounded-2xl shadow-lg overflow-hidden hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                        {project.category === 'web' ? 'Web App' : 'Mobile App'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    
                    {/* Tech Stack */}
                    <div className="mb-6">
                      <p className="text-sm font-medium mb-2">Tech Stack:</p>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {project.liveDemo && (
                        <Button variant="default" size="sm" className="flex-1" asChild>
                          <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                            <Play className="h-4 w-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {project.github && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Code className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Projects Yet</h3>
              <p className="text-muted-foreground">Stay tuned for more innovative solutions!</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-primary mb-2">20+</div>
              <p className="text-muted-foreground">Projects Completed</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Happy Clients</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <p className="text-muted-foreground">Technologies Used</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl font-bold text-primary mb-2">2+</div>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Have a Project Idea?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Contact Theogene at theodevrwanda@gmail.com or +250 792 734 752 to bring your vision to life with RwandaScratch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href="/request-website">Start Your Project</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/contact">Get in Touch</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}