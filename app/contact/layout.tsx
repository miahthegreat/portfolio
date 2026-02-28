import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Jeremiah Schmid. Send a message for questions, collaboration, or opportunities.",
  openGraph: {
    title: "Contact | Jeremiah Schmid",
    description: "Get in touch. Send a message for questions, collaboration, or opportunities.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
