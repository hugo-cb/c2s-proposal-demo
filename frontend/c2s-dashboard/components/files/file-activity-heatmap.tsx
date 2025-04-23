"use client";

import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  RefreshCw, 
  Calendar, 
  User, 
  GitBranch,
  Info
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FileActivityHeatmapProps {
  directoryPath: string;
}

interface ActivityData {
  date: string;
  count: number;
  files: {
    path: string;
    changes: number;
  }[];
}

export function FileActivityHeatmap({ directoryPath }: FileActivityHeatmapProps) {
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<string>("year");
  const [authorFilter, setAuthorFilter] = useState<string>("all");
  const [branchFilter, setBranchFilter] = useState<string>("all");
  const [selectedDay, setSelectedDay] = useState<ActivityData | null>(null);

  // Sample activity data - in a real app, this would come from an API
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call to get activity data
    setTimeout(() => {
      // Generate sample data for the past year
      const now = new Date();
      const startDate = new Date(now);
      startDate.setFullYear(now.getFullYear() - 1);
      
      const sampleData: ActivityData[] = [];
      let currentDate = new Date(startDate);
      
      while (currentDate <= now) {
        // Random activity count (more activity on weekdays)
        const isWeekday = currentDate.getDay() > 0 && currentDate.getDay() < 6;
        const randomFactor = isWeekday ? 0.7 : 0.3;
        const count = Math.floor(Math.random() * 10 * randomFactor);
        
        if (count > 0) {
          // Generate sample files for this day
          const files = [];
          const fileCount = Math.min(count, 5); // Max 5 files per day
          
          for (let i = 0; i < fileCount; i++) {
            const fileTypes = ['tsx', 'ts', 'css', 'json', 'md'];
            const fileExt = fileTypes[Math.floor(Math.random() * fileTypes.length)];
            const dirParts = directoryPath.split('/').filter(Boolean);
            const dirName = dirParts.length > 0 ? dirParts[dirParts.length - 1] : 'src';
            
            files.push({
              path: `${directoryPath}/${['component', 'util', 'page', 'helper', 'model'][Math.floor(Math.random() * 5)]}-${i + 1}.${fileExt}`,
              changes: Math.floor(Math.random() * 50) + 1
            });
          }
          
          sampleData.push({
            date: currentDate.toISOString().split('T')[0],
            count,
            files
          });
        } else {
          sampleData.push({
            date: currentDate.toISOString().split('T')[0],
            count: 0,
            files: []
          });
        }
        
        // Move to next day
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      setActivityData(sampleData);
      setIsLoading(false);
    }, 500);
  }, [directoryPath, timeRange]);

  // Get max activity count
  const getMaxCount = () => {
    return Math.max(...activityData.map(day => day.count), 1);
  };

  // Get color intensity based on activity count
  const getColorIntensity = (count: number) => {
    const max = getMaxCount();
    const intensity = count / max;
    
    if (intensity === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (intensity < 0.25) return 'bg-green-100 dark:bg-green-900';
    if (intensity < 0.5) return 'bg-green-300 dark:bg-green-700';
    if (intensity < 0.75) return 'bg-green-500 dark:bg-green-500';
    return 'bg-green-700 dark:bg-green-300';
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Get days of week
  const getDaysOfWeek = () => {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  };

  // Get months for the time range
  const getMonths = () => {
    if (activityData.length === 0) return [];
    
    const months: string[] = [];
    const startDate = new Date(activityData[0].date);
    const endDate = new Date(activityData[activityData.length - 1].date);
    
    let currentDate = new Date(startDate);
    currentDate.setDate(1); // Start from the 1st of the month
    
    while (currentDate <= endDate) {
      months.push(new Intl.DateTimeFormat('en-US', { month: 'short' }).format(currentDate));
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    return months;
  };

  // Group data by week
  const getWeeklyData = () => {
    if (activityData.length === 0) return [];
    
    const weeks: ActivityData[][] = [];
    let currentWeek: ActivityData[] = [];
    let currentDayOfWeek = 0;
    
    // Fill in missing days at the beginning to align with Sunday
    const firstDay = new Date(activityData[0].date).getDay();
    for (let i = 0; i < firstDay; i++) {
      currentWeek.push({
        date: '',
        count: 0,
        files: []
      });
      currentDayOfWeek++;
    }
    
    // Process all days
    for (const day of activityData) {
      currentWeek.push(day);
      currentDayOfWeek++;
      
      if (currentDayOfWeek === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
        currentDayOfWeek = 0;
      }
    }
    
    // Fill in missing days at the end to complete the last week
    if (currentDayOfWeek > 0) {
      for (let i = currentDayOfWeek; i < 7; i++) {
        currentWeek.push({
          date: '',
          count: 0,
          files: []
        });
      }
      weeks.push(currentWeek);
    }
    
    return weeks;
  };

  // Filter data based on time range
  const getFilteredData = () => {
    if (activityData.length === 0) return [];
    
    const now = new Date();
    let startDate: Date;
    
    switch (timeRange) {
      case 'month':
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 3);
        break;
      case 'half':
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 6);
        break;
      case 'year':
      default:
        startDate = new Date(now);
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }
    
    return activityData.filter(day => day.date && new Date(day.date) >= startDate);
  };

  // Handle cell click
  const handleCellClick = (day: ActivityData) => {
    if (day.count > 0) {
      setSelectedDay(day);
    } else {
      setSelectedDay(null);
    }
  };

  // Refresh data
  const refreshData = () => {
    setIsLoading(true);
    // Simulate API call to refresh data
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Filtered data
  const filteredData = getFilteredData();
  const weeklyData = getWeeklyData();
  const months = getMonths();
  const daysOfWeek = getDaysOfWeek();

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium">Activity Heatmap</CardTitle>
            <CardDescription>
              File activity over time for {directoryPath}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={refreshData} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Select
                value={timeRange}
                onValueChange={setTimeRange}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="half">Last 6 Months</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <Select
                value={authorFilter}
                onValueChange={setAuthorFilter}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Author" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Authors</SelectItem>
                  <SelectItem value="john">John Doe</SelectItem>
                  <SelectItem value="jane">Jane Smith</SelectItem>
                  <SelectItem value="mike">Mike Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-muted-foreground" />
              <Select
                value={branchFilter}
                onValueChange={setBranchFilter}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  <SelectItem value="main">main</SelectItem>
                  <SelectItem value="develop">develop</SelectItem>
                  <SelectItem value="feature">feature branches</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2 ml-auto">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-100 dark:bg-gray-800 rounded-sm"></div>
                <span className="text-xs text-muted-foreground">Less</span>
              </div>
              <div className="flex items-center gap-0.5">
                <div className="w-3 h-3 bg-green-100 dark:bg-green-900 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-300 dark:bg-green-700 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-500 dark:bg-green-500 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-700 dark:bg-green-300 rounded-sm"></div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">More</span>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Shows file activity over time. Each cell represents a day.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-[200px]">
              <RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative">
                <div className="flex">
                  <div className="w-8"></div>
                  <div className="flex-1 flex">
                    {months.map((month, index) => (
                      <div key={index} className="flex-1 text-xs text-muted-foreground text-center">
                        {month}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-8 flex flex-col justify-around">
                    {daysOfWeek.map((day, index) => (
                      <div key={index} className="h-7 text-xs text-muted-foreground flex items-center justify-end pr-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex-1 grid grid-flow-col gap-1">
                    {weeklyData.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-1">
                        {week.map((day, dayIndex) => (
                          <TooltipProvider key={dayIndex}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div 
                                  className={`w-7 h-7 rounded-sm cursor-pointer ${day.date ? getColorIntensity(day.count) : 'bg-transparent'} ${selectedDay?.date === day.date ? 'ring-2 ring-primary' : ''}`}
                                  onClick={() => handleCellClick(day)}
                                ></div>
                              </TooltipTrigger>
                              {day.date && (
                                <TooltipContent>
                                  <div className="text-xs">
                                    <p className="font-medium">{formatDate(day.date)}</p>
                                    <p>{day.count} contribution{day.count !== 1 ? 's' : ''}</p>
                                  </div>
                                </TooltipContent>
                              )}
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {selectedDay && (
                <div className="border rounded-md p-4">
                  <h4 className="text-sm font-medium mb-2">Activity on {formatDate(selectedDay.date)}</h4>
                  <div className="space-y-2">
                    {selectedDay.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="truncate flex-1">{file.path.split('/').pop()}</span>
                        <span className="text-muted-foreground">{file.changes} change{file.changes !== 1 ? 's' : ''}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
