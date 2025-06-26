import { useRef, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/components/ui/loading-button';
import { Textarea } from '@/components/ui/textarea';
import { createPostDataSchema } from '@/schemas/post.schemas';
import type { CreatePostData, Post } from '@/types/post.types';
import type { UserProfile } from '@/types/user.types';

import { zodResolver } from '@hookform/resolvers/zod';

import { ImagePlus, Send, X } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface Props {
  userProfile: UserProfile;
  handleCreatePost: (data: CreatePostData) => Promise<Post | null>;
  creating: boolean;
}

export function CreatePostForm({ userProfile, handleCreatePost, creating }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<CreatePostData>({
    resolver: zodResolver(createPostDataSchema),
    defaultValues: {
      title: '',
      content: '',
      imageFile: null!,
    },
  });

  const onSubmit = async (data: CreatePostData) => {
    const result = await handleCreatePost(data);

    if (!result) return;

    form.reset();
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageSelect = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target?.result) return;

      setImagePreview(e.target.result as string);
      form.setValue('imageFile', file);
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    form.setValue('imageFile', null!);

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-4">
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarImage src={userProfile.email} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {userProfile.displayName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Título" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder={`¿Qué tienes en mente, ${userProfile.displayName.split(' ')[0]}?`}
                          className="min-h-[80px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {imagePreview && (
                  <div className="relative">
                    <img src={imagePreview} alt="Preview" className="h-32 w-full rounded-lg object-cover" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/50 p-0 text-white hover:bg-black/70"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="imageFile"
                    render={() => (
                      <FormItem>
                        <FormControl>
                          <div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={handleImageSelect}
                              className="gap-2 text-primary hover:bg-primary/10 hover:text-primary"
                            >
                              <ImagePlus className="h-4 w-4" />
                              Imagen
                            </Button>
                            <Input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="hidden"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <LoadingButton
                    type="submit"
                    loading={creating}
                    loadingText="Publicando..."
                    className="gap-2 bg-primary hover:bg-primary/90"
                  >
                    <Send className="h-4 w-4" />
                    Publicar
                  </LoadingButton>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
