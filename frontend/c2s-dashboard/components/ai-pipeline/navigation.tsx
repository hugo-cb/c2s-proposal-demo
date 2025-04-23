'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Nodes', href: '/ai-pipeline/nodes' },
  { name: 'Flows', href: '/ai-pipeline/flows' },
  { name: 'Pipelines', href: '/ai-pipeline/pipelines' },
  { name: 'Runs', href: '/ai-pipeline/runs' }
];

export function AIPipelineNavigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b">
      <div className="flex items-center px-4 py-2">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
