'use client';

import { useEffect, useState } from 'react';
import { Download, Calendar, TrendingUp, PieChart, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import TopProductsChart from './top-products-chart';
import MovementsChart from './movements-chart';
import InventoryValueChart from './inventory-value-chart';

interface TopProduct {
  id: string;
  name: string;
  sku: string;
  totalSold: number;
  revenue: number;
}

interface MovementData {
  date: string;
  entradas: number;
  salidas: number;
}

interface InventoryValue {
  name: string;
  value: number;
  color: string;
}

export default function ReportsContent() {
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [movementsData, setMovementsData] = useState<MovementData[]>([]);
  const [inventoryValue, setInventoryValue] = useState<InventoryValue[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchReports();
  }, [startDate, endDate]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const [topProductsRes, movementsRes, inventoryValueRes] = await Promise.all([
        fetch('/api/reports/top-products'),
        fetch(`/api/reports/movements-by-period?${params}`),
        fetch('/api/reports/inventory-value'),
      ]);

      if (topProductsRes?.ok) {
        const data = await topProductsRes.json();
        setTopProducts(data ?? []);
      }

      if (movementsRes?.ok) {
        const data = await movementsRes.json();
        setMovementsData(data ?? []);
      }

      if (inventoryValueRes?.ok) {
        const data = await inventoryValueRes.json();
        setInventoryValue(data ?? []);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los reportes',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (!data || data?.length === 0) {
      toast({
        title: 'Error',
        description: 'No hay datos para exportar',
        variant: 'destructive',
      });
      return;
    }

    const headers = Object.keys(data[0] ?? {});
    const csvContent = [
      headers?.join(','),
      ...data?.map((row) => headers?.map((header) => row?.[header] ?? '')?.join(',')),
    ]?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: 'Éxito',
      description: 'Reporte exportado correctamente',
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Reportes y Análisis
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Visualiza el rendimiento de tu inventario
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Fecha Inicio
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e?.target?.value ?? '')}
                className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Fecha Fin
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e?.target?.value ?? '')}
                className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </div>
          </div>
          <div className="flex items-end">
            <Button
              onClick={() => {
                setStartDate('');
                setEndDate('');
              }}
              variant="outline"
            >
              Limpiar Filtros
            </Button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Cargando reportes...</p>
        </div>
      ) : (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Productos Más Vendidos
                </h2>
              </div>
              <Button
                onClick={() => exportToCSV(topProducts, 'productos-mas-vendidos')}
                variant="outline"
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar CSV
              </Button>
            </div>
            <TopProductsChart data={topProducts} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Movimientos por Período
                </h2>
              </div>
              <Button
                onClick={() => exportToCSV(movementsData, 'movimientos-por-periodo')}
                variant="outline"
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar CSV
              </Button>
            </div>
            <MovementsChart data={movementsData} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Valor de Inventario por Categoría
                </h2>
              </div>
              <Button
                onClick={() => exportToCSV(inventoryValue, 'valor-inventario-categoria')}
                variant="outline"
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar CSV
              </Button>
            </div>
            <InventoryValueChart data={inventoryValue} />
          </motion.div>
        </div>
      )}
    </div>
  );
}
