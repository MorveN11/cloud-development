import { CreatePostDialog } from '@/components/posts/create-post.dialog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingButton } from '@/components/ui/loading-button';
import { LoadingState } from '@/components/ui/loading-state';
import { useUserPosts } from '@/hooks/post/use-user-posts.hook';
import type { UserProfile } from '@/types/user.types';

import { MessageSquare, Trash2 } from 'lucide-react';

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
              Your Posts
            </CardTitle>
            <CardDescription>Manage your posts and content</CardDescription>
          </div>
          <CreatePostDialog onPostCreated={handleCreatePost} />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {posts.length === 0 ? (
          <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <MessageSquare className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">No posts yet</p>
              <p className="text-xs text-gray-400">Create your first post to get started</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="relative">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription className="text-xs">
                    {post.createdAt.toLocaleDateString()} at {post.createdAt.toLocaleTimeString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm whitespace-pre-wrap text-gray-700">{post.content}</p>
                </CardContent>
                <CardFooter className="pt-3">
                  <div className="flex w-full justify-end">
                    <LoadingButton
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeletePost(post.id)}
                      loading={deleting === post.id}
                      loadingText="Deleting..."
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </LoadingButton>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
