import type { Metadata } from 'next';
import HomePage from '@/components/emma/HomePage';

export const metadata: Metadata = {
  title: 'Emma · Jij doet je werk. Emma de rest.',
  description: 'Emma is het platform dat de dagelijkse taken van ondernemers makkelijker maakt: boekhouding, personeel, marketing en inzicht. We beginnen bij je boekhouding, bovenop e-Boekhouden.nl. Vanaf €9 per maand.',
  alternates: { canonical: 'https://www.emmastudio.nl' },
};

export default function Page() {
  return <HomePage />;
}
