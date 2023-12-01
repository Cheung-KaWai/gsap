import gsap from "gsap";
import { MotionPathPlugin } from "gsap/all";
import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
gsap.registerPlugin(MotionPathPlugin);
export const MotionPath = () => {
  const cube = useRef();
  const path = useRef();

  useLayoutEffect(() => {
    gsap.to(cube.current, {
      duration: 5,
      repeat: 12,
      motionPath: {
        path: path.current,
        align: path.current,
        autoRotate: true,
        alignOrigin: [0.5, 0.5],
      },
    });
  }, []);

  return (
    <>
      <Cube ref={cube} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
        width={200}
      >
        <path
          ref={path}
          stroke-width="0.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    </>
  );
};

const Cube = styled.div`
  width: 2rem;
  aspect-ratio: 1;
  background-color: #343a40;
  position: relative;
  left: 50%;
  border-radius: 4px;
  transform: translateX(-50%);
`;
