export interface Interface {
}
export interface response {
    message: string
  }


  export interface productSchema {
    name: string,
    category: string,
    quantity: number,
    price: number,
    description: string,
    image:string
  }
  
  
  export interface products {
    message: string,
    data: Array<productSchema>
  }