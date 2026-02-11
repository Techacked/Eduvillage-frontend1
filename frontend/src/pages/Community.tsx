import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Users,
  MessageSquare,
  ThumbsUp,
  Share2,
  Search,
  TrendingUp,
  Award,
  BookOpen,
  Bell,
} from "lucide-react";

const discussionsInit = [
  {
    id: 1,
    author: "Rahul Sharma",
    avatar: "RS",
    title: "Tips for solving Class 10 Maths problems faster",
    content:
      "Can anyone share tips for solving algebraic equations quickly? I have my exams next month...",
    category: "Class 10 Maths",
    likes: 45,
    replies: 12,
    time: "2 hours ago",
    comments: [],
    showComment: false,
  },
  {
    id: 2,
    author: "Priya Patel",
    avatar: "PP",
    title: "Best resources for Class 12 Physics PCM",
    content:
      "Looking for additional study materials for Physics. Specifically need help with Electromagnetism chapter.",
    category: "Class 12 PCM",
    likes: 32,
    replies: 8,
    time: "4 hours ago",
    comments: [],
    showComment: false,
  },
  {
    id: 3,
    author: "Amit Kumar",
    avatar: "AK",
    title: "Study group for Class 11 Chemistry",
    content:
      "Starting a study group for Class 11 Chemistry. Anyone interested can join! We meet online every Sunday.",
    category: "Class 11 PCM",
    likes: 28,
    replies: 15,
    time: "6 hours ago",
    comments: [],
    showComment: false,
  },
  {
    id: 4,
    author: "Sneha Gupta",
    avatar: "SG",
    title: "Class 8 Science doubt - Photosynthesis",
    content:
      "Can someone explain the light and dark reactions in photosynthesis in simple terms?",
    category: "Class 8 Science",
    likes: 19,
    replies: 7,
    time: "8 hours ago",
    comments: [],
    showComment: false,
  },
  {
    id: 5,
    author: "Vikram Singh",
    avatar: "VS",
    title: "Class 6 Maths - Fractions made easy",
    content:
      "I created some easy tricks for understanding fractions. Happy to share with everyone!",
    category: "Class 6 Maths",
    likes: 56,
    replies: 21,
    time: "1 day ago",
    comments: [],
    showComment: false,
  },
];

const topContributors = [
  { name: "Dr. Anita Roy", points: 2450, badge: "Expert" },
  { name: "Rajesh Verma", points: 1890, badge: "Mentor" },
  { name: "Sunita Devi", points: 1560, badge: "Helper" },
  { name: "Karan Malhotra", points: 1340, badge: "Active" },
  { name: "Meera Joshi", points: 1120, badge: "Rising Star" },
];

const trendingTopics = [
  { topic: "Board Exam Preparation", posts: 234 },
  { topic: "NCERT Solutions", posts: 189 },
  { topic: "JEE/NEET Tips", posts: 156 },
  { topic: "Study Techniques", posts: 134 },
  { topic: "Career Guidance", posts: 98 },
];

const Community: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [discussionData, setDiscussionData] = React.useState(discussionsInit);

  // 🔥 Handle Likes
  const handleLike = (id: number) => {
    setDiscussionData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  // 🔥 Handle Comments
  const handleAddComment = (id: number, text: string) => {
    if (!text.trim()) return;

    setDiscussionData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              replies: item.replies + 1,
              comments: [
                ...(item.comments || []),
                {
                  text,
                  time: "Just now",
                },
              ],
            }
          : item
      )
    );
  };

  // Toggle comment box
  const toggleCommentBox = (id: number) => {
    setDiscussionData((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, showComment: !item.showComment }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className={isAuthenticated ? "flex" : ""}>
        {isAuthenticated && <Sidebar />}

        <main className={isAuthenticated ? "flex-1 ml-64" : ""}>
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                Community
              </h1>
              <p className="text-muted-foreground">
                Connect with fellow learners, ask questions, and share
                knowledge
              </p>
            </div>

            {/* Search */}
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search discussions, topics, or users..."
                className="pl-10 h-12"
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Feed */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-foreground">
                    Recent Discussions
                  </h2>
                  <Button className="btn-primary-gradient">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Start Discussion
                  </Button>
                </div>

                <ScrollArea className="h-[600px]">
                  <div className="space-y-4 pr-4">
                    {discussionData.map((d) => (
                      <Card
                        key={d.id}
                        className="hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <CardContent className="p-5">
                          <div className="flex gap-4">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                                {d.avatar}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <h3 className="font-semibold text-foreground">
                                  {d.title}
                                </h3>
                                <Badge variant="secondary">{d.category}</Badge>
                              </div>

                              <p className="text-sm text-muted-foreground mb-3">
                                {d.content}
                              </p>

                              <div className="flex items-center justify-between text-muted-foreground text-sm">
                                <span className="font-medium text-foreground">
                                  {d.author} • {d.time}
                                </span>

                                {/* LIKE & COMMENT */}
                                <div className="flex items-center gap-4">
                                  {/* LIKE */}
                                  <button
                                    onClick={() => handleLike(d.id)}
                                    className="flex items-center gap-1 hover:text-primary transition"
                                  >
                                    <ThumbsUp className="h-4 w-4" />
                                    {d.likes}
                                  </button>

                                  {/* COMMENT */}
                                  <button
                                    onClick={() => toggleCommentBox(d.id)}
                                    className="flex items-center gap-1 hover:text-primary transition"
                                  >
                                    <MessageSquare className="h-4 w-4" />
                                    {d.replies}
                                  </button>

                                  {/* Share */}
                                  <button className="hover:text-primary transition">
                                    <Share2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>

                              {/* COMMENT BOX */}
                              {d.showComment && (
                                <div className="mt-4">
                                  <Input
                                    placeholder="Write a comment and press Enter..."
                                    onKeyDown={(e) => {
                                      if (
                                        e.key === "Enter" &&
                                        e.currentTarget.value.trim()
                                      ) {
                                        handleAddComment(
                                          d.id,
                                          e.currentTarget.value
                                        );
                                        e.currentTarget.value = "";
                                      }
                                    }}
                                  />

                                  {/* List Comments */}
                                  <div className="mt-3 space-y-2">
                                    {d.comments.map((c, i) => (
                                      <div
                                        key={i}
                                        className="border rounded-md p-2 bg-muted text-sm flex justify-between"
                                      >
                                        <span>{c.text}</span>
                                        <span className="text-xs text-muted-foreground">
                                          {c.time}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Sidebar - Contributors + Trending */}
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Award className="h-5 w-5 text-warning" />
                      Top Contributors
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {topContributors.map((c, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-5 text-sm">#{i + 1}</span>
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {c.name.split(" ").map((l) => l[0])}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{c.name}</span>
                        </div>
                        <Badge variant="outline">{c.badge}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-success" />
                      Trending Topics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {trendingTopics.map((t, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm cursor-pointer hover:text-primary">
                          #{t.topic}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {t.posts} posts
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Quick Links
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Study Groups
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Bell className="h-4 w-4 mr-2" />
                      Announcements
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Award className="h-4 w-4 mr-2" />
                      Leaderboard
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {!isAuthenticated && <Footer />}
        </main>
      </div>
    </div>
  );
};

export default Community;
