'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { questions } from './question';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Progress } from '../components/ui/progress';

export default function Test1() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();
  const progressValue = ((currentQuestion + 1) / questions.length) * 100;

  //사용자가 녹음을 차단시키면 바로 선택지 노출 시킬것

  //녹음 시작
  const startListening = () => {
    if (
      !('webkitSpeechRecognition' in window) &&
      !('SpeechRecognition' in window)
    ) {
      console.log('Web Speech API is not supported by this browser.');
      return;
    }

    const SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR'; // 언어 설정
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    let permissionTimeout = setTimeout(() => {
      console.error('수락 거부 두개 다 안누름');
      setIsRecording(false);
    }, 3000); //3초 후 권한이 거부된 것으로 간주

    recognition.onstart = () => {
      clearTimeout(permissionTimeout);
      setIsRecording(true);
      console.log('Listening...');
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript: string = event.results[0][0].transcript;
      console.log('Transcript:', transcript);
      setIsRecording(false);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  useEffect(() => {
    const savedOption = localStorage.getItem(`question-${currentQuestion}`);
    if (savedOption !== null) {
      setSelectedOption(parseInt(savedOption, 10));
    } else {
      setSelectedOption(null);
    }
    // const newAudio = new Audio(`/audio/question-${currentQuestion}.mp3`);  //추후 질문마다 녹음파일 적용.
    const newAudio = new Audio(`/audio/question-0.mp3`);
    audioRef.current = newAudio;

    const handleCanPlayThrough = () => {
      newAudio.play();
      startListening(); // 녹음시작 , 사용자가 텍스트를 읽고 바로 녹음을 시작할 경우를 대비하여 바로 시작
      setIsPlaying(true);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    newAudio.addEventListener('canplaythrough', handleCanPlayThrough);
    newAudio.addEventListener('ended', handleEnded);
    newAudio.addEventListener('pause', handlePause);

    return () => {
      newAudio.removeEventListener('canplaythrough', handleCanPlayThrough);
      newAudio.removeEventListener('ended', handleEnded);
      newAudio.removeEventListener('pause', handlePause);
      newAudio.pause();
      newAudio.currentTime = 0;
    };
    // }
  }, [currentQuestion]);

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
        <Progress value={progressValue} />
        <div className="font-semibold text-lg text-cyan-900 mt-[5vh]">
          <span>{questions[currentQuestion].question}</span>
        </div>
        <div className="mt-7 flex justify-center">
          <div
            className={`relative w-52  h-52 ${
              isPlaying || isRecording ? 'animate-scale' : ''
            }`}
          >
            <Image
              src="/test/talking.gif"
              layout="fill"
              objectFit="cover"
              alt="Animated"
            />
          </div>
        </div>
        <div className="mt-24 flex justify-between items-center font-semibold text-cyan-900">
          <span>전혀 아니다</span>
          <span>보통</span>
          <span>매우 그렇다</span>
        </div>
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
