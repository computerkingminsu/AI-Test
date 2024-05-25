import CircularProgress from '@mui/material/CircularProgress';
import * as React from 'react';

export default function Test1Result() {
  return (
    <>
      <div className="flex items-center justify-center w-full h-screen relative">
        <div className="text-white flex flex-col items-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.4)]">
          <CircularProgress color="inherit" size={80} />
          <span className="text-2xl text-center mt-10 ">
            분석 중입니다...
            <br />
            잠시만 기다려 주세요.
          </span>
        </div>
        <div className="absolute bottom-[3vh] text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.4)] ">
          @FelisCatus57
        </div>
      </div>
    </>
  );
}
