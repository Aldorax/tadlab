import { redirect } from "next/navigation";

export default async function ShortInvitePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  redirect(`/admin/register?token=${encodeURIComponent(token)}`);
}
