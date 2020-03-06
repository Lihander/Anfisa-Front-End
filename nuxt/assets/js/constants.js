export const TAGS_COLORS = {
  "Benign/Likely benign": "#1a3e6c",
  "False positives": "#a9983d",
  "Previously Triaged": "#1b9b4a",
  "Not categorized": "#da5959",
  "Previously categorized": "#2bb3ed"
}

export const STAT_TYPE_ENUM = "enum"
export const STAT_GROUP = "group"
export const STAT_TYPE_INT = "int"
export const STAT_TYPE_FLOAT = "float"
export const STAT_TYPE_STATUS = "status"
export const STAT_TYPE_ZYGOSITY = "zygosity"
export const STAT_TYPE_TRANSCRIPT_MULTISET = "transcript-multiset"
export const STAT_TYPE_TRANSCRIPT_STATUS = "transcript-status"

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
