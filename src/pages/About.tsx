import React from 'react';
import { Target, Eye, Heart, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import aboutBg from '@/assets/about-bg.jpg';

const teamMembers = [
  {
    name: 'Theogene Iradukunda',
    role: 'Founder & CEO',
    location: 'Kigali, Rwanda',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bio: 'Founder of RwandaScratch, Theogene is passionate about driving technological innovation in Rwanda through software development, graphic design, and networking solutions.',
  },
   {
    name: 'Theogene Iradukunda',
    role: 'Founder & CEO',
    location: 'Kigali, Rwanda',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bio: 'Founder of RwandaScratch, Theogene is passionate about driving technological innovation in Rwanda through software development, graphic design, and networking solutions.',
  },
   {
    name: 'Theogene Iradukunda',
    role: 'Founder & CEO',
    location: 'Kigali, Rwanda',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bio: 'Founder of RwandaScratch, Theogene is passionate about driving technological innovation in Rwanda through software development, graphic design, and networking solutions.',
  }
];

const values = [
  {
    icon: Target,
    title: 'Innovation',
    description: 'We create cutting-edge software and design solutions to address real-world challenges in Rwanda and beyond.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Fostering collaboration and empowering Rwanda’s tech ecosystem through education and partnerships.',
  },
  {
    icon: Heart,
    title: 'Impact',
    description: 'Our work drives positive change by delivering accessible and impactful tech solutions.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We deliver high-quality software, designs, and networking services with precision and care.',
  },
];

const aboutData = {
  story: `
    RwandaScratch was founded by Theogene Iradukunda in Kigali, Rwanda, with a vision to transform the tech landscape in Africa. Starting as a passion project to empower local businesses and communities, RwandaScratch has grown into a dynamic company offering software development, graphic design, software installations, and networking solutions. Our goal is to bridge the digital gap by providing innovative and accessible technology tailored to the needs of Rwandan and African markets. Contact us at theodevrwanda@gmail.com or +250 792 734 752 to collaborate!
  `,
  mission: `
    Our mission is to empower businesses and individuals in Rwanda and Africa with innovative software, stunning graphic designs, and reliable networking solutions, fostering growth and digital transformation.
  `,
  vision: `
    We envision a digitally empowered Africa where RwandaScratch leads as a hub for cutting-edge technology, inspiring the next generation of innovators and creators.
  `,
};

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="py-20 lg:py-32 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(37, 99, 235, 0.9) 0%, rgba(29, 78, 216, 0.8) 50%, rgba(30, 41, 59, 0.9) 100%), url(${aboutBg})`,
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
            About RwandaScratch
          </h1>
          <p 
            className="text-xl text-white/90 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            We're a youth-led tech company transforming Rwanda and Africa through software development, graphic design, and networking solutions.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Story</h2>
              <div 
                className="text-lg text-muted-foreground mb-8"
                dangerouslySetInnerHTML={{ __html: aboutData.story }}
              />
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </div>
            <div className="animate-scale-in">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-card p-8 rounded-2xl shadow-lg hover-lift animate-fade-in">
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-2xl font-bold">Our Mission</h3>
              </div>
              <div 
                className="text-lg text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: aboutData.mission }}
              />
            </div>
            <div className="bg-gradient-card p-8 rounded-2xl shadow-lg hover-lift animate-fade-in">
              <div className="flex items-center mb-6">
                <Eye className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-2xl font-bold">Our Vision</h3>
              </div>
              <div 
                className="text-lg text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: aboutData.vision }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do at RwandaScratch.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="text-center p-6 rounded-2xl bg-gradient-card hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The passionate individuals driving innovation at RwandaScratch.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="bg-gradient-card p-6 rounded-2xl shadow-lg hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">{member.location}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Work With Us?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's build something amazing together. Contact us at theodevrwanda@gmail.com or +250 792 734 752.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/request-website">Start a Project</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/join-us">Join Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}