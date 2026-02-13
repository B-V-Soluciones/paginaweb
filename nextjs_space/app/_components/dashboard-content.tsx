'use client';

import { useEffect, useState } from 'react';
import { Package, DollarSign, AlertTriangle, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

interface Metrics {
  totalProducts: number;
  totalStockValue: number;
  lowStockCount: number;
}

interface RecentActivity {
  id: string;
  productName: string;
  type: string;
  quantity: number;
  date: string;
}

export default function DashboardContent() {
  const [metrics, setMetrics] = useState<Metrics>({
    totalProducts: 0,
    totalStockValue: 0,
    lowStockCount: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metricsRes, activityRes] = await Promise.all([
          fetch('/api/dashboard/metrics'),
          fetch('/api/dashboard/recent-activity'),
        ]);

        if (metricsRes?.ok) {
          const metricsData = await metricsRes.json();
          setMetrics(metricsData ?? {});
        }

        if (activityRes?.ok) {
          const activityData = await activityRes.json();
          setRecentActivity(activityData ?? []);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cards = [
    {
      title: 'Total Productos',
      value: metrics?.totalProducts ?? 0,
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    },
    {
      title: 'Valor Total Stock',
      value: metrics?.totalStockValue ?? 0,
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      prefix: '$',
    },
    {
      title: 'Stock Bajo',
      value: metrics?.lowStockCount ?? 0,
      icon: AlertTriangle,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20',
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Resumen general del inventario y actividad reciente
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards?.map((card, index) => {
          const Icon = card?.icon;
          return (
            <motion.div
              key={card?.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${card?.bgColor} rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${card?.color} text-white`}>
                  {Icon && <Icon className="h-6 w-6" />}
                </div>
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                {card?.title}
              </h3>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {loading ? (
                  <span>-</span>
                ) : (
                  <CountUp
                    end={card?.value ?? 0}
                    duration={2}
                    separator=","
                    decimals={card?.prefix === '$' ? 2 : 0}
                    prefix={card?.prefix ?? ''}
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Actividad Reciente
          </h2>
        </div>
        {loading ? (
          <p className="text-gray-500 text-center py-8">Cargando...</p>
        ) : recentActivity?.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No hay actividad reciente</p>
        ) : (
          <div className="space-y-3">
            {recentActivity?.slice(0, 10)?.map((activity, index) => (
              <motion.div
                key={activity?.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      activity?.type === 'entrada'
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {activity?.productName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activity?.type === 'entrada' ? 'Entrada' : 'Salida'} de{' '}
                      {activity?.quantity} unidades
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(activity?.date ?? '')?.toLocaleDateString('es-ES')}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
