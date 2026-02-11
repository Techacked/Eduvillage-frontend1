import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Contact Us</Badge>
            <h1 className="text-4xl font-display font-bold text-foreground mb-4">Get in Touch</h1>
            <p className="text-lg text-muted-foreground">Have questions? We'd love to hear from you.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="card-elevated p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>First Name</Label><Input placeholder="John" /></div>
                  <div className="space-y-2"><Label>Last Name</Label><Input placeholder="Doe" /></div>
                </div>
                <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="john@email.com" /></div>
                <div className="space-y-2"><Label>Message</Label><Textarea placeholder="How can we help?" rows={5} /></div>
                <Button type="submit" className="w-full btn-primary-gradient">Send Message</Button>
              </form>
            </div>
            <div className="space-y-6">
              {[
                { icon: Mail, title: 'Email', value: 'support@eduvillage.com' },
                { icon: Phone, title: 'Phone', value: '+1 (555) 123-4567' },
                { icon: MapPin, title: 'Address', value: '123 Education Street, Learning City' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div><p className="font-medium text-foreground">{item.title}</p><p className="text-muted-foreground">{item.value}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
