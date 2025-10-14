import { KankotriTemplate } from '@/components/templates-v2/themes/KankotriTemplate/KankotriTemplate';
import { exampleKankotri } from '@/lib/data/example-kankotri';

export default function KankotriDemoPage() {
  return <KankotriTemplate data={exampleKankotri} />;
}
