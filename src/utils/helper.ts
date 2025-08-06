export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const capitalizeWords = (str: string): string => {
  return str.split(" ").map(capitalizeFirstLetter).join(" ");
};

export const formatDateUTC = (
  dateInput: string | Date,
  format: "YYYY-MM-DD" | "MM/DD/YYYY" = "YYYY-MM-DD"
): string => {
  const date = new Date(dateInput);

  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");

  if (format === "MM/DD/YYYY") {
    return `${mm}/${dd}/${yyyy}`;
  }

  return `${yyyy}-${mm}-${dd}`;
};
