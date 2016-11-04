    data = {
        "quizcontent": [{
            "question": "First question. Possible answers 4",
            "image": "",
            "correctAnswer": 1,
            "answers": ["1. Answer", "2. Answer", "3. Answer", "4. Answer"]
  }, {
            "question": "Second question. Possible answers 3",
            "image": "",
            "correctAnswer": 3,
            "answers": ["1. Answer", "2. Answer", "3. Answer"]
  }, {
            "question": "Third question. Question includes image",
            "image": "images/img1.jpg",
            "correctAnswer": 2,
            "answers": ["1. Answer", "2. Answer", "3. Answer", "4. Answer"]
  }, {
            "question": "Fourth question with true or false answer",
            "image": "",
            "correctAnswer": 1,
            "answers": ["True", "False"]
  }],

    };

    var lengthofobject = data.quizcontent.length;
    var curPage = 0,
        correctAnswer = 0;
    var arrMyAnswers = [];

    var newimage = document.getElementById("quizimage");
    var myHeader = document.getElementById("quizHeader");
    var classname = document.getElementsByClassName("answer");
    var myQuestion = document.getElementById("questions");
    var progressBar = document.getElementById("progressBar");
    var btnNext = document.getElementById("btnNext");
    var btnPrevious = document.getElementById("btnPrevious");
    var btnFinish = document.getElementById("finishQuiz");

    var questionSection = document.getElementById("questions");

    checkPage();
    btnNext.addEventListener("click", moveNext);
    btnPrevious.addEventListener("click", moveBack);
    btnFinish.addEventListener("click", finishQuiz);

    function myAnswer() {
        var idAnswer = this.getAttribute("data-id");
        /// check for correct answer
        arrMyAnswers[curPage] = idAnswer;
        if (data.quizcontent[curPage].correctAnswer == idAnswer) {
            //console.log('Correct Answer');
        } else {
            //console.log('Wrong Answer');
        }
        addSelectedBox();
    }

    function addSelectedBox() {
        for (var i = 0; i < myQuestion.children.length; i++) {
            var curNode = myQuestion.children[i];
            if (arrMyAnswers[curPage] == (i + 1)) {
                curNode.classList.add("selAnswer");
            } else {
                curNode.classList.remove("selAnswer");
            }
        }
    }

    function moveNext() {
        ///check if an answer has been made
        if (arrMyAnswers[curPage]) {
            //console.log('okay to proceed');
            if (curPage < (lengthofobject - 1)) {
                curPage++;
                checkPage(curPage);
            } else {
                ///check if quiz is completed
                //console.log(curPage + ' ' + lengthofobject);
                if (lengthofobject >= curPage) {
                    finishQuiz();
                } else {
                    //console.log('end of quiz Page ' + curPage);
                }
            }
        } else {
            alert("Please select one answer before moving to next step.")
        }
    }

    function finishQuiz() {
        if (arrMyAnswers[(lengthofobject - 1)]) {
            var output = "<div class='output'>Quiz Results<BR>";
            var questionResult = "NA";
            //console.log('Quiz Over');
            for (var i = 0; i < arrMyAnswers.length; i++) {
                if (data.quizcontent[i].correctAnswer == arrMyAnswers[i]) {
                    questionResult = '<span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>';
                    correctAnswer++;
                } else {
                    questionResult = '<span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>';
                }
                output = output + '<p>Question ' + (i + 1) + ' ' + questionResult + '</p> ';
            }
            output = output + '<p>You scored ' + correctAnswer + ' out of ' + lengthofobject + '</p></div> ';
            document.getElementById("quizContent").innerHTML = output;
        } else {
            alert("Please answer to all questions before clicking Submit button.");
        }
    }

    function checkPage(i) {
        /// add remove disabled buttons if there are no more questions in que
        if (curPage == 0) {
            btnPrevious.classList.add("hide");
        } else {
            btnPrevious.classList.remove("hide");
        }
        if ((curPage + 1) < (lengthofobject)) {
            btnNext.classList.remove("hide");
        } else {
            btnNext.classList.add("hide");
            btnFinish.classList.remove("hide");
        }

        var myObj = data.quizcontent[curPage];
        console.log(myObj);
        myHeader.innerHTML = myObj.question;
        newimage.src = myObj.image;
        questionSection.innerHTML = "";
        var addSelClass = '';
        console.log(arrMyAnswers);
        console.log(curPage);
        console.log(arrMyAnswers[curPage]);
        for (var index in myObj.answers) {

            console.log(parseInt(index) + 1);
            if (arrMyAnswers[curPage] == (parseInt(index) + 1)) {
                addSelClass = "selAnswer";
            } else {
                addSelClass = "";
            }
            questionSection.innerHTML += '<div class="col-sm-6 ' + addSelClass + ' "> <a data-id="' + (parseInt(index) + 1) + '" class="btn btn-default answer ">' + myObj.answers[index] + '</a> </div>';

        }

        for (var i = 0; i < classname.length; i++) {
            classname[i].addEventListener('click', myAnswer, false);
        }

        ///update progress bar
        var increment = Math.ceil((curPage) / (lengthofobject) * 100);
        progressBar.style.width = (increment) + '%';
        progressBar.innerHTML = (increment) + '%';
    }

    function moveBack() {
        if (curPage > 0) {
            curPage--;
            checkPage(curPage);
        } else {
            //console.log('end of quiz Page ' + curPage);
        }
    }

    function capitalise(str) {
        return str.substr(0, 1).toUpperCase() + str.substr(1);
    }