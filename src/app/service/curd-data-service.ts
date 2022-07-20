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
    updateOpenEnded(body: any, id: any) {
        // const openEndedQuestion = {
        //     sequence: body.sequence,
        //     question: body.question,
        //     file: body.file,
        // }
        const path = `${this.url}/update/${id}`;
        return this.http.put(path, body)
    }

    //Update Mcqs
    updateMcqs(body: any, id: any) {
        const path = `${this.url}/update/${id}`;
        return this.http.put(path, body)
    }

    //Update true false
    updateTrueFalse(id: any, body: any) {
        const bodys = {
            sequence: body.sequence,
            question: body.question,
            answer: body.answer,
            posFeedback: body.posFeedback,
            negFeedback: body.negFeedback
        }
        const path = `${this.url}/update/${id}`;
        return this.http.put(path, bodys)
    }

    //Update introduction
    updateIntroduction(id: any, body: any) {
        const bodys = {
            sequence: body.sequence,
            introduction: body.introduction,
        }
        const path = `${this.url}/update/${id}`;
        return this.http.put(path, bodys)
    }

   //Update introduction
   updateMatchPairs(id: any, body: any) {
    const bodys = {
        sequence: body.sequence,
        question: body.question,
        statement1: body.statement1,
        statement2: body.statement2,
        statement3: body.statement3,
        statement4: body.statement4,
        statement5: body.statement4,
        posFeedback: body.posFeedback,
        negFeedback: body.negFeedback,
        answer1: body.answer1,
        answer2: body.answer2,
        answer3: body.answer3,
        answer4: body.answer4,
        answer5: body.answer5,
    }
    const path = `${this.url}/update/${id}`;
    return this.http.put(path, bodys)
}
    // Get question by Id
    getQuestionById(id: any) {
        return this.http.get(`${this.url}/getQuestion/${id}`)
    }
}
