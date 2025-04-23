"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GitCompare, 
  Check, 
  X, 
  AlertTriangle,
  ExternalLink,
  Download,
  Filter
} from "lucide-react";

// Tipos para as expectativas e diferenças
interface ExpectationRule {
  id: string;
  type: string;
  description: string;
  status: 'compliant' | 'non-compliant' | 'warning';
  details?: string;
}

interface ExpectationCategory {
  id: string;
  name: string;
  rules: ExpectationRule[];
}

// Dados de exemplo para as expectativas
const expectationData: ExpectationCategory[] = [
  {
    id: "dependencies",
    name: "Regras de Dependência",
    rules: [
      {
        id: "dep-1",
        type: "dependency",
        description: "Serviços não devem depender diretamente de repositórios de outros domínios",
        status: "non-compliant",
        details: "OrderService depende diretamente de UserRepository"
      },
      {
        id: "dep-2",
        type: "dependency",
        description: "Evitar dependências cíclicas entre serviços",
        status: "non-compliant",
        details: "Dependência cíclica detectada entre PaymentService e OrderService"
      },
      {
        id: "dep-3",
        type: "dependency",
        description: "Camada de apresentação só pode depender da camada de aplicação",
        status: "compliant"
      }
    ]
  },
  {
    id: "layers",
    name: "Regras de Camadas",
    rules: [
      {
        id: "layer-1",
        type: "layer",
        description: "Camada de domínio não deve depender de camadas externas",
        status: "compliant"
      },
      {
        id: "layer-2",
        type: "layer",
        description: "Camada de infraestrutura não deve ser acessada diretamente pela apresentação",
        status: "compliant"
      },
      {
        id: "layer-3",
        type: "layer",
        description: "Entidades de domínio não devem ter dependências externas",
        status: "warning",
        details: "Algumas entidades possuem anotações de frameworks ORM"
      }
    ]
  },
  {
    id: "patterns",
    name: "Padrões Arquiteturais",
    rules: [
      {
        id: "pattern-1",
        type: "pattern",
        description: "Usar Repository Pattern para acesso a dados",
        status: "compliant"
      },
      {
        id: "pattern-2",
        type: "pattern",
        description: "Implementar Factory Method para criação de objetos complexos",
        status: "warning",
        details: "Implementado parcialmente, alguns serviços criam objetos diretamente"
      },
      {
        id: "pattern-3",
        type: "pattern",
        description: "Utilizar Strategy Pattern para algoritmos intercambiáveis",
        status: "compliant"
      }
    ]
  },
  {
    id: "naming",
    name: "Convenções de Nomenclatura",
    rules: [
      {
        id: "naming-1",
        type: "naming",
        description: "Serviços devem ter sufixo 'Service'",
        status: "compliant"
      },
      {
        id: "naming-2",
        type: "naming",
        description: "Repositórios devem ter sufixo 'Repository'",
        status: "compliant"
      },
      {
        id: "naming-3",
        type: "naming",
        description: "Controladores devem ter sufixo 'Controller'",
        status: "warning",
        details: "Alguns controladores não seguem a convenção"
      }
    ]
  }
];

// Estatísticas de conformidade
const complianceStats = {
  total: 12,
  compliant: 7,
  nonCompliant: 2,
  warnings: 3,
  complianceRate: 58.3 // (7/12) * 100
};

interface ExpectationDiffViewerProps {
  className?: string;
  isFullPage?: boolean;
}

export function ExpectationDiffViewer({ className, isFullPage = false }: ExpectationDiffViewerProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // Filtra as regras com base nos filtros selecionados
  const filteredRules = expectationData.flatMap(category => {
    if (activeCategory !== "all" && category.id !== activeCategory) {
      return [];
    }
    
    return category.rules.filter(rule => {
      if (statusFilter === "all") return true;
      return rule.status === statusFilter;
    });
  });
  
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          <div className="flex items-center gap-2">
            <GitCompare className="h-5 w-5" />
            Diferenças de Expectativas
          </div>
        </CardTitle>
        <div className="flex items-center gap-2">
          {!isFullPage && (
            <Button variant="outline" size="sm" asChild>
              <a href="/architecture/expectations">
                <ExternalLink className="h-4 w-4 mr-2" />
                Ver Detalhes
              </a>
            </Button>
          )}
          {isFullPage && (
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar Relatório
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Resumo de conformidade */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-lg border p-3 text-center">
              <div className="text-2xl font-bold">{complianceStats.total}</div>
              <div className="text-xs text-muted-foreground">Total de Regras</div>
            </div>
            <div className="rounded-lg border p-3 text-center bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{complianceStats.compliant}</div>
              <div className="text-xs text-green-600 dark:text-green-400">Conformes</div>
            </div>
            <div className="rounded-lg border p-3 text-center bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{complianceStats.nonCompliant}</div>
              <div className="text-xs text-red-600 dark:text-red-400">Não Conformes</div>
            </div>
            <div className="rounded-lg border p-3 text-center bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{complianceStats.warnings}</div>
              <div className="text-xs text-yellow-600 dark:text-yellow-400">Avisos</div>
            </div>
          </div>
          
          {/* Gráfico de conformidade */}
          {!isFullPage && (
            <div className="rounded-lg border p-4">
              <h3 className="text-sm font-medium mb-2">Taxa de Conformidade</h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                <div 
                  className="bg-primary h-2.5 rounded-full" 
                  style={{ width: `${complianceStats.complianceRate}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>{complianceStats.complianceRate.toFixed(1)}%</span>
                <span>100%</span>
              </div>
            </div>
          )}
          
          {/* Filtros */}
          {isFullPage && (
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="w-full md:w-1/2">
                <label className="text-sm font-medium mb-1 block">Categoria</label>
                <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="all" className="flex-1">Todas</TabsTrigger>
                    {expectationData.map(category => (
                      <TabsTrigger key={category.id} value={category.id} className="flex-1">
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="w-full md:w-1/2">
                <label className="text-sm font-medium mb-1 block">Status</label>
                <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="all" className="flex-1">Todos</TabsTrigger>
                    <TabsTrigger value="compliant" className="flex-1 text-green-600">Conformes</TabsTrigger>
                    <TabsTrigger value="non-compliant" className="flex-1 text-red-600">Não Conformes</TabsTrigger>
                    <TabsTrigger value="warning" className="flex-1 text-yellow-600">Avisos</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          )}
          
          {/* Lista de regras */}
          <div className="space-y-2">
            {filteredRules.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma regra encontrada para os critérios selecionados.
              </div>
            ) : (
              filteredRules.map((rule) => (
                <div 
                  key={rule.id} 
                  className={`rounded-lg border p-3 ${
                    rule.status === 'compliant' 
                      ? 'border-green-200 dark:border-green-800' 
                      : rule.status === 'non-compliant'
                        ? 'border-red-200 dark:border-red-800'
                        : 'border-yellow-200 dark:border-yellow-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 rounded-full p-1 ${
                      rule.status === 'compliant' 
                        ? 'bg-green-100 dark:bg-green-900' 
                        : rule.status === 'non-compliant'
                          ? 'bg-red-100 dark:bg-red-900'
                          : 'bg-yellow-100 dark:bg-yellow-900'
                    }`}>
                      {rule.status === 'compliant' ? (
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                      ) : rule.status === 'non-compliant' ? (
                        <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">{rule.description}</h3>
                        <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                          {rule.type}
                        </span>
                      </div>
                      
                      {rule.details && (
                        <p className="text-xs text-muted-foreground mt-1">{rule.details}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Ações */}
          {isFullPage && (
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
