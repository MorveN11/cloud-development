import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Props {
  postTitle: string;
  onConfirm: () => void;
  isDeleting: boolean;
  children: React.ReactNode;
}

export function DeletePostDialog({ postTitle, onConfirm, isDeleting, children }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">¿Eliminar publicación?</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <span>
              ¿Estás seguro de que deseas eliminar la publicación{' '}
              <strong className="text-foreground">"{postTitle}"</strong>?
            </span>
            <span className="block text-sm">
              Esta acción no se puede deshacer y la publicación se eliminará permanentemente de tu perfil.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {isDeleting ? 'Eliminando...' : 'Eliminar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
