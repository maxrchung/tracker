interface BoldEntryProps {
  entryName?: string;
  value?: number | null;
}

export default function BoldEntry({ entryName, value }: BoldEntryProps) {
  return (
    <strong>{value == null ? entryName : `${entryName} (${value})`}</strong>
  );
}
