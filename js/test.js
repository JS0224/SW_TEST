import { getQuestions, getAlgorithm } from './util.js';

// Get references to the HTML elements
const mainContainer = document.getElementById('mainContainer');
const questionNumberElement = document.getElementById('questionNumber');
const questionTextElement = document.getElementById('questionText');
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const loading = document.getElementById("loading");
const ad = document.getElementById("ad");
const remainQuestion = document.getElementById('remainQuestion');

// Sample questions and question numbers
var test_id = null
var lan = null
var questions = []
var currentQuestionIndex = 0;

const selectedTagNumberList = {};

// Function to update the question and question number
function updateQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionNumberElement.textContent = `Q ${currentQuestionIndex + 1}`;
        questionTextElement.textContent = currentQuestion.question;
        remainQuestion.textContent = `${currentQuestionIndex + 1} / ${questions.length}`;

        // Update answer buttons
        button1.textContent = "Yes";
        button2.textContent = "No";

        const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
        document.getElementById('progress').style.width = `${progressPercent}%`;
    } else {
        showLoading()
    }
}


// *************** NEXT Page ****************
// Loading
function showLoading() {
    mainContainer.style.display = "none";
    loading.style.display = "block";

    setTimeout(() => {
        loading.style.display = "none"
        goToNextPage()
    }, 2000);
}

// Go to next page
function goToNextPage() {
    console.log(selectedTagNumberList)
    const type = getType()

    console.log("TYPE: ", type)
    window.location.href = "result.html?test_id=" + test_id + "&lan=" + lan + "&type=" + type
}

// Get Type
function getType() {
    const algorithm = getAlgorithm()

    const resultCharacters = algorithm(selectedTagNumberList)

    console.log(resultCharacters)
    let sortedCharacters = resultCharacters.sort();
    let result = sortedCharacters.join('');
  
    return result;
}

// ******** Setup *********
function addEventOnAnswerButtons() {
    // Event listener for Button 1
    button1.addEventListener('click', () => {
        let currentTag = questions[currentQuestionIndex].tag 

        if (selectedTagNumberList.hasOwnProperty(currentTag)) {
            selectedTagNumberList[currentTag]++;
        } else {
            selectedTagNumberList[currentTag] = 1;
        }
        currentQuestionIndex++;
        updateQuestion();
    });

    // Event listener for Button 2
    button2.addEventListener('click', () => {
        currentQuestionIndex++;
        updateQuestion();
    });
}

function setupQuestions() {
    questions = getQuestions(test_id, lan)
}

function receiveDataFromPreviousPage() {
    test_id = window.location.search.substring(1).split("&")[0].split("=")[1];
    lan = window.location.search.substring(1).split("&")[1].split("=")[1];
}

// Initial question update
function init() {
    receiveDataFromPreviousPage()
    setupQuestions()
    addEventOnAnswerButtons()

    updateQuestion();
}

init();
