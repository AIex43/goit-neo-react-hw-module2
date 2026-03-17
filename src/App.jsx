import { useState, useEffect } from "react";
import Description from "./components/Description/Description";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";

const STORAGE_KEY = "feedback-data";

export default function App() {
  // 🔹 ініціалізація з localStorage
  const [feedback, setFeedback] = useState(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData !== null) {
      return JSON.parse(savedData);
    }

    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  });

  // 🔹 збереження в localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feedback));
  }, [feedback]);

  // 🔹 оновлення фідбеку
  const updateFeedback = feedbackType => {
    setFeedback(prevState => ({
      ...prevState,
      [feedbackType]: prevState[feedbackType] + 1,
    }));
  };

  // 🔹 reset
  const resetFeedback = () => {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  // 🔹 обчислення
  const totalFeedback =
    feedback.good + feedback.neutral + feedback.bad;

  const positiveFeedback =
    totalFeedback > 0
      ? Math.round((feedback.good / totalFeedback) * 100)
      : 0;

  return (
    <div>
      <Description />

      <Options
        updateFeedback={updateFeedback}
        resetFeedback={resetFeedback}
        totalFeedback={totalFeedback}
      />

      {totalFeedback > 0 ? (
        <Feedback
          good={feedback.good}
          neutral={feedback.neutral}
          bad={feedback.bad}
          total={totalFeedback}
          positive={positiveFeedback}
        />
      ) : (
        <Notification message="No feedback yet" />
      )}
    </div>
  );
}