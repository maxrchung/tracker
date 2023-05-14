interface BoldEntryProps {
  entryName?: string;
  value?: number | null;
}

export default function BoldEntry({ entryName, value }: BoldEntryProps) {
  console.log("entryName", entryName);
  return (
    <strong>{value == null ? entryName : `${entryName} (${value})`}</strong>
  );
}
