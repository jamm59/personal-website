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
