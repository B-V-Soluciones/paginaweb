import Sidebar from '@/components/sidebar';
import MovementsContent from './_components/movements-content';

export default function MovementsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 ml-64">
        <MovementsContent />
      </main>
    </div>
  );
}
