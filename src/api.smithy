$version: "2"
namespace tracker

service Tracker {
  version: "2006-03-01"
}

@readonly
operation ListEntryTypes {
  input: ListEntryTypesInput
  output: ListEntryTypesOutput
}

@input
structure ListEntryTypesInput {
}

@output
structure ListEntryTypesOutput {
  @required
  entryTypes: EntryTypes
}