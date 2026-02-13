'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface Category {
  id: string;
  name: string;
  color: string;
}

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category: Category | null;
}

const PRESET_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#14B8A6', // Teal
  '#F97316', // Orange
  '#6366F1', // Indigo
  '#06B6D4', // Cyan
];

export default function CategoryModal({ open, onClose, onSuccess, category }: CategoryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    color: '#3B82F6',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (category) {
      setFormData({
        name: category?.name ?? '',
        color: category?.color ?? '#3B82F6',
      });
    } else {
      setFormData({
        name: '',
        color: '#3B82F6',
      });
    }
  }, [category, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = category ? `/api/categories/${category?.id}` : '/api/categories';
      const method = category ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response?.ok) {
        const error = await response.json();
        throw new Error(error?.error ?? 'Error al guardar categoría');
      }

      toast({
        title: 'Éxito',
        description: category ? 'Categoría actualizada correctamente' : 'Categoría creada correctamente',
      });

      onSuccess();
    } catch (error: any) {
      console.error('Error saving category:', error);
      toast({
        title: 'Error',
        description: error?.message ?? 'No se pudo guardar la categoría',
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
          <DialogTitle className="text-2xl font-bold">
            {category ? 'Editar Categoría' : 'Nueva Categoría'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre *</Label>
            <Input
              id="name"
              value={formData?.name}
              onChange={(e) => setFormData({ ...formData, name: e?.target?.value ?? '' })}
              required
              placeholder="Nombre de la categoría"
            />
          </div>

          <div>
            <Label>Color</Label>
            <div className="grid grid-cols-5 gap-3 mt-2">
              {PRESET_COLORS?.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-12 h-12 rounded-lg transition-all ${
                    formData?.color === color
                      ? 'ring-4 ring-offset-2 ring-blue-500 scale-110'
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="mt-3">
              <Input
                type="color"
                value={formData?.color}
                onChange={(e) => setFormData({ ...formData, color: e?.target?.value ?? '' })}
                className="h-12 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {category ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
