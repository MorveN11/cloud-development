import { LinkPasswordForm } from '@/components/auth/link-password.form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export function LinkPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>
            <h1>Link Password</h1>
          </CardTitle>
          <CardDescription>
            <small>Link your account with a password</small>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <LinkPasswordForm />
        </CardContent>

        <CardFooter className="mx-auto">
          <small className="text-center muted">
            Back to Dashboard?
            <Button type="button" variant="link" className="px-2 py-0" asChild>
              <a href="/dashboard">Dashboard</a>
            </Button>
          </small>
        </CardFooter>
      </Card>
    </div>
  );
}
