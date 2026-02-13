'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface InventoryValue {
  name: string;
  value: number;
  color: string;
}

interface InventoryValueChartProps {
  data: InventoryValue[];
}

export default function InventoryValueChart({ data }: InventoryValueChartProps) {
  if (!data || data?.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        No hay datos disponibles
      </div>
    );
  }

  const chartData = data?.map((item) => ({
    name: item?.name,
    value: parseFloat((item?.value ?? 0)?.toFixed(2)),
    color: item?.color,
  }));

  const totalValue = chartData?.reduce((sum, item) => sum + (item?.value ?? 0), 0) ?? 0;

  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry) => `${entry?.name}: $${entry?.value?.toFixed(2)}`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color ?? '#6B7280'} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ fontSize: 11 }}
              formatter={(value: number) => `$${value?.toFixed(2)}`}
            />
            <Legend
              verticalAlign="top"
              wrapperStyle={{ fontSize: 11 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-1">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Resumen de Valor
          </h3>
          <div className="space-y-3">
            {chartData?.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: item?.color }}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {item?.name}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    ${item?.value?.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {((item?.value / totalValue) * 100)?.toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900 dark:text-white">Total</span>
                <span className="text-lg font-bold text-blue-600">
                  ${totalValue?.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
