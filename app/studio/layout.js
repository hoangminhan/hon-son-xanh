export const metadata = {
  title: 'Sanity Studio',
  description: 'Quản trị nội dung Hòn Sơn Xanh',
};

export default function StudioLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
