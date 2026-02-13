'use client';

import { useEffect, useState } from 'react';
import { Plus, TrendingUp, TrendingDown, Filter, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MovementModal from './movement-modal';
import { useToast } from '@/hooks/use-toast';

interface ProductItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
}

interface Movement {
  id: string;
  type: string;
  quantity: number;
  reason: string;
  date: string;
  product: {
    name: string;
    sku: string;
  };
}

export default function MovementsContent() {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [filteredMovements, setFilteredMovements] = useState<Movement[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchMovements();
    fetchProducts();
  }, []);

  useEffect(() => {
    filterMovements();
  }, [movements, typeFilter, startDate, endDate]);

  const fetchMovements = async () => {
    try {
      const response = await fetch('/api/movements');
      if (response?.ok) {
        const data = await response.json();
        setMovements(data ?? []);
      }
    } catch (error) {
      console.error('Error fetching movements:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los movimientos',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response?.ok) {
        const data = await response.json();
        setProducts(data ?? []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const filterMovements = () => {
    let filtered = [...(movements ?? [])];

    if (typeFilter && typeFilter !== 'all') {
      filtered = filtered?.filter((m) => m?.type === typeFilter);
    }

    if (startDate) {
      filtered = filtered?.filter((m) => new Date(m?.date ?? '') >= new Date(startDate));
    }

    if (endDate) {
      filtered = filtered?.filter((m) => new Date(m?.date ?? '') <= new Date(endDate));
    }

    setFilteredMovements(filtered);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Movimientos de Stock
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Registra y consulta entradas y salidas de inventario
          </p>
        </div>
        <Button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nuevo Movimiento
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e?.target?.value ?? 'all')}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all">Todos los tipos</option>
            <option value="entrada">Entradas</option>
            <option value="salida">Salidas</option>
          </select>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e?.target?.value ?? '')}
              className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              placeholder="Fecha inicio"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e?.target?.value ?? '')}
              className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              placeholder="Fecha fin"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Cargando movimientos...</p>
        </div>
      ) : filteredMovements?.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
          <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No hay movimientos registrados</p>
          <Button onClick={() => setModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            Registrar primer movimiento
          </Button>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cantidad
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Motivo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredMovements?.map((movement, index) => (
                  <motion.tr
                    key={movement?.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.02 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {movement?.type === 'entrada' ? (
                          <>
                            <div className="p-2 bg-green-100 rounded-lg">
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            </div>
                            <span className="text-sm font-medium text-green-600">Entrada</span>
                          </>
                        ) : (
                          <>
                            <div className="p-2 bg-red-100 rounded-lg">
                              <TrendingDown className="h-4 w-4 text-red-600" />
                            </div>
                            <span className="text-sm font-medium text-red-600">Salida</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {movement?.product?.name}
                        </p>
                        <p className="text-xs text-gray-500">SKU: {movement?.product?.sku}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {movement?.quantity} unidades
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {movement?.reason}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(movement?.date ?? '')?.toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <MovementModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          fetchMovements();
          setModalOpen(false);
        }}
        products={products}
      />
    </div>
  );
}
