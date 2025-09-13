"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Globe, 
  Search,
  Bell,
  Settings,
  Plus,
  Image as ImageIcon,
  Video,
  MoreHorizontal
} from "lucide-react";

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  image?: string;
}

const mockPosts: Post[] = [
  {
    id: "1",
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      username: "sarah.j"
    },
    content: "Just had the most amazing coffee at the new cafe downtown! The latte art was incredible ☕️ #coffee #goodmorning",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 5,
    shares: 2,
    isLiked: false,
    image: "/placeholder.svg"
  },
  {
    id: "2",
    author: {
      name: "Mike Chen",
      avatar: "/placeholder.svg", 
      username: "mike.chen"
    },
    content: "Working on some exciting new projects! Can't wait to share what we've been building. The future is looking bright! 🚀",
    timestamp: "4 hours ago",
    likes: 47,
    comments: 12,
    shares: 8,
    isLiked: true
  },
  {
    id: "3",
    author: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg",
      username: "emma.w"
    },
    content: "Beautiful sunset today! Nature never fails to amaze me. Taking a moment to appreciate the simple things in life 🌅",
    timestamp: "6 hours ago",
    likes: 89,
    comments: 23,
    shares: 15,
    isLiked: false,
    image: "/placeholder.svg"
  }
];

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [newPost, setNewPost] = useState("");

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleShare = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, shares: post.shares + 1 }
        : post
    ));
  };

  const createPost = () => {
    if (!newPost.trim()) return;
    
    const post: Post = {
      id: Date.now().toString(),
      author: {
        name: "You",
        avatar: "/placeholder.svg",
        username: "you"
      },
      content: newPost,
      timestamp: "just now",
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false
    };
    
    setPosts([post, ...posts]);
    setNewPost("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm dark:bg-gray-900/95">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Ronim</h1>
            </div>
            
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search Ronim" 
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Create Post */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <Textarea
                placeholder="What's on your mind?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="flex-1 min-h-[50px] resize-none border-0 focus:ring-0"
              />
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Photo
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <Video className="h-4 w-4 mr-2" />
                  Video
                </Button>
              </div>
              <Button onClick={createPost} disabled={!newPost.trim()}>
                Post
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{post.author.name}</p>
                      <p className="text-gray-500 text-xs">@{post.author.username} · {post.timestamp}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-900 dark:text-gray-100 mb-3">
                  {post.content}
                </p>
                
                {post.image && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={post.image} 
                      alt="Post image"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}
                
                <Separator className="my-3" />
                
                <div className="flex items-center justify-between">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={post.isLiked ? "text-red-600" : "text-gray-600"}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${post.isLiked ? "fill-current" : ""}`} />
                    {post.likes}
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {post.comments}
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-600"
                    onClick={() => handleShare(post.id)}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    {post.shares}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}