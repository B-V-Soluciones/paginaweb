import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request?.url ?? '');
    const productId = searchParams?.get('productId') ?? '';
    const type = searchParams?.get('type') ?? '';
    const startDate = searchParams?.get('startDate') ?? '';
    const endDate = searchParams?.get('endDate') ?? '';

    const where: any = {};

    if (productId) {
      where.productId = productId;
    }

    if (type && (type === 'entrada' || type === 'salida')) {
      where.type = type;
    }

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
      include: {
        product: {
          select: {
            name: true,
            sku: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json(movements ?? []);
  } catch (error) {
    console.error('Error fetching movements:', error);
    return NextResponse.json(
      { error: 'Error al obtener movimientos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, type, quantity, reason, date } = body ?? {};

    if (!productId || !type || !quantity) {
      return NextResponse.json(
        { error: 'Producto, tipo y cantidad son requeridos' },
        { status: 400 }
      );
    }

    if (type !== 'entrada' && type !== 'salida') {
      return NextResponse.json(
        { error: 'El tipo debe ser "entrada" o "salida"' },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    const quantityInt = parseInt(quantity ?? 0);

    if (type === 'salida' && (product?.stock ?? 0) < quantityInt) {
      return NextResponse.json(
        { error: 'Stock insuficiente' },
        { status: 400 }
      );
    }

    const newStock = type === 'entrada'
      ? (product?.stock ?? 0) + quantityInt
      : (product?.stock ?? 0) - quantityInt;

    const [movement] = await prisma.$transaction([
      prisma.stockMovement.create({
        data: {
          productId: productId ?? '',
          type: type ?? '',
          quantity: quantityInt,
          reason: reason ?? '',
          date: date ? new Date(date) : new Date(),
        },
        include: {
          product: {
            select: {
              name: true,
              sku: true,
            },
          },
        },
      }),
      prisma.product.update({
        where: { id: productId },
        data: { stock: newStock },
      }),
    ]);

    return NextResponse.json(movement);
  } catch (error) {
    console.error('Error creating movement:', error);
    return NextResponse.json(
      { error: 'Error al crear movimiento' },
      { status: 500 }
    );
  }
}
