'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface TopProduct {
  id: string;
  name: string;
  sku: string;
  totalSold: number;
  revenue: number;
}

interface TopProductsChartProps {
  data: TopProduct[];
}

export default function TopProductsChart({ data }: TopProductsChartProps) {
  if (!data || data?.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        No hay datos disponibles
      </div>
    );
  }

  const chartData = data?.slice(0, 10)?.map((item) => ({
    name: item?.name?.length > 20 ? item?.name?.substring(0, 20) + '...' : item?.name,
    cantidad: item?.totalSold ?? 0,
    ingresos: parseFloat((item?.revenue ?? 0)?.toFixed(2)),
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
      >
        <XAxis
          dataKey="name"
          angle={-45}
          textAnchor="end"
          height={80}
          tickLine={false}
          tick={{ fontSize: 10 }}
          label={{ value: 'Productos', position: 'insideBottom', offset: -15, style: { textAnchor: 'middle', fontSize: 11 } }}
        />
        <YAxis
          yAxisId="left"
          tickLine={false}
          tick={{ fontSize: 10 }}
          label={{ value: 'Cantidad Vendida', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 11 } }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tickLine={false}
          tick={{ fontSize: 10 }}
          label={{ value: 'Ingresos ($)', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fontSize: 11 } }}
        />
        <Tooltip
          contentStyle={{ fontSize: 11 }}
          formatter={(value: number, name: string) => [
            name === 'ingresos' ? `$${value?.toFixed(2)}` : value,
            name === 'cantidad' ? 'Cantidad' : 'Ingresos',
          ]}
        />
        <Legend
          verticalAlign="top"
          wrapperStyle={{ fontSize: 11 }}
        />
        <Bar yAxisId="left" dataKey="cantidad" fill="#60B5FF" radius={[8, 8, 0, 0]} />
        <Bar yAxisId="right" dataKey="ingresos" fill="#FF9149" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
