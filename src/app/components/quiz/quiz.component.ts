import { Component, OnInit } from '@angular/core';
import quiz_questions from '../../../assets/data/quiz_questions.json'


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  title:string=""

  questions:any
  questionSelected:any

  answers:string[]= []
  answerSelected:string=""

  questionIndex:number=0
  questionMaxIndex:number=0

  finished:boolean= false

  question_select(alias:string){
    this.answers.push(alias)
    this.next_question()
    console.log(this.answers)
  }


  async next_question(){
    this.questionIndex += 1

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quiz_questions.results[finalAnswer as keyof typeof quiz_questions.results]
      //verificar opção ganhadora
    }
  }


  async checkResult(answer:string[]) {
    const reduce = answer.reduce((previus, current, i, arr) =>{
       if (
        arr.filter(item => item === previus).length >
        arr.filter(item => item === current).length
       ) {
        return previus
       }else{
        return current
       }
    })

    return reduce
  }



  constructor() { }

  ngOnInit(): void {
    if (quiz_questions) {
      this.finished =  false

      this.title = quiz_questions.title

      this.questions = quiz_questions.questions
      this.questionSelected =  this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

      console.log(this.questionIndex)
      console.log(this.questionMaxIndex)
    }
  }

}
