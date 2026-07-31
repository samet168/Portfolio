import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects - Moeun Samet',
  description: 'Explore my portfolio of projects built with modern technologies including React, Next.js, Spring Boot, Flutter, and more.',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
