import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Save, Bell, Shield, Palette, Globe, CreditCard } from 'lucide-react';

const Settings: React.FC = () => {
  const handleSave = () => {
    // TODO: connect to backend API
    toast.success('Settings saved successfully!');
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Settings
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your account and platform preferences
            </p>
          </div>
          <Button className="btn-primary-gradient" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <div className="card-elevated p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Profile Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Bio</h3>
                <textarea
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <div className="card-elevated p-6 space-y-6">
              <div className="flex items-center gap-4">
                <Bell className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Notification Preferences</h3>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Email notifications for new courses', description: 'Get notified when new courses are added' },
                  { label: 'Course update notifications', description: 'Receive updates about enrolled courses' },
                  { label: 'Marketing emails', description: 'Promotional offers and newsletters' },
                  { label: 'Assessment reminders', description: 'Get reminded about upcoming deadlines' },
                  { label: 'Achievement notifications', description: 'Celebrate your learning milestones' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch defaultChecked={index < 3} />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <div className="card-elevated p-6 space-y-6">
              <div className="flex items-center gap-4">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Security Settings</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button variant="outline">Update Password</Button>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium text-foreground mb-4">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="mt-6">
            <div className="card-elevated p-6 space-y-6">
              <div className="flex items-center gap-4">
                <Palette className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Appearance Settings</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div>
                    <p className="font-medium text-foreground">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div>
                    <p className="font-medium text-foreground">Compact Mode</p>
                    <p className="text-sm text-muted-foreground">Reduce spacing for more content</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-foreground">Show Progress Bars</p>
                    <p className="text-sm text-muted-foreground">Display progress on course cards</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="billing" className="mt-6">
            <div className="card-elevated p-6 space-y-6">
              <div className="flex items-center gap-4">
                <CreditCard className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Billing & Payments</h3>
              </div>

              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Current Plan</p>
                    <p className="text-sm text-muted-foreground">Free Plan</p>
                  </div>
                  <Button variant="outline">Upgrade</Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-4">Payment Methods</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  No payment methods added yet.
                </p>
                <Button variant="outline">Add Payment Method</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
