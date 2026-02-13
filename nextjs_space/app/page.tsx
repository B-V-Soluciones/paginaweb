import Sidebar from '@/components/sidebar';
import DashboardContent from './_components/dashboard-content';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 ml-64">
        <DashboardContent />
      </main>
    </div>
  );
}
