import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="text-xl font-display font-bold">EduVillage</span>
            </Link>
            <p className="text-sm text-background/70">
              Empowering learners worldwide with quality education and innovative learning experiences.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-sm text-background/70 hover:text-primary transition-colors">
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-background/70 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-background/70 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm text-background/70 hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* For Learners */}
          <div>
            <h3 className="font-semibold mb-4">For Learners</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/register" className="text-sm text-background/70 hover:text-primary transition-colors">
                  Become a Student
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-sm text-background/70 hover:text-primary transition-colors">
                  Explore Courses
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-primary transition-colors">
                  Student Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-primary transition-colors">
                  Career Guidance
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-background/70">
                  123 Education Street, Learning City, 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-background/70">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-background/70">support@eduvillage.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/60">
              © {new Date().getFullYear()} EduVillage by Civora Nexus Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-background/60 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-background/60 hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-background/60 hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
