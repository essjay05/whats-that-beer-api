export const capitalizeWords = str => str.replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())

export const convertToUrlString = (str) => str.replace(/ /g, '%20')
