import { NextRequest, NextResponse } from 'next/server';
import { getFileUrl } from '@/lib/s3';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cloudStoragePath, isPublic } = body ?? {};

    if (!cloudStoragePath) {
      return NextResponse.json(
        { error: 'cloudStoragePath es requerido' },
        { status: 400 }
      );
    }

    const imageUrl = await getFileUrl(cloudStoragePath, isPublic ?? true);

    return NextResponse.json({ imageUrl, cloudStoragePath, isPublic });
  } catch (error) {
    console.error('Error completing upload:', error);
    return NextResponse.json(
      { error: 'Error al completar carga' },
      { status: 500 }
    );
  }
}
