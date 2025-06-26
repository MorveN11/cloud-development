import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { Post } from '@/types/post.types';

import { Calendar } from 'lucide-react';

interface PostItemProps {
  post: Post;
}

export function PostItem({ post }: PostItemProps) {
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Hace unos minutos';
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    if (diffInHours < 168) return `Hace ${Math.floor(diffInHours / 24)} días`;
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="border-primary/10 bg-gradient-to-br from-background to-primary/5 transition-all hover:border-primary/20 hover:shadow-lg">
      <CardHeader className="flex-row items-center gap-3 space-y-0 pb-3">
        <Avatar className="h-12 w-12 border-2 border-primary/20">
          <AvatarImage src={post.authorEmail} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {post.authorDisplayName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="truncate text-base font-semibold text-primary">{post.authorDisplayName}</h4>
            <span className="truncate text-sm text-muted-foreground">@{post.authorEmail.split('@')[0]}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="text-xs">{formatTimeAgo(post.createdAt)}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        <h3 className="text-lg leading-tight font-semibold text-primary">{post.title}</h3>

        <div className="rounded-lg border border-primary/10 bg-background/60 p-4">
          <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">{post.content}</p>
        </div>

        <div className="overflow-hidden rounded-lg border border-primary/20">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="h-auto max-h-96 w-full object-cover transition-transform hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                    <div class="flex h-40 items-center justify-center bg-muted rounded-lg border border-primary/10">
                      <div class="text-center">
                        <svg class="mx-auto h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <p class="mt-2 text-sm text-muted-foreground">Imagen no disponible</p>
                      </div>
                    </div>
                  `;
              }
            }}
          />
        </div>

        <div className="flex items-center justify-between border-t border-primary/10 pt-3">
          <span className="text-xs text-muted-foreground">
            Publicado el{' '}
            {post.createdAt.toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span className="rounded-full bg-primary/5 px-2 py-1 text-xs text-muted-foreground">
            {post.createdAt.toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
