type ImageCategory =
  | 'hero'
  | 'classes'
  | 'eleves'
  | 'enseignants'
  | 'innovation'
  | 'campus'

export type ImageItem = {
  src: string
  title: string
  category: ImageCategory
}

const toTitle = (raw: string) => {
  const normalized = raw
    .replace(/\.[^/.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return normalized.charAt(0).toUpperCase() + normalized.slice(1)
}

const categorize = (name: string): ImageCategory => {
  const lower = name.toLowerCase()
  if (lower.includes('book') || lower.includes('board') || lower.includes('classroom')) {
    return 'hero'
  }
  if (lower.includes('class')) {
    return 'classes'
  }
  if (lower.includes('student') || lower.includes('boy') || lower.includes('young')) {
    return 'eleves'
  }
  if (lower.includes('businessman') || lower.includes('whiteboard') || lower.includes('teacher')) {
    return 'enseignants'
  }
  if (lower.includes('ampoule') || lower.includes('idea') || lower.includes('laptop') || lower.includes('technology')) {
    return 'innovation'
  }
  return 'campus'
}

const imageModules = import.meta.glob('../assets/images/*', {
  eager: true,
  query: '?url',
  import: 'default'
}) as Record<string, string>

export const images: ImageItem[] = Object.entries(imageModules).map(([path, src]) => {
  const filename = decodeURIComponent(path.split('/').pop() ?? '')
  const title = toTitle(filename)
  return {
    src,
    title,
    category: categorize(filename)
  }
})

export const getImageByCategory = (category: ImageCategory): ImageItem => {
  return (
    images.find((image) => image.category === category) ??
    images[0] ?? {
      src: '',
      title: 'Bueri Angeli',
      category: 'hero'
    }
  )
}
