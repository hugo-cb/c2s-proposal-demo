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
  ExternalLink,
  AlertCircle
} from "lucide-react";

// Importação dinâmica do componente de visualização de gráficos
const Graph = dynamic(
  () => import('react-d3-graph').then(mod => mod.Graph),
  { ssr: false }
);

// Definição dos tipos para os dados do grafo de dependências
interface DependencyNode {
  id: string;
  label: string;
  type: string;
  domain?: string;
  layer?: string;
  symbolType?: string;
  color: string;
  size: number;
  hasCyclicDependency?: boolean;
  [key: string]: any;
}

interface DependencyLink {
  source: string;
  target: string;
  label?: string;
  type?: string;
  isCritical?: boolean;
  [key: string]: any;
}

interface DependencyData {
  nodes: DependencyNode[];
  links: DependencyLink[];
}

// Dados de exemplo para o grafo de dependências
const sampleDependencyData: DependencyData = {
  nodes: [
    // Serviços
    { id: "user-service", label: "UserService", type: "service", domain: "user", layer: "application", color: "#3b82f6", size: 25, symbolType: "circle" },
    { id: "auth-service", label: "AuthService", type: "service", domain: "auth", layer: "application", color: "#3b82f6", size: 25, symbolType: "circle" },
    { id: "payment-service", label: "PaymentService", type: "service", domain: "payment", layer: "application", color: "#3b82f6", size: 25, symbolType: "circle" },
    { id: "notification-service", label: "NotificationService", type: "service", domain: "notification", layer: "application", color: "#3b82f6", size: 25, symbolType: "circle" },
    { id: "order-service", label: "OrderService", type: "service", domain: "order", layer: "application", color: "#3b82f6", size: 25, symbolType: "circle", hasCyclicDependency: true },
    
    // Repositórios
    { id: "user-repository", label: "UserRepository", type: "repository", domain: "user", layer: "infrastructure", color: "#10b981", size: 20, symbolType: "circle" },
    { id: "auth-repository", label: "AuthRepository", type: "repository", domain: "auth", layer: "infrastructure", color: "#10b981", size: 20, symbolType: "circle" },
    { id: "payment-repository", label: "PaymentRepository", type: "repository", domain: "payment", layer: "infrastructure", color: "#10b981", size: 20, symbolType: "circle" },
    { id: "notification-repository", label: "NotificationRepository", type: "repository", domain: "notification", layer: "infrastructure", color: "#10b981", size: 20, symbolType: "circle" },
    { id: "order-repository", label: "OrderRepository", type: "repository", domain: "order", layer: "infrastructure", color: "#10b981", size: 20, symbolType: "circle" },
    
    // Controladores
    { id: "user-controller", label: "UserController", type: "controller", domain: "user", layer: "presentation", color: "#f59e0b", size: 22, symbolType: "circle" },
    { id: "auth-controller", label: "AuthController", type: "controller", domain: "auth", layer: "presentation", color: "#f59e0b", size: 22, symbolType: "circle" },
    { id: "payment-controller", label: "PaymentController", type: "controller", domain: "payment", layer: "presentation", color: "#f59e0b", size: 22, symbolType: "circle" },
    { id: "order-controller", label: "OrderController", type: "controller", domain: "order", layer: "presentation", color: "#f59e0b", size: 22, symbolType: "circle" },
    
    // Entidades
    { id: "user-entity", label: "UserEntity", type: "entity", domain: "user", layer: "domain", color: "#8b5cf6", size: 18, symbolType: "circle" },
    { id: "payment-entity", label: "PaymentEntity", type: "entity", domain: "payment", layer: "domain", color: "#8b5cf6", size: 18, symbolType: "circle" },
    { id: "order-entity", label: "OrderEntity", type: "entity", domain: "order", layer: "domain", color: "#8b5cf6", size: 18, symbolType: "circle" },
  ],
  links: [
    // Controladores -> Serviços
    { source: "user-controller", target: "user-service", type: "uses" },
    { source: "auth-controller", target: "auth-service", type: "uses" },
    { source: "payment-controller", target: "payment-service", type: "uses" },
    { source: "order-controller", target: "order-service", type: "uses" },
    
    // Serviços -> Repositórios
    { source: "user-service", target: "user-repository", type: "uses" },
    { source: "auth-service", target: "auth-repository", type: "uses" },
    { source: "payment-service", target: "payment-repository", type: "uses" },
    { source: "notification-service", target: "notification-repository", type: "uses" },
    { source: "order-service", target: "order-repository", type: "uses" },
    
    // Serviços -> Entidades
    { source: "user-service", target: "user-entity", type: "uses" },
    { source: "payment-service", target: "payment-entity", type: "uses" },
    { source: "order-service", target: "order-entity", type: "uses" },
    
    // Dependências entre serviços
    { source: "auth-service", target: "user-service", type: "uses" },
    { source: "order-service", target: "user-service", type: "uses" },
    { source: "order-service", target: "payment-service", type: "uses" },
    { source: "payment-service", target: "notification-service", type: "uses" },
    
    // Dependência cíclica (problemática)
    { source: "payment-service", target: "order-service", type: "uses", isCritical: true },
  ]
};

