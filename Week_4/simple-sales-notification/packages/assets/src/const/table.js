export const DEFAULT_PARAMS = {
  page: 1,
  size: 5,
  sorts: [{ field: "createdAt", direction: "asc" }],
};

export const SORT_OPTIONS = [
  { label: "Oldest update", value: "asc" },
  { label: "Newest update", value: "desc" },
];