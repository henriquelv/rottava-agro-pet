export const imageConfig = {
  baseUrl: process.env.NEXT_PUBLIC_IMAGES_URL || 'http://localhost:3000',
  productPlaceholder: '/placeholder.jpg',
  sizes: {
    thumbnail: '100x100',
    small: '300x300',
    medium: '600x600',
    large: '1200x1200'
  },
  quality: 80,
  format: 'webp'
}

export function getProductImageUrl(imagePath: string, size: keyof typeof imageConfig.sizes = 'medium') {
  if (!imagePath) return imageConfig.productPlaceholder
  if (imagePath.startsWith('http')) return imagePath
  return `${imageConfig.baseUrl}/images/products/${size}/${imagePath}`
} 