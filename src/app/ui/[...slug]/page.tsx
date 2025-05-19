import { notFound } from 'next/navigation';

export default function CatchAll() {
  // never renders — instructs Next.js to render your app/not-found.tsx instead
  notFound();
}