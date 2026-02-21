import { SignupForm } from "@/components/auth/signup-form";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <div className="page-container py-12">
      <div className="mx-auto max-w-md">
        <Card className="space-y-4">
          <div>
            <CardTitle>Create your account</CardTitle>
            <CardDescription>Save progress, notes, and document proofs for each checklist step.</CardDescription>
          </div>
          <SignupForm />
        </Card>
      </div>
    </div>
  );
}
