"use client";

import { Area, Block, RText, Section } from "@/lib/by/Div";
import { map } from "lodash";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import clsx from "clsx";
import Loader from "@/components/Loading";
import { useState } from "react";

interface QuizRenderProps {
  questions: QuizQuestion[];
  currentQuestion: number;
  selectedOption: number | null;
  onOptionSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  answers: { questionId: string; selectedOption: number }[];
}

export default function QuizRender({
  questions,
  currentQuestion,
  selectedOption,
  onOptionSelect,
  onPrev,
  onNext,
  onSubmit,
  answers,
}: QuizRenderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (
    !questions ||
    !Array.isArray(questions) ||
    questions.length === 0 ||
    !questions[currentQuestion]
  ) {
    return <Loader />;
  }

  return (
    <Area className="relative min-h-screen bg-white text-slate-800 px-6 py-4">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <Section className="fixed inset-0 z-40 bg-gradient-to-r from-black/60 to-black/20">
            <Block
              className="absolute inset-0"
              onClick={() => setIsSidebarOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[70vw] max-w-md bg-gradient-to-r from-white to-slate-100 shadow-2xl z-50 overflow-y-auto p-6"
            >
              <RText className="text-xl font-bold mb-4">
                Danh sách câu hỏi
              </RText>
              <Block className="grid grid-cols-2 gap-3">
                {map(questions, (q, index) => {
                  const answered = answers.find((a) => a.questionId === q.id);
                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setIsSidebarOpen(false);
                        if (index !== currentQuestion) {
                          onNext(); // trick để render lại effect
                        }
                      }}
                      className={clsx(
                        "rounded-md border px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-all",
                        answered
                          ? "bg-rose-100 border-rose-300 text-pink-700 font-semibold"
                          : "border-slate-300"
                      )}
                    >
                      Câu {index + 1}
                    </button>
                  );
                })}
              </Block>
            </motion.div>
          </Section>
        )}
      </AnimatePresence>

      {/* Header */}
      <Section className="flex justify-between items-center mb-6">
        <RText className="text-lg font-medium text-slate-500">
          {currentQuestion + 1} / {questions.length}
        </RText>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-md font-semibold text-slate-700"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="w-5 h-5" />
          Menu
        </button>
      </Section>

      {/* Title + Question */}
      <Section className="text-center mb-8">
        <RText className="text-3xl font-bold text-red-500">Glow & Know</RText>
        <RText className="mt-4 text-xl font-semibold text-slate-700">
          {questions[currentQuestion].content}
        </RText>
      </Section>

      {/* Options */}
      <Section className="grid gap-4 max-w-xl mx-auto mb-10">
        {questions[currentQuestion].questionOptions.map((opt, index) => (
          <button
            key={index}
            className={clsx(
              "w-full text-center py-4 px-4 rounded-xl shadow-sm border text-base font-medium",
              selectedOption === index
                ? "bg-rose-100 border-pink-500 text-pink-700"
                : "bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100"
            )}
            onClick={() => onOptionSelect(index)}
          >
            {opt.content}
          </button>
        ))}
      </Section>

      {/* Navigation */}
      <Section className="flex justify-between max-w-xl mx-auto mb-6">
        <button
          onClick={onPrev}
          disabled={currentQuestion === 0}
          className="flex items-center gap-2 px-5 py-3 bg-slate-100 rounded-lg font-semibold text-slate-700 disabled:opacity-50"
        >
          <ChevronLeft size={20} />
          Prev
        </button>

        <button
          onClick={onNext}
          disabled={currentQuestion === questions.length - 1}
          className="flex items-center gap-2 px-5 py-3 bg-slate-100 rounded-lg font-semibold text-slate-700 disabled:opacity-50"
        >
          Next
          <ChevronRight size={20} />
        </button>
      </Section>

      {/* Submit */}
      <Section className="max-w-xl mx-auto">
        <button
          onClick={onSubmit}
          className="w-full py-4 bg-green-500 text-white font-bold rounded-xl shadow hover:bg-green-600 transition"
        >
          Submit
        </button>
      </Section>
    </Area>
  );
}
