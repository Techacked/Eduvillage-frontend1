import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Target, Users, Award } from 'lucide-react';

const About: React.FC = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="secondary" className="mb-4">About Us</Badge>
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">Transforming Education Through Technology</h1>
          <p className="text-lg text-muted-foreground">EduVillage is a leading online learning platform by Civora Nexus Pvt. Ltd., dedicated to making quality education accessible to everyone.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: GraduationCap, title: 'Expert Instructors', desc: '500+ industry professionals' },
            { icon: Target, title: 'Goal-Oriented', desc: 'Career-focused curriculum' },
            { icon: Users, title: 'Global Community', desc: '50,000+ active learners' },
            { icon: Award, title: 'Certified Programs', desc: 'Recognized certificates' },
          ].map((item, i) => (
            <div key={i} className="card-elevated p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default About;
