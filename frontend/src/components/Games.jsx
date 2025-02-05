import React, { useState, useEffect } from "react";
import { Timer, Bug, Brain, Trophy } from "lucide-react";

const questions = {
  codeSprint: {
    beginner: [
      {
        question: "What will be the output of: console.log(2 + '2')?",
        options: ["4", "22", "NaN", "Error"],
        correct: 1,
        explanation:
          "JavaScript concatenates the number with string, resulting in '22'",
      },
      {
        question: "Which method adds an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correct: 0,
        explanation: "push() adds elements to the end of an array",
      },
    ],
    intermediate: [
      {
        question: "What is the time complexity of Array.prototype.map()?",
        options: ["O(1)", "O(n)", "O(n log n)", "O(n²)"],
        correct: 1,
        explanation: "map() needs to visit each element once, making it O(n)",
      },
    ],
  },
  debugQuest: {
    beginner: [
      {
        code: `function sum(arr) {
  let total = 0;
  for (let i = 0; i <= arr.length; i++) {
    total += arr[i];
  }
  return total;
}`,
        question: "Why does this function return NaN for sum([1,2,3])?",
        options: [
          "The loop condition should be i < arr.length",
          "total should be initialized to null",
          "The += operator is wrong",
          "The function name is invalid",
        ],
        correct: 0,
        explanation:
          "The loop runs one extra time, trying to access arr[3] which is undefined",
      },
    ],
  },
  logicPuzzle: {
    beginner: [
      {
        question: "Complete the sequence: 2, 4, 8, 16, __",
        options: ["20", "24", "32", "64"],
        correct: 2,
        explanation: "Each number is doubled to get the next number",
      },
    ],
  },
};

const timeLimits = {
  beginner: 30,
  intermediate: 45,
  advanced: 60,
};

const GameMode = {
  CODE_SPRINT: "codeSprint",
  DEBUG_QUEST: "debugQuest",
  LOGIC_PUZZLE: "logicPuzzle",
};

const CodingQuizGame = () => {
  const [gameMode, setGameMode] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameState, setGameState] = useState("menu");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    let timer;
    if (gameState === "playing" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const startGame = (mode, diff) => {
    if (!questions[mode] || !questions[mode][diff]) {
      console.error(`Invalid game mode or difficulty: ${mode}, ${diff}`);
      return;
    }
    setGameMode(mode);
    setDifficulty(diff);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(timeLimits[diff]);
    setGameState("playing");
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleAnswer = (answerIndex) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    const currentQuestionData =
      questions[gameMode][difficulty][currentQuestion];

    if (answerIndex === currentQuestionData.correct) {
      setScore((prev) => prev + 1);
    }

    setShowExplanation(true);

    setTimeout(() => {
      if (currentQuestion + 1 < questions[gameMode][difficulty].length) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setTimeLeft(timeLimits[difficulty]);
      } else {
        setGameState("finished");
      }
    }, 2000);
  };

  const getModeIcon = (mode) => {
    switch (mode) {
      case GameMode.CODE_SPRINT:
        return <Timer className="w-6 h-6" />;
      case GameMode.DEBUG_QUEST:
        return <Bug className="w-6 h-6" />;
      case GameMode.LOGIC_PUZZLE:
        return <Brain className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const renderMenu = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.values(GameMode).map((mode) => (
          <div
            key={mode}
            className="cursor-pointer hover:bg-gray-50 p-4 border rounded shadow"
            onClick={() => setGameState("difficulty")}
          >
            <div className="flex items-center gap-2">
              {getModeIcon(mode)}
              {mode.replace(/([A-Z])/g, " $1").trim()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  const renderDifficultySelect = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Select Difficulty</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.keys(timeLimits).map((diff) => (
          <div
            key={diff}
            className="cursor-pointer hover:bg-gray-50 p-4 border rounded shadow"
            onClick={() => startGame(gameMode, diff)} // start the game with selected mode and difficulty
          >
            <div className="capitalize">{diff}</div>
            <div>Time limit: {timeLimits[diff]}s</div>
          </div>
        ))}
      </div>
    </div>
  );
  
  

  const renderQuestion = () => {
    const currentQuestionData =
      questions[gameMode][difficulty][currentQuestion];

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            Question {currentQuestion + 1}/
            {questions[gameMode][difficulty].length}
          </div>
          <div>Time left: {timeLeft}s</div>
        </div>

        <div className="p-4 border rounded shadow">
          <div>{currentQuestionData.question}</div>
          {currentQuestionData.code && (
            <pre className="bg-gray-100 p-4 rounded mb-4 overflow-x-auto">
              <code>{currentQuestionData.code}</code>
            </pre>
          )}
          <div className="grid grid-cols-1 gap-4">
            {currentQuestionData.options.map((option, index) => (
              <button
                key={index}
                className={`btn ${
                  selectedAnswer === null
                    ? "outline"
                    : index === currentQuestionData.correct
                    ? "success"
                    : selectedAnswer === index
                    ? "destructive"
                    : "outline"
                }`}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>
          {showExplanation && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-700">{currentQuestionData.explanation}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderGameOver = () => (
    <div className="p-4 border rounded shadow">
      <div className="flex items-center gap-2">
        <Trophy className="w-6 h-6" />
        Game Over!
      </div>
      <p className="text-lg mb-4">
        Final Score: {score}/{questions[gameMode][difficulty].length}
      </p>
      <button onClick={() => setGameState("menu")} className="btn">
        Play Again
      </button>
    </div>
  );
  const renderContent = () => {
    switch (gameState) {
      case "menu":
        return renderMenu();
      case "playing":
        return renderQuestion();
      case "finished":
        return renderGameOver();
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Coding Quiz Game</h1>
      {renderContent()}
    </div>
  );
};

export default CodingQuizGame;
