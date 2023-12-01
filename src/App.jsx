import styled from "styled-components";

import React, { useLayoutEffect, useRef, useState } from "react";
import { CodeBlock, monoBlue } from "react-code-blocks";
import { codeSnippets } from "./data/data";
import { TweenTo } from "./animations/TweenTo";
import { TweenEasing } from "./animations/TweenEasing";
import { Stagger } from "./animations/Stagger";
import { TimeLine } from "./animations/TimeLine";
import gsap from "gsap";
import { TweenControl } from "./animations/TweenControl";
import { FlipPlugin } from "./animations/FlipPlugin";
import { Start } from "./animations/Start";
import { MotionPath } from "./animations/MotionPath";

const animations = {
  Start,
  TweenTo,
  TweenEasing,
  TweenControl,
  Stagger,
  TimeLine,
  MotionPath,
  FlipPlugin,
};

function App() {
  const [current, setCurrent] = useState("Start");
  const CurrentAnimation = animations[current];
  const el = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".menuItem", {
        x: -300,
        duration: 1,
        stagger: 0.3,
        ease: "back.out(1)",
      });
    }, el);
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <Content>
      <Navigation>
        <List ref={el}>
          {Object.keys(codeSnippets).map((x, key) => (
            <MenuItem
              className="menuItem"
              key={key}
              onClick={() => setCurrent(x)}
            >
              {x}
            </MenuItem>
          ))}
        </List>
      </Navigation>
      <CanvasContainer>
        <CurrentAnimation />
      </CanvasContainer>
      <Code>
        <CodeBlock
          text={codeSnippets[current]}
          language="jsx"
          showLineNumbers={true}
          theme={monoBlue}
        />
      </Code>
    </Content>
  );
}

export default App;

const MenuItem = styled.li``;

const Navigation = styled.nav`
  height: 100%;
  width: 20rem;
  background-color: #eaeef2;
  border-radius: 1rem;
  padding: 2rem;
  grid-area: menu;
  border: 1px solid #dee2e6;
`;

const List = styled.ul`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  overflow: hidden;
`;

const CanvasContainer = styled.div`
  background-color: blue;
  grid-area: canvas;
  background-color: #eaeef2;
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  align-items: center;
  position: relative;
  border: 1px solid #dee2e6;
`;

const Code = styled.div`
  grid-area: codeblock;
  background-color: #eaeef2;
  border-radius: 1rem;
  padding: 2rem;
  border-radius: 1px solid;
  overflow-y: scroll;
  border: 1px solid #dee2e6;
`;

const Content = styled.main`
  position: relative;
  width: 100svw;
  height: 100svh;
  background-color: #f1f3f5;
  padding: 1.6rem;
  display: grid;
  grid-template-columns: 20rem 1fr;
  grid-template-rows: 26rem 1fr;
  grid-gap: 1.6rem;
  grid-template-areas:
    "menu canvas"
    "menu codeblock";
`;
