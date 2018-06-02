import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CastilloServiceProvider {

  constructor(public http: Http) {
    console.log('Hello CastilloServiceProvider Provider');
  }

	getProyects(typeProyect){
    if(typeProyect == 'Blog'){
      let repos = this.http.get(`http://cocinascastillo.escalonasoftware.com/api/blogs`);
      return repos;
    }else{
      if(typeProyect == 'Promociones'){
        let repos = this.http.get(`http://cocinascastillo.escalonasoftware.com/api/promotions`);
        return repos;
      }else{
        if(typeProyect == 'Catalogos'){
          let repos = this.http.get(`http://cocinascastillo.escalonasoftware.com/api/catalogs`);
          return repos;
        }else{
          if(typeProyect == 'Diseños'){
            let repos = this.http.get(`http://cocinascastillo.escalonasoftware.com/api/projects/categories/Designs`);
            return repos;
          }else{
            let repos = this.http.get(`http://cocinascastillo.escalonasoftware.com/api/projects/categories/${typeProyect}`);
            return repos;
          }
        }
      }
    }
  }
  
  getFavorites(items){
    let repos = this.http.get(`http://cocinascastillo.escalonasoftware.com/api/projects/favorites/${items}`);
    return repos;
  }

  getFavorite(itemId, items){
    let repos = this.http.get(`http://cocinascastillo.escalonasoftware.com/api/projects/favorite/${itemId}/${items}`);
    return repos;
  }

  getItem(itemId){
    let repos = this.http.get(`http://cocinascastillo.escalonasoftware.com/api/projects/${itemId}`);
    return repos;
  }

  getGallery(itemId){
    let repos = this.http.get(`http://cocinascastillo.escalonasoftware.com/api/projects/${itemId}/gallery`);
    return repos;
  }

  getCombination(itemId){
    let repos = this.http.get(`http://cocinascastillo.escalonasoftware.com/api/projects/${itemId}/combination`);
    return repos;
  }

  postMail(item){
    console.log( 'postMail server'+ JSON.stringify(item));
    let headers = new Headers(
      {
        'Content-Type' : 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      
    let repos = this.http.post(`http://cocinascastillo.escalonasoftware.com/api/mail`,JSON.stringify(item), options);
    return repos;
  }
}
