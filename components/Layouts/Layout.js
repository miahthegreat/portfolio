export default function Layout({ preview, children }) {
  return (
    <div className="pt-24 pb-6">
      <main>{children}</main>
    </div>
  );
}
