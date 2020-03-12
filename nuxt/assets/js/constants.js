export const TAGS_COLORS = {
  "Benign/Likely benign": "#1a3e6c",
  "False positives": "#a9983d",
  "Previously Triaged": "#1b9b4a",
  "Not categorized": "#da5959",
  "Previously categorized": "#2bb3ed"
}

export const LOGICAL_OPERATORS = {
  OR: "Any",
  AND: "All",
  NOT: "None",
  ONLY: "Only"
}

export const LOGICAL_OPERATORS_STATUS = {
  OR: "Any",
  NOT: "None"
}

export const ENUM_DEFAULT_OPERATOR = Object.keys(LOGICAL_OPERATORS)[0]

export const STAT_TYPE_ENUM = "enum"
export const STAT_GROUP = "group"
export const STAT_TYPE_INT = "int"
export const STAT_TYPE_FLOAT = "float"
export const STAT_TYPE_STATUS = "status"
export const STAT_TYPE_ZYGOSITY = "zygosity"
export const STAT_TYPE_TRANSCRIPT_MULTISET = "transcript-multiset"
export const STAT_TYPE_TRANSCRIPT_STATUS = "transcript-status"
export const STAT_NUMERIC = "numeric"

export const VARIANTS_FILTER_TITLE = "FILTER VARIANTS"

export const LOG_EDITOR_MARKS = [0, 0.0001, 0.001, 0.01, 0.05, 0.5, 1]

export const RENDER_OPERATIVE = "operative"

export const NUMERIC_RENDER_TYPES = {
  COORDINATE: "neighborhood",
  LOGARITHMIC: "log",
  LINEAR: "linear"
}

// List of allowed types to display in 'Filter Modal' (check utils.prepareStatList)
export const STAT_TYPES = [
  STAT_TYPE_INT,
  STAT_TYPE_FLOAT,
  STAT_TYPE_ENUM,
  STAT_TYPE_STATUS,
  STAT_TYPE_ZYGOSITY,
  STAT_TYPE_TRANSCRIPT_MULTISET,
  STAT_TYPE_TRANSCRIPT_STATUS
]
