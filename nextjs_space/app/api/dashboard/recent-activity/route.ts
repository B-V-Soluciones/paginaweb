import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const recentMovements = await prisma.stockMovement.findMany({
      take: 10,
      orderBy: {
        date: 'desc',
      },
      include: {
        product: {
          select: {
            name: true,
          },
        },
      },
    });

    const formattedActivity = recentMovements?.map((movement: any) => ({
      id: movement?.id ?? '',
      productName: movement?.product?.name ?? '',
      type: movement?.type ?? '',
      quantity: movement?.quantity ?? 0,
      date: movement?.date?.toISOString() ?? '',
    })) ?? [];

    return NextResponse.json(formattedActivity);
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    return NextResponse.json(
      { error: 'Error al obtener actividad reciente' },
      { status: 500 }
    );
  }
}
