export const stringPadding = (input: string, maxLength: number): string => {
  const stringLength = input.length;
  const difference = maxLength - stringLength;

  if (stringLength > maxLength) {
    return input.slice(0, maxLength - 3) + "...";
  }

  for (let i = 0; i < difference; i++) {
    input = input.concat(" ");
  }
  return input;
};

export function getFormattedDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
