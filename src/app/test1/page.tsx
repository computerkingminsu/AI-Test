'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { questions } from './question';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Progress } from '../components/ui/progress';

export default function Test1() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const router = useRouter();
  const progressValue = ((currentQuestion + 1) / questions.length) * 100;

  useEffect(() => {
    const savedOption = localStorage.getItem(`question-${currentQuestion}`);
    if (savedOption !== null) {
      setSelectedOption(parseInt(savedOption, 10));
    } else {
      setSelectedOption(null);
    }
  }, [currentQuestion]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
  };

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
    localStorage.setItem(`question-${currentQuestion}`, index.toString());
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };
  const handlePreviousQuestion = () => {
    if (currentQuestion === 0) {
      router.push('/');
    } else {
      setCurrentQuestion((prev) => prev - 1);
    }
  };
  const handleSubmit = () => {
    console.log('제출');
  };

  return (
    <>
      <div className="px-10 mt-[5vh] ">
        {/* 진행 프로그레스 바 */}
        <Progress value={progressValue} />
        {/* 질문 */}
        <div className="font-semibold text-lg text-cyan-900 mt-[5vh]">
          <span>{questions[currentQuestion].question}</span>
        </div>
        {/* 음성 대화 gif , 현재는 마우스 올렸을때 gif 실행 */}
        <div className="mt-7 flex justify-center">
          <div
            className="relative w-64 h-64"
            onMouseEnter={handlePlay}
            onMouseLeave={handleStop}
          >
            {/*  이거는 정지  or  움직임 */}
            {/* {isPlaying ? (
              <Image
                src="/test/talking.gif"
                layout="fill"
                objectFit="cover"
                alt="Animated"
              />
            ) : (
              <Image
                src="/test/talking.png"
                layout="fill"
                objectFit="cover"
                alt="Static"
              />
            )} */}
            {/*  이건 디폴트로 움직이고 말하고 있을때 스케일 업다운 */}
            <div
              className={`relative w-64 h-64 ${
                isPlaying ? 'animate-scale' : ''
              }`}
              onMouseEnter={handlePlay}
              onMouseLeave={handleStop}
            >
              <Image
                src="/test/talking.gif"
                layout="fill"
                objectFit="cover"
                alt="Animated"
              />
            </div>
          </div>
        </div>
        {/* 사용자의 음성인식이 실패했을때 나올예정. 현재는 일단 나오게 함. */}
        <div className="mt-10 flex justify-between items-center font-semibold text-cyan-900">
          <span>전혀 아니다</span>
          <span>보통</span>
          <span>매우 그렇다</span>
        </div>
        {/* 선택 동그라미 */}
        <div className="mt-5 flex justify-between space-x-4 items-center relative">
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className={`w-12 h-12 rounded-full cursor-pointer transition-all ${
                selectedOption === index
                  ? 'bg-gradient-to-t from-[#6cd9e7] to-[#7af8dd]'
                  : 'border-2 border-[#6cd9e7]'
              }`}
              onMouseEnter={(e) =>
                e.currentTarget.classList.add(
                  'bg-gradient-to-t',
                  'from-[#6cd9e7]',
                  'to-[#7af8dd]',
                )
              }
              onMouseLeave={(e) => {
                if (selectedOption !== index) {
                  e.currentTarget.classList.remove(
                    'bg-gradient-to-t',
                    'from-[#6cd9e7]',
                    'to-[#7af8dd]',
                  );
                }
              }}
              onClick={() => handleOptionClick(index)}
            ></div>
          ))}
        </div>
        {/* 이전, 다음 버튼 */}
        <div className="mt-24 flex justify-between font-semibold">
          <button
            className="w-40 h-12 bg-white border-2 border-[#6cd9e7] text-cyan-800 rounded-full"
            onClick={handlePreviousQuestion}
          >
            이전
          </button>
          {currentQuestion === questions.length - 1 ? (
            <Link href="/test1/result">
              <button
                className={`w-40 h-12 ${
                  selectedOption !== null ? 'bg-[#6cd9e7]' : 'bg-[#bff0f5]'
                } text-white rounded-full`}
                onClick={handleSubmit}
                disabled={selectedOption === null}
              >
                <span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]">
                  제출
                </span>
              </button>
            </Link>
          ) : (
            <button
              className={`w-40 h-12 ${
                selectedOption !== null ? 'bg-[#6cd9e7]' : 'bg-[#bff0f5]'
              } text-white rounded-full`}
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
            >
              <span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]">
                다음
              </span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
