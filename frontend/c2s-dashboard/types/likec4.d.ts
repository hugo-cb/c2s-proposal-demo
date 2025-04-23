declare module '@likec4/diagrams' {
  export const C4Diagram: React.ComponentType<{
    spec: string;
    view: string;
    onElementClick?: (element: any) => void;
    className?: string;
  }>;
}

declare module '@likec4/core' {
  // Add any types you need from the core package
}
