import axios from "axios";

interface Customer {
          id?:number,
          name?: string,
          mobile?: number,
          phone?: number,
          address?: string,
          password?:string,
          services?:[string],
          userDetail:[UserDetail]

}

interface UserDetail{
          title ?: string,
          value ?: string,
          isShown ?:boolean
}
export default class CustomerService{

          async createCustomer(customer:Customer){
                    return await axios.post('/api/user',customer)
          }

          async getCustomers(customer:Customer){
                    return await axios.get('/api/user')
          }
}
