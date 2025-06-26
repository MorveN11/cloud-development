import { useState } from 'react';

import { ImageIcon } from 'lucide-react';

interface Props {
  src: string;
  alt: string;
}

export function PostImage({ src, alt }: Props) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-primary/10 bg-muted">
        <div className="text-center">
          <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">Imagen no disponible</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-auto max-h-96 w-full object-cover transition-transform hover:scale-105"
      onError={() => setImageError(true)}
    />
  );
}
