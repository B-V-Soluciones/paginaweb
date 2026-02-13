import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { deleteFile } from '@/lib/s3';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params?.id;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Error al obtener producto' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params?.id;
    const body = await request.json();
    const { name, sku, categoryId, price, stock, minStock, imageUrl, cloudStoragePath, isPublic } = body ?? {};

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    if (sku && sku !== existingProduct?.sku) {
      const existingSku = await prisma.product.findUnique({
        where: { sku },
      });

      if (existingSku) {
        return NextResponse.json(
          { error: 'El SKU ya existe' },
          { status: 400 }
        );
      }
    }

    // Delete old image if new one is provided
    if (cloudStoragePath && existingProduct?.cloudStoragePath && cloudStoragePath !== existingProduct?.cloudStoragePath) {
      try {
        await deleteFile(existingProduct?.cloudStoragePath);
      } catch (error) {
        console.error('Error deleting old image:', error);
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: name ?? existingProduct?.name,
        sku: sku ?? existingProduct?.sku,
        categoryId: categoryId !== undefined ? categoryId || null : existingProduct?.categoryId,
        price: price !== undefined ? parseFloat(price) : existingProduct?.price,
        stock: stock !== undefined ? parseInt(stock) : existingProduct?.stock,
        minStock: minStock !== undefined ? parseInt(minStock) : existingProduct?.minStock,
        imageUrl: imageUrl !== undefined ? imageUrl : existingProduct?.imageUrl,
        cloudStoragePath: cloudStoragePath !== undefined ? cloudStoragePath : existingProduct?.cloudStoragePath,
        isPublic: isPublic !== undefined ? isPublic : existingProduct?.isPublic,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Error al actualizar producto' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params?.id;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    // Delete image if exists
    if (product?.cloudStoragePath) {
      try {
        await deleteFile(product?.cloudStoragePath);
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Error al eliminar producto' },
      { status: 500 }
    );
  }
}
