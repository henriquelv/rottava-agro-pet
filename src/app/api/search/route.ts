import { NextResponse } from 'next/server'
import { products } from '@/data/products'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase()

  if (!query) {
    return NextResponse.json({ products: [] })
  }

  const filteredProducts = products.filter((product) => {
    const searchableText = `
      ${product.name.toLowerCase()}
      ${product.description.toLowerCase()}
      ${product.category.toLowerCase()}
      ${product.brand.toLowerCase()}
      ${product.tags.join(' ').toLowerCase()}
    `
    return searchableText.includes(query)
  })

  return NextResponse.json({ products: filteredProducts })
} 