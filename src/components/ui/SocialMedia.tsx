'use client'

import { socialMedia } from '@/lib/integrations'
import Link from 'next/link'

export default function SocialMedia() {
  return (
    <div className="flex items-center gap-4">
      {Object.entries(socialMedia).map(([key, { url, icon: Icon, name }]) => (
        <Link
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-primary transition-colors"
          aria-label={name}
        >
          <Icon size={24} />
        </Link>
      ))}
    </div>
  )
} 