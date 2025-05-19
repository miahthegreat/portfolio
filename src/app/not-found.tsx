'use client'

import { usePageTitle } from "@/context";
import Link from "next/link";
import { useEffect } from "react";

export default function NotFound() {
    const { setTitle } = usePageTitle();
  
    useEffect(() => {
      setTitle("Not Found");
    }, [setTitle]);

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-4xl font-bold mb-2">404 - Not Found</h1>
      <p className="text-lg mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="text-blue-600 hover:underline">
        Go back home
      </Link>
    </div>
  );
}
