"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Globe, 
  MapPin, 
  Calendar,
  Link as LinkIcon,
  Users,
  Heart,
  MessageCircle,
  Share2,
  Settings,
  Camera
} from "lucide-react";

interface UserProfile {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  coverImage: string;
  location: string;
  website: string;
  joinedDate: string;
  followers: number;
  following: number;
  posts: number;
  verified: boolean;
}

interface Post {
  id: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  image?: string;
}

const userProfile: UserProfile = {
  name: "Alex Rivera",
  username: "alex_rivera",
  bio: "Digital creator, coffee enthusiast, and dog lover 🐕 Sharing my journey through tech, travel, and everyday adventures. Always learning something new!",
  avatar: "/placeholder.svg",
  coverImage: "/placeholder.svg",
  location: "San Francisco, CA",
  website: "alexrivera.dev",
  joinedDate: "March 2022",
  followers: 2847,
  following: 892,
  posts: 156,
  verified: true
};

const userPosts: Post[] = [
  {
    id: "1",
    content: "Just launched my new portfolio website! Spent weeks perfecting the design and I'm finally happy with it. Check it out and let me know what you think! 🚀",
    timestamp: "2 days ago",
    likes: 89,
    comments: 23,
    shares: 12,
    isLiked: false,
    image: "/placeholder.svg"
  },
  {
    id: "2",
    content: "Morning coding session with my favorite companion. There's something magical about writing code while my dog sleeps peacefully beside me. Perfect productivity vibes! ☕️👨‍💻",
    timestamp: "1 week ago",
    likes: 124,
    comments: 45,
    shares: 8,
    isLiked: true,
    image: "/placeholder.svg"
  },
  {
    id: "3", 
    content: "Attended an amazing tech conference today! So many inspiring talks about the future of AI and web development. Already excited to implement some of the new ideas I learned.",
    timestamp: "2 weeks ago",
    likes: 67,
    comments: 18,
    shares: 15,
    isLiked: false
  }
];

export default function Profile() {
  const [posts, setPosts] = useState<Post[]>(userPosts);
  const [isFollowing, setIsFollowing] = useState(false);

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

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
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
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Cover Image & Profile Info */}
        <div className="relative">
          <div className="h-48 md:h-64 bg-gradient-to-r from-blue-400 to-purple-500 rounded-b-lg">
            <img 
              src={userProfile.coverImage} 
              alt="Cover" 
              className="w-full h-full object-cover rounded-b-lg"
            />
            <Button 
              variant="secondary" 
              size="sm" 
              className="absolute top-4 right-4"
            >
              <Camera className="h-4 w-4 mr-2" />
              Edit Cover
            </Button>
          </div>
          
          <div className="relative px-4 pb-4">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 md:-mt-20">
              <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-900">
                    <AvatarImage src={userProfile.avatar} />
                    <AvatarFallback className="text-2xl">
                      {userProfile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="absolute bottom-2 right-2 rounded-full w-8 h-8"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {userProfile.name}
                    </h2>
                    {userProfile.verified && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">@{userProfile.username}</p>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-4 md:mt-0">
                <Button 
                  variant={isFollowing ? "outline" : "default"}
                  onClick={handleFollow}
                >
                  <Users className="h-4 w-4 mr-2" />
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                <Button variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <p className="text-gray-900 dark:text-gray-100 max-w-2xl">
                {userProfile.bio}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{userProfile.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <LinkIcon className="h-4 w-4" />
                  <a href={`https://${userProfile.website}`} className="text-blue-600 hover:underline">
                    {userProfile.website}
                  </a>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {userProfile.joinedDate}</span>
                </div>
              </div>
              
              <div className="flex space-x-6 text-sm">
                <div>
                  <span className="font-bold text-gray-900 dark:text-white">{formatNumber(userProfile.following)}</span>
                  <span className="text-gray-600 dark:text-gray-300 ml-1">Following</span>
                </div>
                <div>
                  <span className="font-bold text-gray-900 dark:text-white">{formatNumber(userProfile.followers)}</span>
                  <span className="text-gray-600 dark:text-gray-300 ml-1">Followers</span>
                </div>
                <div>
                  <span className="font-bold text-gray-900 dark:text-white">{userProfile.posts}</span>
                  <span className="text-gray-600 dark:text-gray-300 ml-1">Posts</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="media">Photos & Videos</TabsTrigger>
              <TabsTrigger value="likes">Likes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts" className="mt-6 space-y-6">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={userProfile.avatar} />
                        <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">{userProfile.name}</p>
                        <p className="text-gray-500 text-xs">@{userProfile.username} · {post.timestamp}</p>
                      </div>
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
                      
                      <Button variant="ghost" size="sm" className="text-gray-600">
                        <Share2 className="h-4 w-4 mr-2" />
                        {post.shares}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="media" className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {posts.filter(post => post.image).map((post) => (
                  <div key={post.id} className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={post.image} 
                      alt="Media"
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="likes" className="mt-6">
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Liked posts will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}