import { Bell, Search, User, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 gap-4">
        <SidebarTrigger className="h-8 w-8" />
        
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search beneficiaries by ID, name, or phone..." 
              className="pl-10 bg-muted/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">EN</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>हिंदी</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-destructive">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start p-3 space-y-1">
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-2 h-2 bg-destructive rounded-full"></div>
                    <span className="font-medium text-sm">High-Risk Alert</span>
                    <Badge variant="destructive" className="ml-auto text-xs">Urgent</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">3 beneficiaries flagged as high-risk in Shimla district</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start p-3 space-y-1">
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="font-medium text-sm">Missed Follow-ups</span>
                    <Badge variant="outline" className="ml-auto text-xs">Pending</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">12 beneficiaries have missed scheduled follow-ups</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start p-3 space-y-1">
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="font-medium text-sm">Teleconsultation Request</span>
                    <Badge variant="secondary" className="ml-auto text-xs">New</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">5 new teleconsultation requests pending approval</p>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Dr. Sharma</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div>
                  <p className="font-medium">Dr. Rajesh Sharma</p>
                  <p className="text-xs text-muted-foreground">District Health Officer</p>
                  <p className="text-xs text-muted-foreground">Shimla, Himachal Pradesh</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Change Password</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}