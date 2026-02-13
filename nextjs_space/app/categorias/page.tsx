import Sidebar from '@/components/sidebar';
import CategoriesContent from './_components/categories-content';

export default function CategoriesPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 ml-64">
        <CategoriesContent />
      </main>
    </div>
  );
}
