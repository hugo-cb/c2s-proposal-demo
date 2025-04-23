"use client";

import React from 'react';
import { AppShell } from "@/components/layout/app-shell";
import { ExecutionLogs } from "@/components/ai-pipeline";
import { Button } from "@/components/ui/button";

// Mock data for demonstration
const mockLogs = [
  {
    id: 'log_001',
    timestamp: '2025-04-05T09:15:05Z',
    level: 'info',
    message: 'Starting pipeline execution',
    details: {
      pipelineId: '1',
      pipelineName: 'Code Analysis',
      executionId: 'exec_001'
    }
  },
  {
    id: 'log_002',
    timestamp: '2025-04-05T09:15:10Z',
    level: 'info',
    message: 'Starting node: Git Repository',
    nodeId: '1',
    nodeName: 'Git Repository',
    details: {
      input: {
        repositoryUrl: 'https://github.com/example/repo',
        branch: 'main'
      }
    }
  },
  {
    id: 'log_003',
    timestamp: '2025-04-05T09:15:20Z',
    level: 'info',
    message: 'Cloning repository',
    nodeId: '1',
    nodeName: 'Git Repository'
  },
  {
    id: 'log_004',
    timestamp: '2025-04-05T09:15:40Z',
    level: 'warning',
    message: 'Large repository, may take longer than expected',
    nodeId: '1',
    nodeName: 'Git Repository',
    details: {
      repoSize: '120MB',
      fileCount: 1500
    }
  },
  {
    id: 'log_005',
    timestamp: '2025-04-05T09:15:45Z',
    level: 'info',
    message: 'Repository cloned successfully',
    nodeId: '1',
    nodeName: 'Git Repository',
    details: {
      clonedPath: '/tmp/repos/example-repo',
      commitHash: 'a1b2c3d4e5f6'
    }
  },
  {
    id: 'log_006',
    timestamp: '2025-04-05T09:15:50Z',
    level: 'info',
    message: 'Node completed: Git Repository',
    nodeId: '1',
    nodeName: 'Git Repository',
    details: {
      duration: '40s',
      output: {
        clonedPath: '/tmp/repos/example-repo',
        commitHash: 'a1b2c3d4e5f6',
        fileCount: 120
      }
    }
  },
  {
    id: 'log_007',
    timestamp: '2025-04-05T09:15:55Z',
    level: 'info',
    message: 'Starting node: Static Analysis',
    nodeId: '2',
    nodeName: 'Static Analysis',
    details: {
      input: {
        sourcePath: '/tmp/repos/example-repo',
        includeTests: false,
        analysisDepth: 3
      }
    }
  },
  {
    id: 'log_008',
    timestamp: '2025-04-05T09:16:30Z',
    level: 'info',
    message: 'Analyzing code complexity',
    nodeId: '2',
    nodeName: 'Static Analysis'
  },
  {
    id: 'log_009',
    timestamp: '2025-04-05T09:17:45Z',
    level: 'error',
    message: 'Error analyzing malformed file',
    nodeId: '2',
    nodeName: 'Static Analysis',
    details: {
      filePath: 'src/broken/file.js',
      error: 'Syntax error: Unexpected token'
    }
  },
  {
    id: 'log_010',
    timestamp: '2025-04-05T09:18:10Z',
    level: 'info',
    message: 'Continuing analysis, ignoring file with error',
    nodeId: '2',
    nodeName: 'Static Analysis'
  },
  {
    id: 'log_011',
    timestamp: '2025-04-05T09:19:30Z',
    level: 'info',
    message: 'Node completed: Static Analysis',
    nodeId: '2',
    nodeName: 'Static Analysis',
    details: {
      duration: '3m 40s',
      output: {
        codeQuality: 85,
        issuesFound: 12,
        complexityScore: 65,
        testCoverage: 72
      }
    }
  },
  {
    id: 'log_012',
    timestamp: '2025-04-05T09:19:35Z',
    level: 'info',
    message: 'Starting node: Report Generation',
    nodeId: '3',
    nodeName: 'Report Generation'
  },
  {
    id: 'log_013',
    timestamp: '2025-04-05T09:20:15Z',
    level: 'debug',
    message: 'Applying template to report',
    nodeId: '3',
    nodeName: 'Report Generation',
    details: {
      templateId: 'standard-report-v2',
      format: 'PDF'
    }
  },
  {
    id: 'log_014',
    timestamp: '2025-04-05T09:20:25Z',
    level: 'info',
    message: 'Node completed: Report Generation',
    nodeId: '3',
    nodeName: 'Report Generation',
    details: {
      duration: '50s',
      output: {
        reportUrl: 'https://example.com/reports/a1b2c3',
        reportFormat: 'PDF',
        reportSize: '1.2MB'
      }
    }
  },
  {
    id: 'log_015',
    timestamp: '2025-04-05T09:20:30Z',
    level: 'info',
    message: 'Pipeline execution completed successfully',
    details: {
      duration: '5m 30s',
      output: {
        reportUrl: 'https://example.com/reports/a1b2c3',
        codeQuality: 85,
        issuesFound: 12
      }
    }
  }
] as any;

const LogsPage = () => {
  return (
    <AppShell>
      <div className="flex h-full">
        <div className="flex-1 p-6">
          <ExecutionLogs
            executionId="exec_001"
            logs={mockLogs}
            onBack={() => {
              window.location.href = '/ai-pipeline/history';
            }}
            onRefresh={() => {
              console.log('Refreshing logs');
              // Implementar lógica de atualização de logs
            }}
          />
        </div>
      </div>
    </AppShell>
  );
};

export default LogsPage;
