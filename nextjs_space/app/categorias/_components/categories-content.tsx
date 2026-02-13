'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import CategoryModal from './category-modal';
import { useToast } from '@/hooks/use-toast';

interface Category {
  id: string;
  name: string;
  color: string;
  _count?: {
    products: number;
  };
}

export default function CategoriesContent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response?.ok) {
        const data = await response.json();
        setCategories(data ?? []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las categorías',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, hasProducts: boolean) => {
    if (hasProducts) {
      toast({
        title: 'Error',
        description: 'No se puede eliminar una categoría con productos asociados',
        variant: 'destructive',
      });
      return;
    }

    if (!confirm('¿Estás seguro de eliminar esta categoría?')) return;

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });

      if (response?.ok) {
        toast({
          title: 'Éxito',
          description: 'Categoría eliminada correctamente',
        });
        fetchCategories();
      } else {
        const error = await response.json();
        throw new Error(error?.error ?? 'Error al eliminar');
      }
    } catch (error: any) {
      console.error('Error deleting category:', error);
      toast({
        title: 'Error',
        description: error?.message ?? 'No se pudo eliminar la categoría',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Categorías
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Organiza tus productos por categorías
          </p>
        </div>
        <Button
          onClick={() => {
            setSelectedCategory(null);
            setModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nueva Categoría
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Cargando categorías...</p>
        </div>
      ) : categories?.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No hay categorías creadas</p>
          <Button onClick={() => setModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            Crear primera categoría
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.map((category, index) => (
            <motion.div
              key={category?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center shadow-md"
                    style={{ backgroundColor: category?.color }}
                  >
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      {category?.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {category?._count?.products ?? 0} productos
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={() => {
                    setSelectedCategory(category);
                    setModalOpen(true);
                  }}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button
                  onClick={() => handleDelete(category?.id ?? '', (category?._count?.products ?? 0) > 0)}
                  variant="outline"
                  size="sm"
                  className="flex-1 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <CategoryModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedCategory(null);
        }}
        onSuccess={() => {
          fetchCategories();
          setModalOpen(false);
          setSelectedCategory(null);
        }}
        category={selectedCategory}
      />
    </div>
  );
}
