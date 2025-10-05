export const dynamic = 'force-dynamic';

import SettingsForm from './settings-form';

export default function SettingPage() {
  return (
    <div className="bg-white rounded-xl border p-6">
      <h1 className="text-xl font-semibold mb-4">Setting</h1>
      <SettingsForm />
    </div>
  );
}
