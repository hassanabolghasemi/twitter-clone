export const isEmpty = (data) => {
  let dataType = typeof data

  if (dataType === 'object') {
    return Object.keys(data).length ? false : true
  }
}
