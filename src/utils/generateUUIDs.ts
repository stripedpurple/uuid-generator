export const createCrypto = (_crypto: Crypto) => (num: number) => {
    const uuidArr = []
    for (let o = 0; o < num; o++)
        uuidArr.push(_crypto.randomUUID())
    
    return uuidArr
  }