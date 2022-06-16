const quizData=[

    {
        question:"What does HTML stand for?",
        a:"Hyper Tag Markup Language",
        b:"Hyper Text Markup Language",
        c:"Hyperlinks Text Mark Language",
        d:"Hyperlinking Text Marking Language",
        correct:"b",
    },
    {
        question:"Where should a CSS file be referenced in a HTML file?",
        a:"Before any HTML code",
        b:"After all HTML code",
        c:"Inside the head section",
        d:"Inside the body section",
        correct:"c",
    },
    {
        question:"In computer science a language used to create web pages is...",
        a:"HTML",
        b:"TMT",
        c:"LMLH",
        d:"ABSC",
        correct:"a",
    },
    {
        question:"Choose the correct HTML tag for the largest heading",
        a:"<heading>",
        b:"<h6>",
        c:"<head>",
        d:"h1<>",
        correct:"d",
    },
    {
        question:"What is the correct HTML tag for inserting a line break?",
        a:"<br>",
        b:"<lb>",
        c:"<break>",
        d:"<hr>",
        correct:"a",
    },

];

const quiz=document.getElementById("quiz");
const answerEles=document.querySelectorAll(".answer");
const questionEle=document.getElementById("question");

const a_text=document.getElementById("a_text");
const b_text=document.getElementById("b_text");
const c_text=document.getElementById("c_text");
const d_text=document.getElementById("d_text");

const submitBtn=document.getElementById("submit")

let currentQuiz=0;
let score=0;

loadQuiz();

function loadQuiz(){

    deselectAnswers()

    const currentQuizData=quizData[currentQuiz];

    questionEle.innerText=currentQuizData.question

    a_text.innerText=currentQuizData.a;
    b_text.innerText=currentQuizData.b;
    c_text.innerText=currentQuizData.c;
    d_text.innerText=currentQuizData.d;
}

function deselectAnswers(){
    answerEles.forEach(answerEl => answerEl.Checked=false)
}

function getSelected() {
    let answer

    answerEles.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })

    return answer
}

submitBtn.addEventListener("click",()=>{
    const answer=getSelected();

    if(answer){
        if(answer===quizData[currentQuiz].correct){
            score++;
        }
        currentQuiz++;

        if(currentQuiz<quizData.length){
            loadQuiz()
        }else{
            quiz.innerHTML=`<h2>You answered ${score}/${quizData.length} Questions correctly</h2>
            
            <button onClick="location.reload()">Reload</button>
            
            `
        }



    }
})

