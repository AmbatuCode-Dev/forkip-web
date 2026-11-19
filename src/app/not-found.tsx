import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 items-center justify-center px-4 py-16 sm:px-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <p className="font-mono text-xs font-medium tracking-wider text-muted-foreground uppercase">
            404
          </p>
          <CardTitle className="text-xl">Page not found</CardTitle>
          <CardDescription>
            The page you requested does not exist or may have been moved.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/" className={buttonVariants({ variant: "primary" })}>
            Back to home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
