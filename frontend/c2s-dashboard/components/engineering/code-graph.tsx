"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Network,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Download,
  Filter,
  ExternalLink
} from "lucide-react";

// Dynamically import Graph with no SSR
const Graph = dynamic(
  () => import('react-d3-graph').then(mod => mod.Graph),
  { ssr: false }
);

// Define types for graph data
interface GraphNode {
  id: string;
  group: string;
  size: number;
  color: string;
  symbolType?: string;
  [key: string]: any;
}

interface GraphLink {
  source: string;
  target: string;
  [key: string]: any;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

// Sample data for code dependencies
const sampleGraphData: GraphData = {
  nodes: [
    { id: "main.ts", group: "entry", size: 25, color: "#3b82f6", symbolType: "circle" },
    { id: "utils/helpers.ts", group: "utils", size: 15, color: "#10b981", symbolType: "circle" },
    { id: "utils/formatters.ts", group: "utils", size: 12, color: "#10b981", symbolType: "circle" },
    { id: "components/Button.tsx", group: "components", size: 18, color: "#f59e0b", symbolType: "circle" },
    { id: "components/Card.tsx", group: "components", size: 20, color: "#f59e0b", symbolType: "circle" },
    { id: "components/Input.tsx", group: "components", size: 16, color: "#f59e0b", symbolType: "circle" },
    { id: "components/Form.tsx", group: "components", size: 22, color: "#f59e0b", symbolType: "circle" },
    { id: "hooks/useAuth.ts", group: "hooks", size: 14, color: "#8b5cf6", symbolType: "circle" },
    { id: "hooks/useForm.ts", group: "hooks", size: 13, color: "#8b5cf6", symbolType: "circle" },
    { id: "api/auth.ts", group: "api", size: 17, color: "#ef4444", symbolType: "circle" },
    { id: "api/users.ts", group: "api", size: 16, color: "#ef4444", symbolType: "circle" },
    { id: "contexts/AuthContext.tsx", group: "contexts", size: 19, color: "#ec4899", symbolType: "circle" },
    { id: "contexts/ThemeContext.tsx", group: "contexts", size: 15, color: "#ec4899", symbolType: "circle" },
    { id: "pages/Login.tsx", group: "pages", size: 21, color: "#6366f1", symbolType: "circle" },
    { id: "pages/Dashboard.tsx", group: "pages", size: 24, color: "#6366f1", symbolType: "circle" },
    { id: "pages/Profile.tsx", group: "pages", size: 18, color: "#6366f1", symbolType: "circle" },
  ],
  links: [
    { source: "main.ts", target: "pages/Login.tsx" },
    { source: "main.ts", target: "pages/Dashboard.tsx" },
    { source: "main.ts", target: "pages/Profile.tsx" },
    { source: "main.ts", target: "contexts/AuthContext.tsx" },
    { source: "main.ts", target: "contexts/ThemeContext.tsx" },
    { source: "pages/Login.tsx", target: "components/Form.tsx" },
    { source: "pages/Login.tsx", target: "components/Button.tsx" },
    { source: "pages/Login.tsx", target: "components/Input.tsx" },
    { source: "pages/Login.tsx", target: "hooks/useAuth.ts" },
    { source: "pages/Login.tsx", target: "hooks/useForm.ts" },
    { source: "pages/Dashboard.tsx", target: "components/Card.tsx" },
    { source: "pages/Dashboard.tsx", target: "components/Button.tsx" },
    { source: "pages/Dashboard.tsx", target: "utils/helpers.ts" },
    { source: "pages/Dashboard.tsx", target: "utils/formatters.ts" },
    { source: "pages/Profile.tsx", target: "components/Form.tsx" },
    { source: "pages/Profile.tsx", target: "components/Input.tsx" },
    { source: "pages/Profile.tsx", target: "hooks/useForm.ts" },
    { source: "components/Form.tsx", target: "components/Input.tsx" },
    { source: "components/Form.tsx", target: "components/Button.tsx" },
    { source: "hooks/useAuth.ts", target: "api/auth.ts" },
    { source: "hooks/useForm.ts", target: "utils/helpers.ts" },
    { source: "api/auth.ts", target: "utils/helpers.ts" },
    { source: "api/users.ts", target: "utils/helpers.ts" },
    { source: "api/users.ts", target: "utils/formatters.ts" },
    { source: "contexts/AuthContext.tsx", target: "hooks/useAuth.ts" },
    { source: "contexts/AuthContext.tsx", target: "api/auth.ts" },
  ]
};

// Graph view types
const viewTypes = [
  { value: "dependencies", label: "Dependencies" },
  { value: "imports", label: "Imports" },
  { value: "exports", label: "Exports" },
  { value: "inheritance", label: "Inheritance" }
];

// File types for filtering
const fileTypes = [
  { value: "all", label: "All Files" },
  { value: "components", label: "Components" },
  { value: "hooks", label: "Hooks" },
  { value: "utils", label: "Utilities" },
  { value: "api", label: "API" },
  { value: "contexts", label: "Contexts" },
  { value: "pages", label: "Pages" }
];

interface CodeGraphProps {
  className?: string;
  isFullscreenPage?: boolean;
}

export function CodeGraph({ className, isFullscreenPage = false }: CodeGraphProps) {
  const [graphData, setGraphData] = useState<GraphData>(sampleGraphData);
  const [viewType, setViewType] = useState("dependencies");
  const [fileType, setFileType] = useState("all");
  const [highlightNodes, setHighlightNodes] = useState<Set<string>>(new Set());
  const [highlightLinks, setHighlightLinks] = useState<Set<string>>(new Set());
  const [isClient, setIsClient] = useState(false);
  const [graphConfig, setGraphConfig] = useState({
    nodeHighlightBehavior: true,
    linkHighlightBehavior: true,
    height: 500,
    width: 800,
    d3: {
      gravity: -250,
      linkLength: 120,
      alphaTarget: 0.1,
    },
    node: {
      color: "#d3d3d3",
      fontColor: "black",
      fontSize: 12,
      fontWeight: "normal",
      highlightColor: "red",
      highlightFontSize: 14,
      highlightFontWeight: "bold",
      highlightStrokeColor: "red",
      highlightStrokeWidth: 1.5,
      labelProperty: "id",
      mouseCursor: "pointer",
      opacity: 1,
      renderLabel: true,
      size: 500,
      strokeColor: "none",
      strokeWidth: 1.5,
      symbolType: "circle",
      viewGenerator: null,
    },
    link: {
      color: "#d3d3d3",
      fontColor: "black",
      fontSize: 8,
      fontWeight: "normal",
      highlightColor: "#3b82f6",
      highlightFontSize: 8,
      highlightFontWeight: "bold",
      mouseCursor: "pointer",
      opacity: 0.6,
      semanticStrokeWidth: false,
      strokeWidth: 1.5,
      type: "STRAIGHT",
    },
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Handle window resize for responsiveness
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setGraphConfig(prev => ({
          ...prev,
          width: width,
          height: isFullscreenPage ? height : 500,
        }));
      }
    };
    
    // Initial dimensions
    updateDimensions();
    
    // Add event listener
    window.addEventListener("resize", updateDimensions);
    
    // Clean up
    return () => window.removeEventListener("resize", updateDimensions);
  }, [isFullscreenPage]);
  
  // Filter graph data based on file type
  useEffect(() => {
    if (fileType === "all") {
      setGraphData(sampleGraphData);
    } else {
      const filteredNodes = sampleGraphData.nodes.filter(
        node => node.group === fileType || node.id === "main.ts" // Always include entry point
      );
      
      const nodeIds = new Set(filteredNodes.map(node => node.id));
      
      const filteredLinks = sampleGraphData.links.filter(
        link => nodeIds.has(link.source) && nodeIds.has(link.target)
      );
      
      setGraphData({
        nodes: filteredNodes,
        links: filteredLinks
      });
    }
  }, [fileType]);
  
  // Prepare graph data with node colors based on group
  const getProcessedData = () => {
    return {
      nodes: graphData.nodes.map(node => ({
        ...node,
        color: highlightNodes.size > 0 
          ? highlightNodes.has(node.id) ? node.color : 'rgba(203, 213, 225, 0.5)'
          : node.color,
        size: node.size * 10, // Scale up the size for better visibility
      })),
      links: graphData.links.map(link => {
        const linkId = `${link.source}-${link.target}`;
        return {
          ...link,
          color: highlightLinks.size > 0
            ? highlightLinks.has(linkId) ? '#3b82f6' : 'rgba(203, 213, 225, 0.2)'
            : 'rgba(150, 150, 150, 0.8)',
        };
      }),
    };
  };
  
  const handleNodeClick = (nodeId: string) => {
    // Clear previous highlights
    setHighlightNodes(new Set([nodeId]));
    
    // Highlight connected links and nodes
    const connectedLinks = new Set<string>();
    const connectedNodes = new Set<string>([nodeId]);
    
    graphData.links.forEach(link => {
      if (link.source === nodeId || link.target === nodeId) {
        connectedLinks.add(`${link.source}-${link.target}`);
        if (link.source === nodeId) {
          connectedNodes.add(link.target);
        } else {
          connectedNodes.add(link.source);
        }
      }
    });
    
    setHighlightNodes(connectedNodes);
    setHighlightLinks(connectedLinks);
  };
  
  const handleReset = () => {
    setHighlightNodes(new Set());
    setHighlightLinks(new Set());
  };
  
  const handleExport = () => {
    const svgElement = document.querySelector('.graph-container svg');
    if (svgElement) {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas dimensions to match SVG
      const svgRect = svgElement.getBoundingClientRect();
      canvas.width = svgRect.width;
      canvas.height = svgRect.height;
      
      // Create an image from the SVG
      const data = new XMLSerializer().serializeToString(svgElement);
      const img = new Image();
      
      img.onload = () => {
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          
          // Create download link
          const link = document.createElement('a');
          link.download = 'code-graph.png';
          link.href = canvas.toDataURL('image/png');
          link.click();
        }
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(data)));
    }
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          <div className="flex items-center gap-2">
            <Network className="h-5 w-5" />
            Code Dependency Graph
          </div>
        </CardTitle>
        <div className="flex items-center gap-2">
          {!isFullscreenPage && (
            <Link href="/engineering/code-graph">
              <Button variant="outline" size="sm" className="gap-1">
                <ExternalLink className="h-4 w-4" />
                Fullscreen
              </Button>
            </Link>
          )}
          <Button variant="outline" size="sm" onClick={handleExport} className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/2">
              <label className="text-sm font-medium mb-1 block">View Type</label>
              <Select value={viewType} onValueChange={setViewType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select view type" />
                </SelectTrigger>
                <SelectContent>
                  {viewTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-1/2">
              <label className="text-sm font-medium mb-1 block">File Type</label>
              <Select value={fileType} onValueChange={setFileType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select file type" />
                </SelectTrigger>
                <SelectContent>
                  {fileTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setGraphConfig(prev => ({
              ...prev,
              d3: { ...prev.d3, linkLength: prev.d3.linkLength + 20 }
            }))}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setGraphConfig(prev => ({
              ...prev,
              d3: { ...prev.d3, linkLength: Math.max(60, prev.d3.linkLength - 20) }
            }))}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
          
          <div 
            ref={containerRef} 
            className={`graph-container border rounded-md overflow-hidden relative ${isFullscreenPage ? 'h-full' : 'h-[500px]'}`}
          >
            {isClient && (
              <Graph
                id="code-dependency-graph"
                data={getProcessedData()}
                config={graphConfig}
                onClickNode={handleNodeClick}
              />
            )}
          </div>
          
          <div className="rounded-lg border p-4 mt-2">
            <h3 className="text-sm font-medium mb-2">Graph Legend</h3>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#3b82f6" }}></div>
                <span className="text-sm">Entry Point</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#f59e0b" }}></div>
                <span className="text-sm">Components</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#10b981" }}></div>
                <span className="text-sm">Utilities</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#8b5cf6" }}></div>
                <span className="text-sm">Hooks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#ef4444" }}></div>
                <span className="text-sm">API</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#ec4899" }}></div>
                <span className="text-sm">Contexts</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#6366f1" }}></div>
                <span className="text-sm">Pages</span>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Click on a node to highlight its connections. Use the zoom buttons to adjust the view.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
