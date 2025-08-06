export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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
