import { PostItem } from '@/components/feed/post-item';
import { CreatePostForm } from '@/components/posts/create-post.form';
import { Card, CardContent } from '@/components/ui/card';
import { LoadingState } from '@/components/ui/loading-state';
import { Separator } from '@/components/ui/separator';
import { useUserPosts } from '@/hooks/post/use-user-posts.hook';
import type { UserProfile } from '@/types/user.types';

import { Send } from 'lucide-react';

interface Props {
  userProfile: UserProfile;
}

export function MainFeed({ userProfile }: Props) {
  const { posts, handleCreatePost, creating, loading } = useUserPosts({
    user: userProfile,
    showError: true,
    allPosts: true,
  });

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <CreatePostForm userProfile={userProfile} handleCreatePost={handleCreatePost} creating={creating} />
        <LoadingState message="Cargando publicaciones..." />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <CreatePostForm userProfile={userProfile} handleCreatePost={handleCreatePost} creating={creating} />

      <Separator className="my-6" />

      <div className="space-y-6">
        {posts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
                <Send className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-medium">¡Crea tu primera publicación!</h3>
              <p className="text-sm text-muted-foreground">Comparte algo interesante con la comunidad de AltaConnect</p>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => <PostItem key={post.id} user={userProfile} post={post} />)
        )}
      </div>
    </div>
  );
}
