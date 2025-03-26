import React from 'react'
import Link from 'next/link'
import { User, GraduationCap, LinkedinLogo, InstagramLogo } from 'phosphor-react'

interface Author {
  id: string
  name: string
  role: string
  bio: string
  avatar?: string
  postCount: number
  socialLinks?: {
    linkedin?: string
    instagram?: string
  }
}

// Mock de autores para demonstração
const mockAuthors: Author[] = [
  {
    id: '1',
    name: 'Dr. João Silva',
    role: 'Médico Veterinário',
    bio: 'Especialista em clínica de pequenos animais com mais de 10 anos de experiência. Pós-graduado em dermatologia veterinária.',
    avatar: '/images/authors/joao-silva.jpg',
    postCount: 15,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/joao-silva',
      instagram: 'https://instagram.com/dr.joaosilva'
    }
  },
  {
    id: '2',
    name: 'Dra. Maria Santos',
    role: 'Médica Veterinária',
    bio: 'Especialista em nutrição animal e comportamento. Atua há 8 anos com foco em bem-estar animal e medicina preventiva.',
    avatar: '/images/authors/maria-santos.jpg',
    postCount: 12,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/maria-santos',
      instagram: 'https://instagram.com/dra.mariasantos'
    }
  },
  {
    id: '3',
    name: 'Dr. Pedro Lima',
    role: 'Médico Veterinário',
    bio: 'Especializado em cirurgia veterinária e ortopedia. Possui vasta experiência no tratamento de animais de grande porte.',
    avatar: '/images/authors/pedro-lima.jpg',
    postCount: 8,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/pedro-lima',
      instagram: 'https://instagram.com/dr.pedrolima'
    }
  }
]

export default function Authors() {
  return (
    <div className="bg-background rounded-xl border p-6">
      <h2 className="text-xl font-bold mb-6">Nossos Especialistas</h2>
      <div className="space-y-6">
        {mockAuthors.map(author => (
          <div key={author.id} className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {author.avatar ? (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="text-primary" size={24} />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <Link
                    href={`/blog?autor=${author.id}`}
                    className="font-medium hover:text-primary transition-colors"
                  >
                    {author.name}
                  </Link>
                  <div className="flex items-center gap-1 text-sm text-text/60">
                    <GraduationCap size={14} />
                    <span className="truncate">{author.role}</span>
                  </div>
                </div>
                
                {author.socialLinks && (
                  <div className="flex items-center gap-1">
                    {author.socialLinks.linkedin && (
                      <a
                        href={author.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:bg-blue-50 rounded transition-colors"
                        title="LinkedIn"
                      >
                        <LinkedinLogo className="text-blue-700" size={16} weight="fill" />
                      </a>
                    )}
                    {author.socialLinks.instagram && (
                      <a
                        href={author.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:bg-pink-50 rounded transition-colors"
                        title="Instagram"
                      >
                        <InstagramLogo className="text-pink-600" size={16} weight="fill" />
                      </a>
                    )}
                  </div>
                )}
              </div>
              
              <p className="text-sm text-text/60 line-clamp-2 mt-1">
                {author.bio}
              </p>
              
              <div className="text-xs text-text/40 mt-2">
                {author.postCount} {author.postCount === 1 ? 'artigo' : 'artigos'} publicados
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 