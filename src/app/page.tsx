import type { Metadata } from 'next';
import HomePage from '@/components/emma/HomePage';

export const metadata: Metadata = {
  title: 'Emma · Software voor ondernemers, van boekhouden tot marketing',
  description: 'Emma neemt het saaie werk van ondernemen over: boekhouden, cijfers, personeel en marketing in één platform. Vanaf €9 per maand. Bekijk de modules.',
  alternates: { canonical: 'https://www.emmastudio.nl' },
};

export default function Page() {
  return <HomePage />;
}
