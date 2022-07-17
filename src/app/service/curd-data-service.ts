import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class DataService {
    constructor(private http: HttpClient, private url: string, private type: string) { }
     userId = localStorage.getItem('id')

    // Create API
    addAll(formData: any, id: string): Observable<any> {
        // let userId = localStorage.getItem('id')
        return this.http.post(`${this.url}/create/${this.userId}/${id}`, formData)
    }
    // Get All API
    getAll() {
        return this.http.get(`${this.url}/`)
    }
    // Get questions by topic ID
    getQuestionByTopic(topic: any) {
        return this.http.get(`${this.url}/get/${this.userId}/${topic}`)
    }
    // Delete questions by question ID
    delete(id: any, type: any) {
        return this.http.delete(`${this.url}/delete/${id}`)
    }
    //Update question
    update(id: any, body: any) {
        const bodys = {
            sequence: body.sequence,
            question: body.question,
            // file: body.file,
            // phone: body.phone,
            // country: body.country
          }
          const path = `${this.url}/update/${id}`;
          // console.log(bodyz)
          return this.http.put(path, bodys)
    }
    // Get question by Id
    getQuestionById(id: any) {
        return this.http.get(`${this.url}/getQuestion/${id}`)
    }

    // getQuestionById(id: any) {
    //     return this.http.get(`${this.url}/get/${this.userId}/${id}` )
    // }
  
    // getImageMcqs(imageName: string) {
    //   return this.http.get(`${api_path}/image?image=${imageName}`, { responseType: 'blob'})
    // }

    //   getImageMcqs(imageName: string) {
    //     return this.http.get(`${api_path_mcqs}/files/${imageName}`, { responseType: 'blob' })
    //   }
}
