// export const capitalizeWords = str => str.replace(/\b\w/, (c) => c.toUpperCase())

export const convertToUrlString = (string) => {
  const capitalizedString = string.replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())
  return capitalizedString.replace(/ /g, '%20')
}
