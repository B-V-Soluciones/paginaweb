'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, FolderKanban, TrendingUp, TrendingDown, BarChart3, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Package, label: 'Productos', href: '/productos' },
  { icon: FolderKanban, label: 'Categorías', href: '/categorias' },
  { icon: TrendingUp, label: 'Movimientos', href: '/movimientos' },
  { icon: BarChart3, label: 'Reportes', href: '/reportes' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [lowStockCount, setLowStockCount] = useState(0);

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const response = await fetch('/api/dashboard/metrics');
        if (response?.ok) {
          const data = await response.json();
          setLowStockCount(data?.lowStockCount ?? 0);
        }
      } catch (error) {
        console.error('Error fetching low stock:', error);
      }
    };

    fetchLowStock();
    const interval = setInterval(fetchLowStock, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 shadow-lg">
      <div className="flex h-full flex-col">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Inventario Pro
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Sistema de Gestión</p>
        </div>

        {lowStockCount > 0 && (
          <div className="mx-4 mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <div>
                <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">
                  Stock Bajo
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  {lowStockCount} {lowStockCount === 1 ? 'producto' : 'productos'} con stock mínimo
                </p>
              </div>
            </div>
          </div>
        )}

        <nav className="flex-1 p-4 space-y-2">
          {menuItems?.map((item) => {
            const Icon = item?.icon;
            const isActive = pathname === item?.href;
            return (
              <Link
                key={item?.href}
                href={item?.href ?? '/'}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800'
                )}
              >
                {Icon && <Icon className="h-5 w-5" />}
                <span className="font-medium">{item?.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <p className="text-xs text-center text-muted-foreground">
            © 2024 Inventario Pro
          </p>
        </div>
      </div>
    </aside>
  );
}
