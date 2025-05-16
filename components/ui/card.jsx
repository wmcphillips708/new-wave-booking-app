export function Card({ children, ...props }) {
  return <div className="border rounded-lg p-4 shadow" {...props}>{children}</div>;
}
export function CardContent({ children, ...props }) {
  return <div {...props}>{children}</div>;
}
