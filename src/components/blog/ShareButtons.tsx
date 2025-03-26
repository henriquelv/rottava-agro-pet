import React from 'react'
import {
  FacebookLogo,
  TwitterLogo,
  LinkedinLogo,
  WhatsappLogo,
  Link as LinkIcon
} from 'phosphor-react'
import { toast } from 'sonner'

interface ShareButtonsProps {
  title: string
  url: string
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast.success('Link copiado para a área de transferência!')
    } catch (error) {
      toast.error('Erro ao copiar o link')
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-lg font-semibold">Compartilhe este artigo</h3>
      <div className="flex items-center gap-3">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
          title="Compartilhar no Facebook"
        >
          <FacebookLogo size={24} weight="fill" />
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
          title="Compartilhar no Twitter"
        >
          <TwitterLogo size={24} weight="fill" />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
          title="Compartilhar no LinkedIn"
        >
          <LinkedinLogo size={24} weight="fill" />
        </a>
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
          title="Compartilhar no WhatsApp"
        >
          <WhatsappLogo size={24} weight="fill" />
        </a>
        <button
          onClick={handleCopyLink}
          className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
          title="Copiar link"
        >
          <LinkIcon size={24} weight="fill" />
        </button>
      </div>
    </div>
  )
} 