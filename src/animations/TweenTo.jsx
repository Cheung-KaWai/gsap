import gsap from "gsap";
import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";

export const TweenTo = () => {
  const ref = useRef();
  useLayoutEffect(() => {
    gsap.to(ref.current, {
      x: 500,
      backgroundColor: "#ced4da",
      rotation: 360,
      scale: 3,
      borderRadius: "50%",
      duration: 2,
    });
  }, []);

  return <Cube ref={ref} />;
};

const Cube = styled.div`
  width: 3rem;
  aspect-ratio: 1;
  background-color: #343a40;
`;
