import { exampleKankotri } from '@/lib/data/example-kankotri';
import { KankotriEnhanced } from '@/components/templates-v2/themes/KankotriTemplate/KankotriEnhanced';

export default function KankotriDemoPage() {
  return <KankotriEnhanced data={exampleKankotri} />;
}
