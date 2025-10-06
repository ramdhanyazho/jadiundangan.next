import Image from 'next/image';

export default function Ornament({ position = 'top' }: { position?: 'top' | 'bottom' }) {
  const src =
    position === 'top'
      ? '/themes/ulems/assets/ornaments/batik-top.svg'
      : '/themes/ulems/assets/ornaments/batik-bottom.svg';
  const alt = position === 'top' ? 'Batik ornament top' : 'Batik ornament bottom';
  return (
    <div className="relative w-full overflow-hidden">
      <Image src={src} alt={alt} width={1600} height={200} className="w-full h-auto object-cover" priority={position === 'top'} />
    </div>
  );
}
