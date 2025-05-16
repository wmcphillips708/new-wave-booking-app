export function Select({ children, ...props }) {
  return <select className="border rounded px-3 py-2 w-full" {...props}>{children}</select>;
}
export function SelectTrigger(props) { return <div {...props} />; }
export function SelectValue(props) { return <div {...props} />; }
export function SelectContent(props) { return <div {...props} />; }
export function SelectItem(props) { return <option {...props} />; }
