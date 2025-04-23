import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Log {
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
}

interface ExecutionLogsProps {
  logs?: Log[];
}

export function ExecutionLogs({ logs = [] }: ExecutionLogsProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Execution Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full">
          {logs.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No logs available</p>
          ) : (
            <div className="space-y-2">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className={`p-2 rounded text-sm font-mono ${
                    log.level === 'error' ? 'bg-red-500/10 text-red-500' :
                    log.level === 'warning' ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-gray-500/10 text-gray-500'
                  }`}
                >
                  <span className="text-xs opacity-75">{log.timestamp}</span>
                  <span className="mx-2">|</span>
                  <span>{log.message}</span>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
