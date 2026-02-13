import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [totalProducts, products, lowStockProducts] = await Promise.all([
      prisma.product.count(),
      prisma.product.findMany({
        select: {
          price: true,
          stock: true,
        },
      }),
      prisma.product.count({
        where: {
          stock: {
            lte: prisma.product.fields.minStock,
          },
        },
      }),
    ]);

    const totalStockValue = products?.reduce(
      (acc: number, product: { price: number; stock: number }) => acc + (product?.price ?? 0) * (product?.stock ?? 0),
      0
    ) ?? 0;

    return NextResponse.json({
      totalProducts: totalProducts ?? 0,
      totalStockValue: totalStockValue ?? 0,
      lowStockCount: lowStockProducts ?? 0,
    });
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return NextResponse.json(
      { error: 'Error al obtener métricas' },
      { status: 500 }
    );
  }
}
