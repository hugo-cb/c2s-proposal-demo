"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationCenter } from "@/components/notifications/notification-center";
import { useAuth } from "@/contexts/auth-context";

export function Header() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality
  };

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <div className="hidden md:block">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-64 rounded-md bg-background pl-8 md:w-80"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <NotificationCenter />
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <div className="text-sm font-medium">{user?.name || 'User'}</div>
            <div className="text-xs text-muted-foreground">{user?.email || 'user@example.com'}</div>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt={user?.name || 'User'} />
            <AvatarFallback>{user?.name ? user.name.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
