'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface MovementData {
  date: string;
  entradas: number;
  salidas: number;
}

interface MovementsChartProps {
  data: MovementData[];
}

export default function MovementsChart({ data }: MovementsChartProps) {
  if (!data || data?.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        No hay datos disponibles
      </div>
    );
  }

  const chartData = data?.map((item) => ({
    fecha: new Date(item?.date ?? '')?.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
    entradas: item?.entradas ?? 0,
    salidas: item?.salidas ?? 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <XAxis
          dataKey="fecha"
          tickLine={false}
          tick={{ fontSize: 10 }}
          label={{ value: 'Fecha', position: 'insideBottom', offset: -15, style: { textAnchor: 'middle', fontSize: 11 } }}
        />
        <YAxis
          tickLine={false}
          tick={{ fontSize: 10 }}
          label={{ value: 'Cantidad', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 11 } }}
        />
        <Tooltip
          contentStyle={{ fontSize: 11 }}
          formatter={(value: number, name: string) => [
            value,
            name === 'entradas' ? 'Entradas' : 'Salidas',
          ]}
        />
        <Legend
          verticalAlign="top"
          wrapperStyle={{ fontSize: 11 }}
        />
        <Line
          type="monotone"
          dataKey="entradas"
          stroke="#10B981"
          strokeWidth={3}
          dot={{ fill: '#10B981', r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="salidas"
          stroke="#EF4444"
          strokeWidth={3}
          dot={{ fill: '#EF4444', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
