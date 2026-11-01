import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AddStudioForm } from "@/components/studios/add-studio-form";

export default async function AddStudioPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login?callbackUrl=/add-studio");
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <AddStudioForm
        user={{
          name: session.user.name || "Studio Host",
          email: session.user.email,
        }}
      />
    </section>
  );
}

