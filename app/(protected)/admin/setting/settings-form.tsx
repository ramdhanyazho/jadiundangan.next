'use client';

import { useEffect, useState } from 'react';

const DEFAULTS = {
  trial_days: 7,
  active_days: 365,
  price: 250000,
  payment_provider: { midtrans_enabled: false },
  bank: { name: '', number: '', owner: '' },
  contact: {
    host_email: '',
    smtp_email: '',
    smtp_password: '',
    wa_token: '',
    wa_number: '',
    wa_message: '',
  },
};

export default function SettingsForm() {
  const [value, setValue] = useState<any>(DEFAULTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((j) => {
        setValue({ ...DEFAULTS, ...(j?.value || {}) });
        setLoading(false);
      });
  }, []);

  const save = async () => {
    await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value }),
    });
    alert('Tersimpan');
  };

  if (loading) return <p>Memuat…</p>;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Trial (hari)">
          <input
            type="number"
            className="border rounded px-2 py-1 w-full"
            value={value.trial_days}
            onChange={(e) => setValue({ ...value, trial_days: Number(e.target.value) })}
          />
        </Field>
        <Field label="Masa Aktif (hari)">
          <input
            type="number"
            className="border rounded px-2 py-1 w-full"
            value={value.active_days}
            onChange={(e) => setValue({ ...value, active_days: Number(e.target.value) })}
          />
        </Field>
        <Field label="Harga (Rp)">
          <input
            type="number"
            className="border rounded px-2 py-1 w-full"
            value={value.price}
            onChange={(e) => setValue({ ...value, price: Number(e.target.value) })}
          />
        </Field>
      </div>

      <div className="border rounded p-3">
        <p className="font-medium mb-2">Payment</p>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={value.payment_provider.midtrans_enabled}
            onChange={(e) =>
              setValue({
                ...value,
                payment_provider: {
                  ...value.payment_provider,
                  midtrans_enabled: e.target.checked,
                },
              })
            }
          />
          Midtrans enabled
        </label>
      </div>

      <div className="border rounded p-3">
        <p className="font-medium mb-2">Bank</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            className="border rounded px-2 py-1"
            placeholder="Nama Bank"
            value={value.bank.name}
            onChange={(e) => setValue({ ...value, bank: { ...value.bank, name: e.target.value } })}
          />
          <input
            className="border rounded px-2 py-1"
            placeholder="Nomor Rekening"
            value={value.bank.number}
            onChange={(e) => setValue({ ...value, bank: { ...value.bank, number: e.target.value } })}
          />
          <input
            className="border rounded px-2 py-1"
            placeholder="Nama Pemilik"
            value={value.bank.owner}
            onChange={(e) => setValue({ ...value, bank: { ...value.bank, owner: e.target.value } })}
          />
        </div>
      </div>

      <div className="border rounded p-3">
        <p className="font-medium mb-2">Contact/Email/WA</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            className="border rounded px-2 py-1"
            placeholder="Host Email"
            value={value.contact.host_email}
            onChange={(e) => setValue({ ...value, contact: { ...value.contact, host_email: e.target.value } })}
          />
          <input
            className="border rounded px-2 py-1"
            placeholder="Email SMTP"
            value={value.contact.smtp_email}
            onChange={(e) => setValue({ ...value, contact: { ...value.contact, smtp_email: e.target.value } })}
          />
          <input
            className="border rounded px-2 py-1"
            placeholder="Password SMTP"
            value={value.contact.smtp_password}
            onChange={(e) => setValue({ ...value, contact: { ...value.contact, smtp_password: e.target.value } })}
          />
          <input
            className="border rounded px-2 py-1"
            placeholder="Token WA Gateway"
            value={value.contact.wa_token}
            onChange={(e) => setValue({ ...value, contact: { ...value.contact, wa_token: e.target.value } })}
          />
          <input
            className="border rounded px-2 py-1"
            placeholder="No Whatsapp"
            value={value.contact.wa_number}
            onChange={(e) => setValue({ ...value, contact: { ...value.contact, wa_number: e.target.value } })}
          />
          <input
            className="border rounded px-2 py-1"
            placeholder="Pesan Whatsapp"
            value={value.contact.wa_message}
            onChange={(e) => setValue({ ...value, contact: { ...value.contact, wa_message: e.target.value } })}
          />
        </div>
      </div>

      <button onClick={save} className="px-3 py-2 rounded bg-slate-900 text-white">Simpan</button>
    </div>
  );
}

function Field({ label, children }: any) {
  return <label className="text-sm grid gap-1">{label}{children}</label>;
}
