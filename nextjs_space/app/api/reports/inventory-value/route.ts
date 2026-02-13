import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: {
            name: true,
            color: true,
          },
        },
      },
    });

    const valueByCategory: Record<string, { name: string; value: number; color: string }> = {};

    products?.forEach((product: any) => {
      const categoryName = product?.category?.name ?? 'Sin categoría';
      const categoryColor = product?.category?.color ?? '#6B7280';
      const productValue = (product?.price ?? 0) * (product?.stock ?? 0);

      if (!valueByCategory[categoryName]) {
        valueByCategory[categoryName] = {
          name: categoryName,
          value: 0,
          color: categoryColor,
        };
      }
      valueByCategory[categoryName].value += productValue;
    });

    const result = Object.values(valueByCategory).sort(
      (a, b) => (b?.value ?? 0) - (a?.value ?? 0)
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching inventory value:', error);
    return NextResponse.json(
      { error: 'Error al obtener valor de inventario' },
      { status: 500 }
    );
  }
}
