import gsap from "gsap";
import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";

export const TweenEasing = () => {
  const ref = useRef();

  useLayoutEffect(() => {
    gsap.to(ref.current, { x: 100, y: 100, duration: 1, ease: "bounce.out" });
  }, []);

  return <Circle ref={ref} />;
};

const Circle = styled.div`
  width: 3rem;
  aspect-ratio: 1;
  background-color: #343a40;
  border-radius: 50%;
`;
