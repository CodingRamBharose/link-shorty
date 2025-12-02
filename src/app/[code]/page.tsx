import { redis } from '@/lib/redis';
import { redirect } from 'next/navigation';

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const originalUrl = await redis.get(code);

  if (originalUrl) {
    redirect(originalUrl);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <h1>404 - Link Not Found</h1>
    </div>
  );
}