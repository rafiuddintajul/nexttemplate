
// Configuration related data

export type AdminConfig = {
  name: 'AdminMainConfig',
  data: {
    currency: string,
    hideUnavailableProduct:boolean,
  }
}

export type ProductConfig = {
  name: 'ProductConfig',
  data: {
    tags: string[]
  }
}

