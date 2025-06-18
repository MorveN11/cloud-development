import { CreatePostDialog } from '@/components/posts/create-post.dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingButton } from '@/components/ui/loading-button';
import { LoadingState } from '@/components/ui/loading-state';
import { useUserPosts } from '@/hooks/post/use-user-posts.hook';
import type { UserProfile } from '@/types/user.types';

import { Calendar, ImageIcon, MessageSquare, Trash2 } from 'lucide-react';

interface Props {
  user: UserProfile;
}

export function UserPostsManager({ user }: Props) {
  const { posts, loading, deleting, handleCreatePost, handleDeletePost } = useUserPosts({ user, showError: true });

  if (loading) {
    return <LoadingState message="Loading your posts..." />;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Mis Posts
            </CardTitle>
            <CardDescription>Gestiona tu contenido y publicaciones</CardDescription>
          </div>
          <CreatePostDialog onPostCreated={handleCreatePost} />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {posts.length === 0 ? (
          <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 py-8 dark:border-gray-600">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <MessageSquare className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No hay posts aún</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Crea tu primer post para comenzar a compartir contenido
            </p>
            <div className="text-xs text-gray-400 dark:text-gray-500">Puedes agregar texto e imágenes a tus posts</div>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden transition-shadow hover:shadow-md">
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                            <div class="flex h-full items-center justify-center bg-gray-100 dark:bg-gray-800">
                              <div class="text-center">
                                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <p class="mt-2 text-sm text-gray-500">Imagen no disponible</p>
                              </div>
                            </div>
                          `;
                      }
                    }}
                  />
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{post.title}</h3>
                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {post.createdAt.toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}{' '}
                            a las{' '}
                            {post.createdAt.toLocaleTimeString('es-ES', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          {post.imageUrl && (
                            <>
                              <span className="text-gray-300">•</span>
                              <ImageIcon className="h-4 w-4" />
                              <span>Con imagen</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="leading-relaxed whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                      {post.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        Post
                      </span>
                    </div>

                    <LoadingButton
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeletePost(post.id)}
                      loading={deleting === post.id}
                      loadingText="Eliminando..."
                      className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/20"
                    >
                      <Trash2 className="h-4 w-4" />
                      Eliminar
                    </LoadingButton>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
