import './globals.css';
import { Poppins, Dancing_Script } from 'next/font/google';
const poppins = Poppins({ subsets: ['latin'], weight: ['400','600','700'], variable: '--font-poppins' });
const dancing = Dancing_Script({ subsets: ['latin'], weight: ['700'], variable: '--font-dancing' });
export const metadata = { title: 'JadiUndangan — Undangan Digital Modern', description: 'Undangan pernikahan digital dengan tema stylish, cepat, dan mudah dikustom.' };
export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} ${dancing.variable} font-sans antialiased bg-gray-50 text-gray-800`} style={{fontFamily: 'var(--font-poppins)'}}>
        <style jsx global>{`.font-display { font-family: var(--font-dancing), cursive; }`}</style>
        {children}
      </body>
    </html>
  );
}
