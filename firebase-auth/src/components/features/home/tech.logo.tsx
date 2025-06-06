export function TechLogo({ name }: { name: string }) {
  return (
    <div className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">{name}</div>
  );
}
