function randomFromArr(arr: string[]) {
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

export default { randomFromArr }
