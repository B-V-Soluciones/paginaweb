'use client';

import { useEffect, useState } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  color: string;
}

interface Product {
  id: string;
  name: string;
  sku: string;
  categoryId?: string;
  price: number;
  stock: number;
  minStock: number;
  imageUrl?: string;
  cloudStoragePath?: string;
  isPublic?: boolean;
}

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product: Product | null;
  categories: Category[];
}

export default function ProductModal({ open, onClose, onSuccess, product, categories }: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    categoryId: '',
    price: '',
    stock: '',
    minStock: '10',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (product) {
      setFormData({
        name: product?.name ?? '',
        sku: product?.sku ?? '',
        categoryId: product?.categoryId ?? '',
        price: product?.price?.toString() ?? '',
        stock: product?.stock?.toString() ?? '',
        minStock: product?.minStock?.toString() ?? '10',
      });
      setImagePreview(product?.imageUrl ?? '');
    } else {
      setFormData({
        name: '',
        sku: '',
        categoryId: '',
        price: '',
        stock: '',
        minStock: '10',
      });
      setImagePreview('');
      setImageFile(null);
    }
  }, [product, open]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    setUploading(true);
    try {
      const presignedRes = await fetch('/api/upload/presigned', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: imageFile?.name,
          contentType: imageFile?.type,
          isPublic: true,
        }),
      });

      if (!presignedRes?.ok) throw new Error('Error al obtener URL de carga');

      const { uploadUrl, cloudStoragePath } = await presignedRes.json();

      // Check if Content-Disposition is required
      const url = new URL(uploadUrl);
      const signedHeaders = url?.searchParams?.get('X-Amz-SignedHeaders') ?? '';
      const needsContentDisposition = signedHeaders?.includes('content-disposition');

      const uploadHeaders: HeadersInit = {
        'Content-Type': imageFile?.type ?? 'application/octet-stream',
      };

      if (needsContentDisposition) {
        uploadHeaders['Content-Disposition'] = 'attachment';
      }

      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: uploadHeaders,
        body: imageFile,
      });

      if (!uploadRes?.ok) throw new Error('Error al cargar imagen');

      const completeRes = await fetch('/api/upload/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cloudStoragePath, isPublic: true }),
      });

      if (!completeRes?.ok) throw new Error('Error al completar carga');

      const { imageUrl } = await completeRes.json();
      return { imageUrl, cloudStoragePath, isPublic: true };
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Error',
        description: 'No se pudo cargar la imagen',
        variant: 'destructive',
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageData = {
        imageUrl: product?.imageUrl ?? null,
        cloudStoragePath: product?.cloudStoragePath ?? null,
        isPublic: product?.isPublic ?? true,
      };

      if (imageFile) {
        const uploadResult = await uploadImage();
        if (uploadResult) {
          imageData = uploadResult;
        }
      }

      const url = product ? `/api/products/${product?.id}` : '/api/products';
      const method = product ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          ...imageData,
        }),
      });

      if (!response?.ok) {
        const error = await response.json();
        throw new Error(error?.error ?? 'Error al guardar producto');
      }

      toast({
        title: 'Éxito',
        description: product ? 'Producto actualizado correctamente' : 'Producto creado correctamente',
      });

      onSuccess();
    } catch (error: any) {
      console.error('Error saving product:', error);
      toast({
        title: 'Error',
        description: error?.message ?? 'No se pudo guardar el producto',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {product ? 'Editar Producto' : 'Nuevo Producto'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                value={formData?.name}
                onChange={(e) => setFormData({ ...formData, name: e?.target?.value ?? '' })}
                required
                placeholder="Nombre del producto"
              />
            </div>
            <div>
              <Label htmlFor="sku">SKU *</Label>
              <Input
                id="sku"
                value={formData?.sku}
                onChange={(e) => setFormData({ ...formData, sku: e?.target?.value ?? '' })}
                required
                placeholder="Código único"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="category">Categoría</Label>
            <select
              id="category"
              value={formData?.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e?.target?.value ?? '' })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <option value="">Sin categoría</option>
              {categories?.map((cat) => (
                <option key={cat?.id} value={cat?.id}>
                  {cat?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="price">Precio *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData?.price}
                onChange={(e) => setFormData({ ...formData, price: e?.target?.value ?? '' })}
                required
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="stock">Stock *</Label>
              <Input
                id="stock"
                type="number"
                value={formData?.stock}
                onChange={(e) => setFormData({ ...formData, stock: e?.target?.value ?? '' })}
                required
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="minStock">Stock Mínimo</Label>
              <Input
                id="minStock"
                type="number"
                value={formData?.minStock}
                onChange={(e) => setFormData({ ...formData, minStock: e?.target?.value ?? '' })}
                placeholder="10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="image">Imagen del Producto</Label>
            <div className="mt-2">
              {imagePreview && (
                <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg mb-3 overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading || uploading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading || uploading} className="bg-blue-600 hover:bg-blue-700">
              {(loading || uploading) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {uploading ? 'Subiendo imagen...' : loading ? 'Guardando...' : product ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
