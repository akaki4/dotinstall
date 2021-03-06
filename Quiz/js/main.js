"use strict";

{
  const question = document.getElementById("question");
  const choices = document.getElementById("choices");
  const btn = document.getElementById("btn");
  const result = document.getElementById("result");
  const scoreLabel = document.querySelector("#result > p");

  const quizSet = shuffle([
    {
      q: "世界で一番大きな湖は？",
      c: ["カスピ海", "カリブ海", "琵琶湖", "五大湖"],
    },
    { q: "2の8乗は？", c: ["256", "64", "1024", "32"] },
    {
      q: "センター試験はいつ？",
      c: ["1月15日", "1月20日", "2月10日", "2月15日"],
    },
    {
      q: "バスケの神様は？",
      c: ["マイケルジョーダン", "マジックジョンソン", "桜木花道", "レイアレン"],
    },
    {
      q: "次のうち、最初にリリースされた言語は？",
      c: ["Python", "JavaScript", "HTML", "C#"],
    },
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;
    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add("correct");
      score++;
    } else {
      li.classList.add("wrong");
    }
    btn.classList.remove("disabled");
  }

  function setQuiz() {
    isAnswered = false;
    question.textContent = quizSet[currentNum].q;

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = "Show Score";
    }
  }

  setQuiz();

  btn.addEventListener("click", () => {
    if (btn.classList.contains("disabled")) {
      return;
    }
    btn.classList.add("disabled");

    if (currentNum === quizSet.length - 1) {
      result.classList.remove("hidden");
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
    } else {
      currentNum++;
      setQuiz();
    }
  });
}
