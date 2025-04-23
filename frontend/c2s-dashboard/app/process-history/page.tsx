import React from 'react';
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar } from "@/components/layout/sidebar";

const ProcessHistoryPage = () => {
  return (
    <AppShell>
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">Process History</h1>
              <p className="text-muted-foreground">
                Logs of IA pipeline runs, project clones, and pulls.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Event Log</CardTitle>
                <CardDescription>History of all processes</CardDescription>
              </CardHeader>
              <CardContent>
                <table className="table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Event</th>
                      <th className="px-4 py-2">Timestamp</th>
                      <th className="px-4 py-2">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">IA Pipeline Run</td>
                      <td className="border px-4 py-2">2025-04-07 18:59:00</td>
                      <td className="border px-4 py-2">Pipeline: Example, Status: Success</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Project Clone</td>
                      <td className="border px-4 py-2">2025-04-07 18:58:00</td>
                      <td className="border px-4 py-2">Repository: origin/main</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">IA Run</td>
                      <td className="border px-4 py-2">2025-04-07 18:57:00</td>
                      <td className="border px-4 py-2">File: main.py</td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default ProcessHistoryPage;
