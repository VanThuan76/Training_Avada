import { convertToTimestamp } from "@avada/shared/utils/convertDate";

export function sortByDate(args) {
  const dataSort =
    args.orderBy === "asc" && args.data
      ? [...args.data].sort(
          (a, b) =>
            convertToTimestamp(a.createdAt) - convertToTimestamp(b.createdAt)
        )
      : [...args.data].sort(
          (a, b) =>
            convertToTimestamp(b.createdAt) - convertToTimestamp(a.createdAt)
        );

  return dataSort;
}
