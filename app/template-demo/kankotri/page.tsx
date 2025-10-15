import { exampleKankotri } from '@/lib/data/example-kankotri';
import { KankotriEnhanced } from '@/components/templates-v2/themes/KankotriTemplate/KankotriEnhanced';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kankotri Demo - WebKankotri',
  description: 'Beautiful Gujarati wedding invitation template demo',
};

export default function KankotriDemoPage() {
  return <KankotriEnhanced data={exampleKankotri} />;
}
