import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Camera, Save, Loader2 } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    avatar: '',
    // Role-specific fields
    class: '', // for students
    subjects: '', // for teachers (comma-separated)
  });

  // Load user data when component mounts or user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: (user as any).phone || '',
        bio: (user as any).bio || '',
        avatar: user.avatar || '',
        class: (user as any).class || '',
        subjects: (user as any).subjects || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!updateProfile) {
      toast({
        title: 'Error',
        description: 'Profile update is not available',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      // Update local user state
      if (updateProfile) {
        await updateProfile(formData);
      }

      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
      setIsEditing(false);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="container max-w-4xl mx-auto p-6">
        <Card className="dark:bg-[#1E293B] dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Profile Settings</CardTitle>
            <CardDescription className="dark:text-gray-400">
              Manage your personal information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={formData.avatar} alt={formData.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {formData.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button type="button" variant="outline" size="sm" disabled={!isEditing}>
                    <Camera className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2 dark:text-gray-400">
                    JPG, PNG or GIF. Max size 2MB
                  </p>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="dark:text-gray-200">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="dark:bg-[#0F172A] dark:text-white dark:border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="dark:text-gray-200">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="dark:bg-[#0F172A] dark:text-white dark:border-gray-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="dark:text-gray-200">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="+1 (555) 000-0000"
                  className="dark:bg-[#0F172A] dark:text-white dark:border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="dark:text-gray-200">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className="dark:bg-[#0F172A] dark:text-white dark:border-gray-700"
                />
              </div>

              {/* Role-specific fields */}
              {user?.role === 'student' && (
                <div className="space-y-2">
                  <Label htmlFor="class" className="dark:text-gray-200">Class</Label>
                  <Input
                    id="class"
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="e.g., Class 10"
                    className="dark:bg-[#0F172A] dark:text-white dark:border-gray-700"
                  />
                </div>
              )}

              {user?.role === 'teacher' && (
                <div className="space-y-2">
                  <Label htmlFor="subjects" className="dark:text-gray-200">Subjects</Label>
                  <Input
                    id="subjects"
                    name="subjects"
                    value={formData.subjects}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="e.g., Mathematics, Physics, Chemistry"
                    className="dark:bg-[#0F172A] dark:text-white dark:border-gray-700"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                {!isEditing ? (
                  <Button type="button" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button type="submit" className="btn-primary-gradient" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        // Reset form to original user data
                        if (user) {
                          setFormData({
                            name: user.name || '',
                            email: user.email || '',
                            phone: (user as any).phone || '',
                            bio: (user as any).bio || '',
                            avatar: user.avatar || '',
                            class: (user as any).class || '',
                            subjects: (user as any).subjects || '',
                          });
                        }
                      }}
                      disabled={isSaving}
                      className="dark:border-gray-700 dark:text-gray-200"
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
