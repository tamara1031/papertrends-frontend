import { notFound } from 'next/navigation'
import SubcategoryPage from 'src/components/dashboard/SubcategoryPage'
import { arxivCategories } from 'src/lib'

interface SubcategoryPageProps {
  params: Promise<{
    categoryId: string
    subcategoryId: string
  }>
}

// Generate static params for all subcategories
export async function generateStaticParams() {
  const params: { categoryId: string; subcategoryId: string }[] = []
  
  arxivCategories.forEach(category => {
    category.subcategoryGroups?.forEach(group => {
      group.subcategories.forEach(subcategory => {
        params.push({
          categoryId: category.id,
          subcategoryId: subcategory.id
        })
      })
    })
  })
  
  return params
}

export default async function Page({ params }: SubcategoryPageProps) {
  const { categoryId, subcategoryId } = await params

  if (!categoryId || !subcategoryId) {
    notFound()
  }

  return <SubcategoryPage categoryId={categoryId} subcategoryId={subcategoryId} />
}
