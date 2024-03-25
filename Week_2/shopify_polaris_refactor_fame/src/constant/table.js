/**
 * This is TODOES_STATUS as DELETE === 0 - COMPLETE === 1 - INCOMPLETE === 2
 * @readonly
 */
export const TODOES_STATUS = ["INCOMPLETE", "COMPLETE", "DELETE"];

export const DEFAULT_PARAMS = {
  page: 1,
  size: 5,
  sorts: [{ field: "updated_at", direction: "asc" }],
};

export const SORT_OPTIONS = [
  { label: "Oldest update", value: "asc" },
  { label: "Newest update", value: "desc" },
];