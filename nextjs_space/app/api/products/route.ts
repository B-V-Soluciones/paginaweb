import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request?.url ?? '');
    const search = searchParams?.get('search') ?? '';
    const category = searchParams?.get('category') ?? '';
    const status = searchParams?.get('status') ?? '';

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category && category !== 'all') {
      where.categoryId = category;
    }

    if (status === 'low') {
      where.stock = { lte: prisma.product.fields.minStock };
    } else if (status === 'out') {
      where.stock = 0;
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(products ?? []);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, sku, categoryId, price, stock, minStock, imageUrl, cloudStoragePath, isPublic } = body ?? {};

    if (!name || !sku) {
      return NextResponse.json(
        { error: 'Nombre y SKU son requeridos' },
        { status: 400 }
      );
    }

    const existingSku = await prisma.product.findUnique({
      where: { sku },
    });

    if (existingSku) {
      return NextResponse.json(
        { error: 'El SKU ya existe' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name: name ?? '',
        sku: sku ?? '',
        categoryId: categoryId || null,
        price: parseFloat(price ?? 0),
        stock: parseInt(stock ?? 0),
        minStock: parseInt(minStock ?? 10),
        imageUrl: imageUrl ?? null,
        cloudStoragePath: cloudStoragePath ?? null,
        isPublic: isPublic ?? true,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Error al crear producto' },
      { status: 500 }
    );
  }
}
