import gsap from "gsap";
import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";

export const TweenControl = () => {
  const ref = useRef();
  const animation = useRef();

  useLayoutEffect(() => {
    animation.current = gsap.to(ref.current, {
      rotation: 360,
      x: 500,
      duration: 4,
      paused: true,
      ease: "power2.in",
    });
  }, []);

  return (
    <>
      <Cube ref={ref} />
      <ButtonContainer>
        <Button onClick={() => animation.current.play()}>Play</Button>
        <Button onClick={() => animation.current.pause()}>Pause</Button>
        <Button onClick={() => animation.current.resume()}>Resume</Button>
        <Button onClick={() => animation.current.reverse()}>Reverse</Button>
        <Button onClick={() => animation.current.restart()}>Restart</Button>
      </ButtonContainer>
    </>
  );
};

const Cube = styled.div`
  width: 3rem;
  aspect-ratio: 1;
  background-color: #343a40;
  position: relative;
  left: 50%;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
`;

const Button = styled.button`
  padding: 0.8rem 1.6rem;
  border-radius: 1.6rem;
  border: 1px solid #dee2e6;
  cursor: pointer;
  background-color: white;
`;
