

export const truncateString = (str: string, maxLength = 10) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 3) + "...";
  }
  return str;
};

export const getInitials = (fullName: string): string => {
  return fullName
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase())
    .join("");
};

export const removeEmptyNullUndefined = (obj: object) =>
  Object.entries(obj)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, v]) => v != null && v != undefined && v != "")
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});

export const convertToQueryParams = (obj: object) => {
  const query =
    "?" + new URLSearchParams(removeEmptyNullUndefined(obj)).toString();
  return query;
};

export const capitalize = (sentence: string) => {
  return sentence
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
