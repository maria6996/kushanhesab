import axios from 'axios';

interface Product {
          title ?: '',
          media ?: '',
          short_description ?: '',
          long_description ?: '',
          more_media ?: '',
}

export default class ProductService {
          async getServices() {
                    console.log('step 1');
                    return await axios.get('/api/product');
          }

          async createServices(product:Product) {
                    console.log('step 2');
                    return await axios.post('/api/product',product);
          }

          // async getCategories() {
          //           console.log('step 2');
          //           return await axios.get('/api/categ',product);
          // }
}
