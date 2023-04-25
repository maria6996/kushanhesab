import axios from 'axios';

interface Category {
          category_type_id: number;
          title: string;
}

export default class CategoryService {
          async getCategories() {
                    return await axios.get('/api/category');
          }

          async getTypes() {
                    return await axios.get('/api/categoryType');
          }

          async updateAlias(category: Category, aliasId: number) {
                    return await axios.put('/alias/' + aliasId, category);
          }

          async createCategory(category: Category) {
                    return await axios.post('/category', category);
          }

          async deleteAlias(id: number) {
                    return await axios.delete('/alias/' + id);
          }
}
