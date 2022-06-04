import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class DataService {
    constructor(private http: HttpClient, private url: string) { }
    // Create API
    addAll(formData: any, id: string): Observable<any> {
        let userId = localStorage.getItem('id')
        return this.http.post(`${this.url}/create/${userId}/${id}`, formData)
    }
    // Get All API
    getAll() {
        return this.http.get(`${this.url}/`)
    }
    // Get questions by topic ID
    getQuestionByTopic(topic: any) {
        let userId = localStorage.getItem('id')
        return this.http.get(`${this.url}/get/${userId}/${topic}`)
    }
    // Delete questions by question ID
    delete(id: any) {
        return this.http.delete(`${this.url}/delete/${id}`)
    }
    
    // getImageMcqs(imageName: string) {
    //   return this.http.get(`${api_path}/image?image=${imageName}`, { responseType: 'blob'})
    // }

    //   getImageMcqs(imageName: string) {
    //     return this.http.get(`${api_path_mcqs}/files/${imageName}`, { responseType: 'blob' })
    //   }
}
