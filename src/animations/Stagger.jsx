import gsap, { Bounce } from "gsap";
import React, { useLayoutEffect } from "react";
import styled from "styled-components";

const Circle = styled.div`
  width: 3rem;
  aspect-ratio: 1;
  background-color: #343a40;
  border-radius: 50%;
  margin-right: 1rem;
`;

const elements = Array(15)
  .fill(0)
  .map((_, i) => (
    <Circle
      key={i}
      className="stagger"
    />
  ));

export const Stagger = () => {
  useLayoutEffect(() => {
    gsap.to(".stagger", { y: 100, duration: 2, stagger: 0.1, ease: "steps(10)" });
  }, []);

  return <>{...elements}</>;
};
