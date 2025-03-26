import React from 'react'
import { User, GraduationCap, LinkedinLogo, InstagramLogo } from 'phosphor-react'

interface Author {
  id: string
  name: string
  role: string
  bio: string
  avatar?: string
  socialLinks?: {
    linkedin?: string
    instagram?: string
  }
}

interface AuthorCardProps {
  authorId: string
}

// Mock de autores para demonstração
const mockAuthors: Author[] = [
  {
    id: '1',
    name: 'Dr. João Silva',
    role: 'Médico Veterinário',
    bio: 'Especialista em clínica de pequenos animais com mais de 10 anos de experiência. Pós-graduado em dermatologia veterinária e apaixonado por educação em saúde animal.',
    avatar: '/images/authors/joao-silva.jpg',
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
    socialLinks: {
      linkedin: 'https://linkedin.com/in/maria-santos',
      instagram: 'https://instagram.com/dra.mariasantos'
    }
  }
]

export default function AuthorCard({ authorId }: AuthorCardProps) {
  const author = mockAuthors.find(a => a.id === authorId)
  
  if (!author) return null

  return (
    <div className="flex flex-col sm:flex-row items-start gap-6 p-6 bg-background rounded-xl border">
      <div className="flex-shrink-0">
        {author.avatar ? (
          <img
            src={author.avatar}
            alt={author.name}
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="text-primary" size={32} />
          </div>
        )}
      </div>
      
      <div className="flex-1">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h3 className="text-xl font-semibold">{author.name}</h3>
            <div className="flex items-center gap-1 text-sm text-text/60">
              <GraduationCap size={16} />
              <span>{author.role}</span>
            </div>
          </div>
          
          {author.socialLinks && (
            <div className="flex items-center gap-2">
              {author.socialLinks.linkedin && (
                <a
                  href={author.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                  title="LinkedIn"
                >
                  <LinkedinLogo className="text-blue-700" size={20} weight="fill" />
                </a>
              )}
              {author.socialLinks.instagram && (
                <a
                  href={author.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-pink-50 rounded-lg transition-colors"
                  title="Instagram"
                >
                  <InstagramLogo className="text-pink-600" size={20} weight="fill" />
                </a>
              )}
            </div>
          )}
        </div>
        
        <p className="text-sm text-text/80">
          {author.bio}
        </p>
      </div>
    </div>
  )
} 