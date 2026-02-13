import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import QRCode from 'qrcode';

export const dynamic = 'force-dynamic';

export async function GET(
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

    const qrData = JSON.stringify({
      id: product?.id,
      name: product?.name,
      sku: product?.sku,
      price: product?.price,
    });

    const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });

    return NextResponse.json({ qrCode: qrCodeDataUrl });
  } catch (error) {
    console.error('Error generating QR code:', error);
    return NextResponse.json(
      { error: 'Error al generar código QR' },
      { status: 500 }
    );
  }
}
