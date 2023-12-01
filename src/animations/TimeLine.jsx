import gsap, { Bounce } from "gsap";
import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";

export const TimeLine = () => {
  const el = useRef();
  const tl = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline()
        .to(el.current, {
          x: 50,
          y: -50,
        })
        .to(el.current, {
          x: 50,
          y: 50,
        })
        .to(el.current, {
          x: -50,
          y: 50,
        })
        .to(el.current, {
          x: -50,
          y: -50,
        })
        .to(el.current, {
          x: 0,
          y: 0,
        })
        .to(el.current, {
          rotation: 360,
          borderRadius: "50%",
          scale: 0,
          duration: 1,
        })
        .to(el.current, {
          scale: 2,
          ease: "elastic.out(2,0.3)",
          duration: 1.5,
        });
    }, el);

    return () => {
      ctx.revert();
    };
  }, []);

  return <Cube ref={el} />;
};

const Cube = styled.div`
  width: 3rem;
  aspect-ratio: 1;
  background-color: #343a40;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;
