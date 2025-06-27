import { DeletePostDialog } from '@/components/posts/delete-post.dialog';
import { LikeButton } from '@/components/posts/like-button';
import { PostImage } from '@/components/posts/post-image';
import { Card, CardContent } from '@/components/ui/card';
import { LoadingButton } from '@/components/ui/loading-button';
import { LoadingState } from '@/components/ui/loading-state';
import { useUserPosts } from '@/hooks/post/use-user-posts.hook';
import type { UserProfile } from '@/types/user.types';

import { Calendar, MessageCircle, Trash2 } from 'lucide-react';

interface Props {
  user: UserProfile;
}

export function UserProfilePosts({ user }: Props) {
  const { posts, loading, deleting, handleDeletePost } = useUserPosts({ user, showError: true });

  if (loading) {
    return <LoadingState message="Cargando tus publicaciones..." />;
  }

  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="flex h-60 flex-col items-center justify-center gap-4 py-12">
          <div className="flex h-16 w-16 items-center justify-center">
            <MessageCircle className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-lg font-semibold text-foreground">No hay publicaciones aún</h3>
            <p className="max-w-sm text-sm text-muted-foreground">
              Tus publicaciones aparecerán aquí una vez que empieces a compartir contenido en el feed principal
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="border-primary/10 bg-gradient-to-br from-background to-primary/5 transition-all hover:border-primary/20 hover:shadow-lg"
        >
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl leading-tight font-semibold text-primary">{post.title}</h3>
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {post.createdAt.toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
                <DeletePostDialog
                  postTitle={post.title}
                  onConfirm={() => handleDeletePost(post.id)}
                  isDeleting={deleting === post.id}
                >
                  <LoadingButton
                    variant="ghost"
                    size="sm"
                    loading={deleting === post.id}
                    loadingText="Eliminando..."
                    className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-950/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </LoadingButton>
                </DeletePostDialog>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-primary/10 bg-background/60 p-4">
                  <p className="leading-relaxed whitespace-pre-wrap text-foreground">{post.content}</p>
                </div>

                <div className="overflow-hidden rounded-lg border border-primary/20">
                  <PostImage src={post.imageUrl} alt={post.title} />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-primary/10 pt-4">
                <LikeButton
                  user={user}
                  post={post}
                  initialLikesCount={post.likesCount}
                  initialLikeState={post.isLikedByUser}
                />
                <span className="text-sm text-muted-foreground">
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
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
