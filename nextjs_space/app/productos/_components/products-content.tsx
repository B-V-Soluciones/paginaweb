'use client';

import { useEffect, useState } from 'react';
import { Plus, Search, Filter, QrCode, Pencil, Trash2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductModal from './product-modal';
import QRModal from './qr-modal';
import { useToast } from '@/hooks/use-toast';

interface Category {
  id: string;
  name: string;
  color: string;
}

interface Product {
  id: string;
  name: string;
  sku: string;
  category?: Category;
  price: number;
  stock: number;
  minStock: number;
  imageUrl?: string;
  cloudStoragePath?: string;
  isPublic?: boolean;
}

export default function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, search, categoryFilter, statusFilter]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response?.ok) {
        const data = await response.json();
        setProducts(data ?? []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los productos',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response?.ok) {
        const data = await response.json();
        setCategories(data ?? []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filterProducts = () => {
    let filtered = [...(products ?? [])];

    if (search) {
      filtered = filtered?.filter(
        (p) =>
          p?.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
          p?.sku?.toLowerCase()?.includes(search?.toLowerCase())
      );
    }

    if (categoryFilter && categoryFilter !== 'all') {
      filtered = filtered?.filter((p) => p?.category?.id === categoryFilter);
    }

    if (statusFilter === 'low') {
      filtered = filtered?.filter((p) => (p?.stock ?? 0) <= (p?.minStock ?? 0) && (p?.stock ?? 0) > 0);
    } else if (statusFilter === 'out') {
      filtered = filtered?.filter((p) => (p?.stock ?? 0) === 0);
    }

    setFilteredProducts(filtered);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response?.ok) {
        toast({
          title: 'Éxito',
          description: 'Producto eliminado correctamente',
        });
        fetchProducts();
      } else {
        throw new Error('Error al eliminar');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el producto',
        variant: 'destructive',
      });
    }
  };

  const getStockStatus = (product: Product) => {
    if ((product?.stock ?? 0) === 0) return { color: 'bg-red-100 text-red-800', label: 'Agotado' };
    if ((product?.stock ?? 0) <= (product?.minStock ?? 0)) return { color: 'bg-amber-100 text-amber-800', label: 'Stock Bajo' };
    return { color: 'bg-green-100 text-green-800', label: 'Disponible' };
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Productos
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gestiona tu catálogo completo de productos
          </p>
        </div>
        <Button
          onClick={() => {
            setSelectedProduct(null);
            setModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nuevo Producto
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Buscar por nombre o SKU..."
              value={search}
              onChange={(e) => setSearch(e?.target?.value ?? '')}
              className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e?.target?.value ?? 'all')}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all">Todas las categorías</option>
            {categories?.map((cat) => (
              <option key={cat?.id} value={cat?.id}>
                {cat?.name}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e?.target?.value ?? 'all')}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all">Todos los estados</option>
            <option value="low">Stock bajo</option>
            <option value="out">Agotado</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Cargando productos...</p>
        </div>
      ) : filteredProducts?.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No se encontraron productos</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts?.map((product, index) => {
            const status = getStockStatus(product);
            return (
              <motion.div
                key={product?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="relative aspect-video bg-gray-100 dark:bg-gray-800">
                  {product?.imageUrl ? (
                    <Image
                      src={product?.imageUrl}
                      alt={product?.name ?? ''}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <AlertCircle className="h-12 w-12 text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                        {product?.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        SKU: {product?.sku}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${status?.color}`}>
                      {status?.label}
                    </span>
                  </div>
                  {product?.category && (
                    <div className="mb-3">
                      <span
                        className="px-2 py-1 rounded text-xs font-medium text-white"
                        style={{ backgroundColor: product?.category?.color }}
                      >
                        {product?.category?.name}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">
                        ${product?.price?.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Stock: {product?.stock} unidades
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setSelectedProduct(product);
                        setQrModalOpen(true);
                      }}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <QrCode className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedProduct(product);
                        setModalOpen(true);
                      }}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(product?.id ?? '')}
                      variant="outline"
                      size="sm"
                      className="flex-1 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <ProductModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedProduct(null);
        }}
        onSuccess={() => {
          fetchProducts();
          setModalOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        categories={categories}
      />

      <QRModal
        open={qrModalOpen}
        onClose={() => {
          setQrModalOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
      />
    </div>
  );
}
