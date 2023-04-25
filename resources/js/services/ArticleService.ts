import axios from 'axios';

interface Article {
          id?:number,
          tags?: string;
          title?: string;
          editorData?: string;
          link?: string;
          image?: File;
          type?:boolean;
}

export default class ArticleService {

          async getArticles() {
                    return await axios.get('/api/article');
          }

          async createArticle(article: Article) {
                    return await axios.post('/api/article' ,article );
          }
          async changeType(type : string){
                    return await axios.get('/api/article?type='+type);
          }

          async getArticle(slug: string){

                    return await axios.get(`/api/article/${slug}`);
          }

          async updateArticle(article: Article,slug:string){

                    console.log(article);
                    return await axios.put(`/api/article/${slug}`,article);
          }
          //
          // async createCategory(category: Category) {
          //           return await axios.post('/category', category);
          // }
          //
          // async deleteAlias(id: number) {
          //           return await axios.delete('/alias/' + id);
          // }
}
