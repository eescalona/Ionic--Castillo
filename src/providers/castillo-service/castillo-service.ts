import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CastilloServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CastilloServiceProvider {

  constructor(public http: Http) {
    console.log('Hello CastilloServiceProvider Provider');
  }

	getProyects(typeProyect){

    if(typeProyect == 'Catalogos'){
      let repos = this.http.get(`http://cocinascastillo.escalonasoftware.com/api/catalogs`);
      return repos;
    }else{
      let repos = this.http.get(`http://cocinascastillo.escalonasoftware.com/api/projects/categories/${typeProyect}`);
      return repos;
    }
	}

  getItem(itemId){
    let repos = this.http.get(`http://cocinascastillo.escalonasoftware.com/api/projects/${itemId}`);
        return repos;
  }

  getGallery(itemId){
    let repos = this.http.get(`http://cocinascastillo.escalonasoftware.com/api/projects/${itemId}/gallery`);
    return repos;
  }

  getSlides(){
    //let repos = this.http.get(`http://cocinascastillodev.escalonasoftware.com/api/slides`);
    let repos = this.http.get(`http://cocinascastillo.escalonasoftware.com/api/projects/10/gallery`);
    return repos;
  }
}
