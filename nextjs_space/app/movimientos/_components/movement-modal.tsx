'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface ProductItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
}

interface MovementModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  products: ProductItem[];
}

export default function MovementModal({ open, onClose, onSuccess, products }: MovementModalProps) {
  const [formData, setFormData] = useState({
    productId: '',
    type: 'entrada',
    quantity: '',
    reason: '',
    date: new Date().toISOString().slice(0, 16),
  });
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!open) {
      setFormData({
        productId: '',
        type: 'entrada',
        quantity: '',
        reason: '',
        date: new Date().toISOString().slice(0, 16),
      });
      setSelectedProduct(null);
    }
  }, [open]);

  useEffect(() => {
    if (formData?.productId) {
      const product = products?.find((p) => p?.id === formData?.productId);
      setSelectedProduct(product ?? null);
    } else {
      setSelectedProduct(null);
    }
  }, [formData?.productId, products]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData?.type === 'salida' && selectedProduct) {
      const quantity = parseInt(formData?.quantity ?? '0');
      if (quantity > (selectedProduct?.stock ?? 0)) {
        toast({
          title: 'Error',
          description: `Stock insuficiente. Stock actual: ${selectedProduct?.stock}`,
          variant: 'destructive',
        });
        return;
      }
    }

    setLoading(true);

    try {
      const response = await fetch('/api/movements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response?.ok) {
        const error = await response.json();
        throw new Error(error?.error ?? 'Error al guardar movimiento');
      }

      toast({
        title: 'Éxito',
        description: 'Movimiento registrado correctamente',
      });

      onSuccess();
    } catch (error: any) {
      console.error('Error saving movement:', error);
      toast({
        title: 'Error',
        description: error?.message ?? 'No se pudo registrar el movimiento',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Nuevo Movimiento</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="product">Producto *</Label>
            <select
              id="product"
              value={formData?.productId}
              onChange={(e) => setFormData({ ...formData, productId: e?.target?.value ?? '' })}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <option value="">Seleccionar producto</option>
              {products?.map((product) => (
                <option key={product?.id} value={product?.id}>
                  {product?.name} (SKU: {product?.sku}) - Stock: {product?.stock}
                </option>
              ))}
            </select>
            {selectedProduct && (
              <p className="text-sm text-gray-500 mt-1">
                Stock actual: {selectedProduct?.stock} unidades
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="type">Tipo de Movimiento *</Label>
            <select
              id="type"
              value={formData?.type}
              onChange={(e) => setFormData({ ...formData, type: e?.target?.value ?? '' })}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <option value="entrada">Entrada (Agregar stock)</option>
              <option value="salida">Salida (Reducir stock)</option>
            </select>
          </div>

          <div>
            <Label htmlFor="quantity">Cantidad *</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={formData?.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e?.target?.value ?? '' })}
              required
              placeholder="Cantidad de unidades"
            />
          </div>

          <div>
            <Label htmlFor="reason">Motivo *</Label>
            <Input
              id="reason"
              value={formData?.reason}
              onChange={(e) => setFormData({ ...formData, reason: e?.target?.value ?? '' })}
              required
              placeholder="Ej: Venta, Compra, Devolución, etc."
            />
          </div>

          <div>
            <Label htmlFor="date">Fecha y Hora</Label>
            <Input
              id="date"
              type="datetime-local"
              value={formData?.date}
              onChange={(e) => setFormData({ ...formData, date: e?.target?.value ?? '' })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Registrar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
