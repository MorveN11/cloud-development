import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { usePostLikes } from '@/hooks/like/user-post-likes.hook';
import { cn } from '@/lib/utils';
import type { User } from '@/types/auth.types';
import type { PostWithLikes } from '@/types/post.types';

import { Heart } from 'lucide-react';

interface LikeButtonProps {
  user: User;
  post: PostWithLikes;
  initialLikeState: boolean;
  initialLikesCount: number;
  className?: string;
}

export const LikeButton = ({ user, post, initialLikeState, initialLikesCount, className }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(initialLikeState);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const { toggleLike, isLoading } = usePostLikes({ user });

  const handleToggleLike = async () => {
    try {
      const newLikeState = await toggleLike(post);

      setLikesCount((prev) => (newLikeState ? prev + 1 : prev - 1));
      setIsLiked(newLikeState);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <Button
      onClick={handleToggleLike}
      disabled={isLoading}
      variant="ghost"
      className={cn(
        'flex items-center gap-2 rounded-lg px-3 py-2 transition-colors',
        'hover:bg-red-50 dark:hover:bg-red-950/20',
        isLiked && 'text-red-500',
        className,
      )}
    >
      <Heart className={cn('size-5 transition-all', isLiked && 'fill-current')} />
      <span className="text-sm font-medium">{likesCount}</span>
    </Button>
  );
};
