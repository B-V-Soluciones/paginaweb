import { NextRequest, NextResponse } from 'next/server';
import { generatePresignedUploadUrl } from '@/lib/s3';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fileName, contentType, isPublic } = body ?? {};

    if (!fileName || !contentType) {
      return NextResponse.json(
        { error: 'fileName y contentType son requeridos' },
        { status: 400 }
      );
    }

    const { uploadUrl, cloudStoragePath } = await generatePresignedUploadUrl(
      fileName,
      contentType,
      isPublic ?? true
    );

    return NextResponse.json({ uploadUrl, cloudStoragePath });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json(
      { error: 'Error al generar URL de carga' },
      { status: 500 }
    );
  }
}
