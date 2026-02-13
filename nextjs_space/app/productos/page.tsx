import Sidebar from '@/components/sidebar';
import ProductsContent from './_components/products-content';

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 ml-64">
        <ProductsContent />
      </main>
    </div>
  );
}
