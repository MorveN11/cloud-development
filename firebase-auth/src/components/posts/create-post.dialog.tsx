import { useRef, useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/components/ui/loading-button';
import { Textarea } from '@/components/ui/textarea';
import { createPostDataSchema } from '@/schemas/post.schemas';
import type { CreatePostData, Post } from '@/types/post.types';

import { zodResolver } from '@hookform/resolvers/zod';

import { AlertTriangle, Camera, ImageIcon, Plus, Upload, X } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface CreatePostDialogProps {
  onPostCreated: (postData: CreatePostData) => Promise<Post | null>;
}

export function CreatePostDialog({ onPostCreated }: CreatePostDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorDialog, setErrorDialog] = useState<{
    open: boolean;
    title: string;
    description: string;
  }>({
    open: false,
    title: '',
    description: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<CreatePostData>({
    resolver: zodResolver(createPostDataSchema),
    defaultValues: {
      title: '',
      content: '',
      imageFile: null!,
    },
  });

  const onSubmit = async (data: CreatePostData) => {
    try {
      setIsSubmitting(true);

      const newPost = await onPostCreated(data);

      if (newPost) {
        form.reset();
        setOpen(false);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.reset();
    setImagePreview(null);
    setIsDragOver(false);
    setOpen(false);
  };

  const showErrorDialog = (title: string, description: string) => {
    setErrorDialog({
      open: true,
      title,
      description,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const handleFileSelection = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      showErrorDialog('Tipo de archivo no válido', 'Por favor selecciona una imagen en formato JPG, JPEG, PNG o WEBP.');
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(1);
      showErrorDialog(
        'Archivo demasiado grande',
        `El archivo seleccionado pesa ${fileSizeInMB}MB. Por favor selecciona una imagen de máximo 5MB.`,
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    form.setValue('imageFile', file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    form.setValue('imageFile', null!);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="h-4 w-4" />
            Crear Post
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[85vh] overflow-hidden sm:max-w-[700px]">
          <DialogHeader className="space-y-3">
            <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
              <Camera className="h-5 w-5 text-blue-600" />
              Crear Nuevo Post
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Comparte tus ideas y pensamientos con la comunidad. Agrega una imagen para hacer tu post más atractivo.
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[60vh] overflow-y-auto pr-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Título *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Escribe un título atractivo para tu post..."
                          disabled={isSubmitting}
                          className="transition-colors focus:ring-2 focus:ring-blue-500"
                          {...field}
                        />
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
                      <FormLabel className="text-sm font-medium">Contenido *</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="min-h-[120px] resize-none transition-colors focus:ring-2 focus:ring-blue-500"
                          placeholder="Comparte tus pensamientos, experiencias o ideas..."
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageFile"
                  render={() => {
                    const currentImage = form.watch('imageFile');

                    return (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Imagen del Post</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            {/* Área de drag & drop mejorada */}
                            <div
                              className={`group relative flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8 text-center transition-all duration-200 ${
                                isDragOver
                                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                                  : currentImage
                                    ? 'border-green-300 bg-green-50 dark:bg-green-950/20'
                                    : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800/50 dark:hover:border-gray-500 dark:hover:bg-gray-800'
                              }`}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDrop}
                              onClick={handleFileButtonClick}
                            >
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                disabled={isSubmitting}
                              />

                              {!currentImage ? (
                                <>
                                  <div className="mb-4 rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
                                    <Upload className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                  </div>
                                  <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Agregar imagen
                                  </h3>
                                  <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                    Arrastra una imagen aquí o haz clic para seleccionar
                                  </p>
                                  <p className="text-xs text-gray-400 dark:text-gray-500">
                                    Formatos: JPG, JPEG, PNG, WEBP • Máximo: 5MB
                                  </p>
                                </>
                              ) : (
                                <>
                                  <div className="mb-4 rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                                    <ImageIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                                  </div>
                                  <h3 className="mb-1 text-sm font-semibold text-green-700 dark:text-green-300">
                                    {currentImage.name}
                                  </h3>
                                  <p className="text-xs text-green-600 dark:text-green-400">
                                    {(currentImage.size / 1024).toFixed(0)} KB • {currentImage.type}
                                  </p>
                                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                    Haz clic para cambiar la imagen
                                  </p>
                                </>
                              )}

                              {isDragOver && (
                                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-blue-500/10">
                                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                    Suelta la imagen aquí
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Preview mejorado */}
                            {imagePreview && (
                              <div className="overflow-hidden rounded-lg border bg-white shadow-sm dark:bg-gray-800">
                                <div className="flex items-center justify-between bg-gray-50 px-4 py-2 dark:bg-gray-700">
                                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Vista previa
                                  </span>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleRemoveImage}
                                    className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30"
                                    disabled={isSubmitting}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                                <div className="p-4">
                                  <div className="relative aspect-video w-full overflow-hidden rounded-md bg-gray-100 dark:bg-gray-700">
                                    <img
                                      src={imagePreview}
                                      alt="Preview"
                                      className="h-full w-full object-cover transition-transform hover:scale-105"
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <div className="flex justify-end gap-3 border-t pt-4">
                  <Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
                    Cancelar
                  </Button>
                  <LoadingButton
                    type="submit"
                    loading={isSubmitting}
                    loadingText="Creando post..."
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Crear Post
                  </LoadingButton>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={errorDialog.open} onOpenChange={(open) => setErrorDialog({ ...errorDialog, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              {errorDialog.title}
            </AlertDialogTitle>
            <AlertDialogDescription>{errorDialog.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setErrorDialog({ ...errorDialog, open: false })}>
              Entendido
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
