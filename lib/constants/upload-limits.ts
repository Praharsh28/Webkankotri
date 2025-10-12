// File Upload Limits

export const UPLOAD_LIMITS = {
  photos: {
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 10,
    acceptedFormats: ['image/jpeg', 'image/png', 'image/webp'],
  },
  fonts: {
    maxSize: 2 * 1024 * 1024, // 2MB
    maxFiles: 5,
    acceptedFormats: ['font/ttf', 'font/otf', 'font/woff', 'font/woff2'],
  },
  music: {
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 1,
    acceptedFormats: ['audio/mpeg', 'audio/mp3', 'audio/wav'],
  },
}
