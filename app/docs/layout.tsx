import { ClientLayout } from '@/components/ClientLayout';

export default function DocsLayout({ children }: { children: React.ReactNode; }) {
  return <ClientLayout>{children}</ClientLayout>;
}