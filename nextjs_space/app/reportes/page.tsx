import Sidebar from '@/components/sidebar';
import ReportsContent from './_components/reports-content';

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 ml-64">
        <ReportsContent />
      </main>
    </div>
  );
}
