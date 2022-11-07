export default function ArticleTitle({ children }) {
  return (
    <h1 className="text-primary dark:text-neutral mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
      {children}
    </h1>
  );
}
