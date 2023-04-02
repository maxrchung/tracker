$version: "2"
namespace tracker

service Tracker {
  version: "2006-03-01"
  resources: [Entry]
  operations: [ListEntryNames]
}

resource Entry {
  identifiers: { entryId: EntryId}
  create: CreateEntry
}

@length(min: 1, max: 1000)
string EntryId

@length(min: 1, max: 1000)
string EntryName

@readonly
operation ListEntryNames {
  input: ListEntryNamesInput
  output: ListEntryNamesOutput
}

@input
structure ListEntryNamesInput {
}

@output
structure ListEntryNamesOutput {
  @required
  entryNames: EntryNames
}

@uniqueItems
list EntryNames {
  member: String
}

operation CreateEntry {
  input: CreateEntryInput
  output: CreateEntryOutput
}

@input
structure CreateEntryInput {
  @required
  name: EntryName

  value: Double
}

@output
structure CreateEntryOutput {
}