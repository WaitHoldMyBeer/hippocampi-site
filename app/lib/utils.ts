export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// export const formatDateToLocal = (
//   dateStr: string,
//   locale: string = "en-US"
// ) => {
//   const date = new Date(dateStr);
//   const options: Intl.DateTimeFormatOptions = {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   };
//   const formatter = new Intl.DateTimeFormat(locale, options);
//   return formatter.format(date);
// };
