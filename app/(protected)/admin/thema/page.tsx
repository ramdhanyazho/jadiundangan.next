export const dynamic = 'force-dynamic';

import ThemeTable from './table';
import ThemeUpload from './upload';

export default function ThemesPage() {
  return (
    <div className="bg-white rounded-xl border p-6 space-y-6">
      <h1 className="text-xl font-semibold">Tema</h1>
      <ThemeUpload />
      <ThemeTable />
    </div>
  );
}
