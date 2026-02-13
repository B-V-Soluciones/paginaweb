'use client';

import { useEffect, useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  sku: string;
}

interface QRModalProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function QRModal({ open, onClose, product }: QRModalProps) {
  const [qrCode, setQrCode] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open && product) {
      fetchQRCode();
    }
  }, [open, product]);

  const fetchQRCode = async () => {
    if (!product) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/products/${product?.id}/qr`);
      if (response?.ok) {
        const data = await response.json();
        setQrCode(data?.qrCode ?? '');
      } else {
        throw new Error('Error al generar QR');
      }
    } catch (error) {
      console.error('Error fetching QR code:', error);
      toast({
        title: 'Error',
        description: 'No se pudo generar el código QR',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!qrCode) return;

    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `qr-${product?.sku ?? 'producto'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: 'Éxito',
      description: 'Código QR descargado correctamente',
    });
  };

  const handlePrint = () => {
    if (!qrCode) return;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Imprimir QR - ${product?.name ?? ''}</title>
            <style>
              body { 
                display: flex; 
                flex-direction: column;
                align-items: center; 
                justify-content: center; 
                min-height: 100vh;
                margin: 0;
                font-family: Arial, sans-serif;
              }
              .container {
                text-align: center;
                padding: 20px;
              }
              h1 { 
                font-size: 24px; 
                margin-bottom: 10px;
                color: #333;
              }
              p { 
                font-size: 14px; 
                color: #666;
                margin-bottom: 20px;
              }
              img { 
                max-width: 300px; 
                height: auto;
                border: 1px solid #ddd;
                padding: 10px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>${product?.name ?? ''}</h1>
              <p>SKU: ${product?.sku ?? ''}</p>
              <img src="${qrCode}" alt="Código QR" />
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Código QR</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-1">{product?.name}</h3>
            <p className="text-sm text-gray-500">SKU: {product?.sku}</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            </div>
          ) : qrCode ? (
            <div className="flex justify-center bg-white p-6 rounded-lg">
              <div className="relative w-64 h-64">
                <Image
                  src={qrCode}
                  alt="Código QR"
                  fill
                  className="object-contain"
                  sizes="256px"
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No se pudo generar el código QR</p>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              onClick={handleDownload}
              disabled={!qrCode || loading}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Descargar
            </Button>
            <Button
              onClick={handlePrint}
              disabled={!qrCode || loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Imprimir
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
