// Sample Template Data for Demo/Preview

import type { GarbaNightData } from '@/types/template'

export const SAMPLE_GARBA_NIGHT_DATA: GarbaNightData = {
  groomName: 'Raj',
  brideName: 'Priya',
  weddingDate: '2025-02-14T10:00:00',
  venue: 'Swaminarayan Temple, Ahmedabad',
  primaryColor: '#F97316',
  groomParents: 'Mr. & Mrs. Patel',
  brideParents: 'Mr. & Mrs. Shah',
  customMessage: 'We joyfully invite you to celebrate our wedding ceremony. Your presence will make our day more special.',
}

export const SMART_DEFAULTS: Partial<GarbaNightData> = {
  primaryColor: '#F97316',
  venue: 'Wedding Venue',
  customMessage: '',
}
