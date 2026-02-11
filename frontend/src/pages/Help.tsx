import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Book, MessageCircle, Mail } from 'lucide-react';

const Help: React.FC = () => (
  <DashboardLayout>
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <Badge variant="secondary" className="mb-4">Help Center</Badge>
        <h1 className="text-3xl font-display font-bold text-foreground mb-4">How can we help you?</h1>
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search for help articles..." className="pl-10" />
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: Book, title: 'Documentation', desc: 'Browse our guides and tutorials' },
          { icon: MessageCircle, title: 'Live Chat', desc: 'Chat with our support team' },
          { icon: Mail, title: 'Email Support', desc: 'Get help via email' },
        ].map((item, i) => (
          <div key={i} className="card-elevated p-6 text-center cursor-pointer hover:border-primary/20">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <item.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </DashboardLayout>
);

export default Help;
