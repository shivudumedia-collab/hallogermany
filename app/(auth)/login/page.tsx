import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="page-container py-12">
      <div className="mx-auto max-w-md">
        <Card className="space-y-4">
          <div>
            <CardTitle>Login to Germany Check List</CardTitle>
            <CardDescription>Continue tracking your Germany MS application journey.</CardDescription>
          </div>
          <Suspense fallback={<div className="text-sm text-black">Loading login form...</div>}>
            <LoginForm />
          </Suspense>
        </Card>
      </div>
    </div>
  );
}
