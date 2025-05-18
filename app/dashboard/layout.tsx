import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your personal study abroad dashboard with task tracking and smart guidance.',
  openGraph: {
    title: 'Dashboard – OPIOL',
    description: 'Track your study abroad journey in one beautiful, modern dashboard.',
    url: 'https://opiol.app/dashboard',
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-opiol-dark">
      {children}
    </div>
  );
} 