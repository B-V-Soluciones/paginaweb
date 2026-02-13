import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request?.url ?? '');
    const limit = parseInt(searchParams?.get('limit') ?? '10');

    const movements = await prisma.stockMovement.findMany({
      where: {
        type: 'salida',
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            sku: true,
            price: true,
          },
        },
      },
    });

    const productSales: Record<string, { name: string; sku: string; totalSold: number; revenue: number }> = {};

    movements?.forEach((movement: any) => {
      const productId = movement?.product?.id ?? '';
      if (!productSales[productId]) {
        productSales[productId] = {
          name: movement?.product?.name ?? '',
          sku: movement?.product?.sku ?? '',
          totalSold: 0,
          revenue: 0,
        };
      }
      productSales[productId].totalSold += movement?.quantity ?? 0;
      productSales[productId].revenue += (movement?.quantity ?? 0) * (movement?.product?.price ?? 0);
    });

    const topProducts = Object.entries(productSales)
      .map(([id, data]) => ({
        id,
        ...data,
      }))
      .sort((a, b) => (b?.totalSold ?? 0) - (a?.totalSold ?? 0))
      .slice(0, limit);

    return NextResponse.json(topProducts);
  } catch (error) {
    console.error('Error fetching top products:', error);
    return NextResponse.json(
      { error: 'Error al obtener productos más vendidos' },
      { status: 500 }
    );
  }
}
