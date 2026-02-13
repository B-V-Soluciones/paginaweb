import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request?.url ?? '');
    const startDate = searchParams?.get('startDate') ?? '';
    const endDate = searchParams?.get('endDate') ?? '';

    const where: any = {};

    if (startDate || endDate) {
      where.date = {};
      if (startDate) {
        where.date.gte = new Date(startDate);
      }
      if (endDate) {
        where.date.lte = new Date(endDate);
      }
    }

    const movements = await prisma.stockMovement.findMany({
      where,
      orderBy: {
        date: 'asc',
      },
    });

    const groupedByDate: Record<string, { entradas: number; salidas: number }> = {};

    movements?.forEach((movement: any) => {
      const dateStr = movement?.date?.toISOString()?.split('T')[0] ?? '';
      if (!groupedByDate[dateStr]) {
        groupedByDate[dateStr] = { entradas: 0, salidas: 0 };
      }
      if (movement?.type === 'entrada') {
        groupedByDate[dateStr].entradas += movement?.quantity ?? 0;
      } else {
        groupedByDate[dateStr].salidas += movement?.quantity ?? 0;
      }
    });

    const result = Object.entries(groupedByDate)
      .map(([date, data]) => ({
        date,
        ...data,
      }))
      .sort((a, b) => a?.date?.localeCompare(b?.date ?? '') ?? 0);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching movements by period:', error);
    return NextResponse.json(
      { error: 'Error al obtener movimientos por período' },
      { status: 500 }
    );
  }
}
