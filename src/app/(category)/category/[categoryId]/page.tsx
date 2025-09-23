import { notFound } from 'next/navigation'
import CategoryPage from '@/components/dashboard/CategoryPage'
import { arxivCategories } from '@/lib'

interface CategoryPageProps {
  params: Promise<{
    categoryId: string
  }>
}

// Generate static params for all categories
export async function generateStaticParams() {
  return arxivCategories.map(category => ({
    categoryId: category.id
  }))
}

export default async function CategoryPageRoute({ params }: CategoryPageProps) {
  const { categoryId } = await params

  // Check if category exists
  const category = arxivCategories.find(cat => cat.id === categoryId)
  if (!category) {
    notFound()
  }

  return <CategoryPage categoryId={categoryId} />
}