// Tipos de visualização
const viewTypes = [
  { value: "all", label: "Todas as Dependências" },
  { value: "services", label: "Apenas Serviços" },
  { value: "repositories", label: "Serviços e Repositórios" },
  { value: "cyclic", label: "Dependências Cíclicas" },
  { value: "critical", label: "Dependências Críticas" },
];

interface DependencyGraphProps {
  className?: string;
  isFullPage?: boolean;
}

export function DependencyGraph({ className, isFullPage = false }: DependencyGraphProps) {
  const [dependencyData, setDependencyData] = useState<DependencyData>(sampleDependencyData);
  const [viewType, setViewType] = useState<string>("all");
  const [highlightNodes, setHighlightNodes] = useState<Set<string>>(new Set());
  const [highlightLinks, setHighlightLinks] = useState<Set<string>>(new Set());
  const [isClient, setIsClient] = useState(false);
  const [selectedNode, setSelectedNode] = useState<DependencyNode | null>(null);
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
      labelProperty: "label",
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
      labelProperty: "type",
      renderLabel: true,
    },
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Define isClient como true quando o componente é montado
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Atualiza as dimensões quando o tamanho da janela muda
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setGraphConfig(prev => ({
          ...prev,
          width: width,
          height: isFullPage ? height : 500,
        }));
      }
    };
    
    // Dimensões iniciais
    updateDimensions();
    
    // Adiciona listener de evento
    window.addEventListener("resize", updateDimensions);
    
    // Limpeza
    return () => window.removeEventListener("resize", updateDimensions);
  }, [isFullPage]);
  
  // Filtra os dados com base no tipo de visualização selecionado
  useEffect(() => {
    let filteredNodes: DependencyNode[] = [];
    let filteredLinks: DependencyLink[] = [];
    
    switch (viewType) {
      case "services":
        // Apenas nós do tipo serviço
        filteredNodes = sampleDependencyData.nodes.filter(
          node => node.type === "service"
        );
        
        // Links entre serviços
        filteredLinks = sampleDependencyData.links.filter(
          link => {
            const sourceNode = sampleDependencyData.nodes.find(n => n.id === link.source);
            const targetNode = sampleDependencyData.nodes.find(n => n.id === link.target);
            return sourceNode?.type === "service" && targetNode?.type === "service";
          }
        );
        break;
        
      case "repositories":
        // Nós do tipo serviço e repositório
        filteredNodes = sampleDependencyData.nodes.filter(
          node => node.type === "service" || node.type === "repository"
        );
        
        // Links entre serviços e repositórios
        filteredLinks = sampleDependencyData.links.filter(
          link => {
            const sourceNode = sampleDependencyData.nodes.find(n => n.id === link.source);
            const targetNode = sampleDependencyData.nodes.find(n => n.id === link.target);
            return (sourceNode?.type === "service" || sourceNode?.type === "repository") && 
                   (targetNode?.type === "service" || targetNode?.type === "repository");
          }
        );
        break;
        
      case "cyclic":
        // Nós com dependências cíclicas
        const cyclicNodeIds = new Set<string>();
        
        // Encontra links que formam ciclos
        sampleDependencyData.links.forEach(link => {
          if (link.isCritical) {
            cyclicNodeIds.add(link.source);
            cyclicNodeIds.add(link.target);
          }
        });
        
        // Filtra nós e links relacionados a dependências cíclicas
        filteredNodes = sampleDependencyData.nodes.filter(
          node => cyclicNodeIds.has(node.id) || node.hasCyclicDependency
        );
        
        filteredLinks = sampleDependencyData.links.filter(
          link => cyclicNodeIds.has(link.source) && cyclicNodeIds.has(link.target)
        );
        break;
        
      case "critical":
        // Links críticos
        const criticalLinks = sampleDependencyData.links.filter(link => link.isCritical);
        
        // IDs dos nós envolvidos em links críticos
        const criticalNodeIds = new Set<string>();
        criticalLinks.forEach(link => {
          criticalNodeIds.add(link.source);
          criticalNodeIds.add(link.target);
        });
        
        // Filtra nós e links críticos
        filteredNodes = sampleDependencyData.nodes.filter(
          node => criticalNodeIds.has(node.id)
        );
        
        filteredLinks = criticalLinks;
        break;
        
      default:
        // Todos os nós e links
        filteredNodes = sampleDependencyData.nodes;
        filteredLinks = sampleDependencyData.links;
        break;
    }
    
    // Atualiza os dados do grafo
    setDependencyData({
      nodes: filteredNodes,
      links: filteredLinks
    });
    
    // Limpa as seleções
    setHighlightNodes(new Set());
    setHighlightLinks(new Set());
    setSelectedNode(null);
  }, [viewType]);
  
  // Prepara os dados do grafo com cores baseadas no tipo de nó
  const getProcessedData = () => {
    return {
      nodes: dependencyData.nodes.map(node => ({
        ...node,
        color: highlightNodes.size > 0 
          ? highlightNodes.has(node.id) ? node.color : 'rgba(203, 213, 225, 0.5)'
          : node.color,
        size: node.size * 10, // Aumenta o tamanho para melhor visibilidade
      })),
      links: dependencyData.links.map(link => {
        const linkId = `${link.source}-${link.target}`;
        return {
          ...link,
          color: highlightLinks.size > 0
            ? highlightLinks.has(linkId) ? '#3b82f6' : 'rgba(203, 213, 225, 0.2)'
            : link.isCritical ? '#ef4444' : 'rgba(150, 150, 150, 0.8)',
        };
      }),
    };
  };
  
  const handleNodeClick = (nodeId: string) => {
    // Encontra o nó clicado
    const node = dependencyData.nodes.find(n => n.id === nodeId);
    if (!node) return;
    
    // Define o nó selecionado
    setSelectedNode(node);
    
    // Limpa as seleções anteriores
    setHighlightNodes(new Set([nodeId]));
    
    // Destaca os links e nós conectados
    const connectedLinks = new Set<string>();
    const connectedNodes = new Set<string>([nodeId]);
    
    dependencyData.links.forEach(link => {
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
    setSelectedNode(null);
  };
  
  const handleExport = () => {
    const svgElement = document.querySelector('.dependency-container svg');
    if (svgElement) {
      // Cria um elemento canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Define as dimensões do canvas para corresponder ao SVG
      const svgRect = svgElement.getBoundingClientRect();
      canvas.width = svgRect.width;
      canvas.height = svgRect.height;
      
      // Cria uma imagem a partir do SVG
      const data = new XMLSerializer().serializeToString(svgElement);
      const img = new Image();
      
      img.onload = () => {
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          
          // Cria um link de download
          const link = document.createElement('a');
          link.download = 'dependency-graph.png';
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
            Grafo de Dependências
          </div>
        </CardTitle>
        <div className="flex items-center gap-2">
          {!isFullPage && (
            <Link href="/architecture/dependencies">
              <Button variant="outline" size="sm" className="gap-1">
                <ExternalLink className="h-4 w-4" />
                Tela Cheia
              </Button>
            </Link>
          )}
          <Button variant="outline" size="sm" onClick={handleExport} className="gap-1">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="w-full md:w-1/2">
              <label className="text-sm font-medium mb-1 block">Tipo de Visualização</label>
              <Select value={viewType} onValueChange={setViewType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de visualização" />
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
            
            <div className="flex items-center gap-2">
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
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className={`md:col-span-${selectedNode ? '2' : '3'}`}>
              <div 
                ref={containerRef} 
                className={`dependency-container border rounded-md overflow-hidden relative ${isFullPage ? 'h-[600px]' : 'h-[500px]'}`}
              >
                {isClient && (
                  <Graph
                    id="dependency-graph"
                    data={getProcessedData()}
                    config={graphConfig}
                    onClickNode={handleNodeClick}
                  />
                )}
              </div>
            </div>
            
            {selectedNode && (
              <div className="md:col-span-1">
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{selectedNode.label}</h3>
                    {selectedNode.hasCyclicDependency && (
                      <div className="flex items-center gap-1 text-red-500">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-xs">Dependência Cíclica</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Tipo</p>
                      <p className="text-sm capitalize">{selectedNode.type}</p>
                    </div>
                    
                    {selectedNode.domain && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Domínio</p>
                        <p className="text-sm capitalize">{selectedNode.domain}</p>
                      </div>
                    )}
                    
                    {selectedNode.layer && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Camada</p>
                        <p className="text-sm capitalize">{selectedNode.layer}</p>
                      </div>
                    )}
                    
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Dependências</p>
                      <div className="space-y-2 mt-1">
                        <div>
                          <p className="text-xs font-medium">Dependências de Saída</p>
                          <ul className="text-sm list-disc list-inside">
                            {dependencyData.links
                              .filter(link => link.source === selectedNode.id)
                              .map((link, index) => {
                                const targetNode = dependencyData.nodes.find(n => n.id === link.target);
                                return (
                                  <li key={index} className={link.isCritical ? "text-red-500" : ""}>
                                    {targetNode?.label}
                                    {link.isCritical && " (Crítica)"}
                                  </li>
                                );
                              })}
                            {dependencyData.links.filter(link => link.source === selectedNode.id).length === 0 && (
                              <li className="text-muted-foreground">Nenhuma</li>
                            )}
                          </ul>
                        </div>
                        
                        <div>
                          <p className="text-xs font-medium">Dependências de Entrada</p>
                          <ul className="text-sm list-disc list-inside">
                            {dependencyData.links
                              .filter(link => link.target === selectedNode.id)
                              .map((link, index) => {
                                const sourceNode = dependencyData.nodes.find(n => n.id === link.source);
                                return (
                                  <li key={index} className={link.isCritical ? "text-red-500" : ""}>
                                    {sourceNode?.label}
                                    {link.isCritical && " (Crítica)"}
                                  </li>
                                );
                              })}
                            {dependencyData.links.filter(link => link.target === selectedNode.id).length === 0 && (
                              <li className="text-muted-foreground">Nenhuma</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="rounded-lg border p-4 mt-2">
            <h3 className="text-sm font-medium mb-2">Legenda</h3>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#3b82f6" }}></div>
                <span className="text-sm">Serviço</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#10b981" }}></div>
                <span className="text-sm">Repositório</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#f59e0b" }}></div>
                <span className="text-sm">Controlador</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#8b5cf6" }}></div>
                <span className="text-sm">Entidade</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#ef4444" }}></div>
                <span className="text-sm">Dependência Crítica</span>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Clique em um nó para ver detalhes e destacar suas conexões. Use os botões de zoom para ajustar a visualização.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
