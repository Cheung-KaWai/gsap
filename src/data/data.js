export const codeSnippets = {
  TweenTo: `export const TweenTo = () => {
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
  };`,
  TweenEasing: `export const TweenEasing = () => {
    const ref = useRef();

    useLayoutEffect(() => {
      gsap.to(ref.current, { x: 100, y: 100, duration: 1, ease: "bounce.out" });
    }, []);

    return <Circle ref={ref} />;
  };`,
  TweenControl: `export const TweenControl = () => {
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
  };`,
  Stagger: `export const elements = Array(15).fill(0).map((_, i) => (
    <Circle key={i} className="stagger"/>
  ));

  export const Stagger = () => {
    useLayoutEffect(() => {
      gsap.to(".stagger", { y: 100, duration: 2, stagger: 0.1, ease: "steps(10)" });
    }, []);

    return <>{...elements}</>;
  };`,
  TimeLine: `export const TimeLine = () => {
    const el = useRef();
    const tl = useRef();
  
    useLayoutEffect(() => {
      const ctx = gsap.context(() => {
        tl.current = gsap
          .timeline()
          .to(el.current, { x: 50, y: -50 })
          .to(el.current, { x: 50  y: 50 })
          .to(el.current, { x: -50 y: -50 })
          .to(el.current, { x: 50 y: 50 })
          .to(el.current, { rotation: 360, borderRadius: "50%", scale: 0, duration: 1})  
          .to(el.current, { scale: 2,ease: "elastic.out(2,0.3)", duration: 1.5,});
      }, el);
  
      return () => {
        ctx.revert();
      };
    }, []);
  
    return <Cube ref={el} />;
  };`,
  MotionPath: `gsap.registerPlugin(MotionPathPlugin);
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
  };`,
  FlipPlugin: `gsap.registerPlugin(Flip);

  const data = ["#343a40", "#343a40", "#5e6876", "#5e6876", "#343a40", "#5e6876", "#343a40", "#343a40", "#343a40", "#5e6876", "#343a40", "#5e6876", "#5e6876", "#5e6876", "#343a40"];
  
  export const FlipPlugin = () => {
    const [filters, setFilters] = useState(["#343a40", "#5e6876"]);
    const elements = useRef([]);
  
    const setRefs = (e, i) => {
      const { current } = elements;
      current[i] = e;
    };
  
    useEffect(() => {
      // 1) returns a state object containing data about the elements' current position/size/rotation in the viewport
      const state = Flip.getState(elements.current);
  
      // 2) make state changes example filtering
      elements.current.forEach((el) => {
        el.style.display = el.getAttribute("display") === "true" ? "block" : "none";
      });
  
      // 3) call Flip.from method, compares state object and current positions and animates the offsets
      Flip.from(state, {
        duration: 1,
        ease: "power1.inOut",
        absolute: true,
        onEnter: (elements) => gsap.fromTo(elements, { opacity: 0, scale: 0, borderRadius: "50%" }, { opacity: 1, scale: 1, borderRadius: "4px", duration: 1 }),
        onLeave: (elements) => gsap.to(elements, { opacity: 0, scale: 0, borderRadius: "50%", duration: 1 }),
      });
    }, [filters]);
  
    return (
      <>
        <GridContainer>
          {data.map((color, index) => (
            <GridItem
              key={index}
              className="gridItem"
              $bgColor={color}
              display={filters.includes(color).toString()}
              ref={(el) => setRefs(el, index)}
            />
          ))}
        </GridContainer>
        <FilterContainer>
          <Button onClick={() => setFilters((prev) => toggleElement(prev, "#343a40"))}>#343a40</Button>
          <Button onClick={() => setFilters((prev) => toggleElement(prev, "#5e6876"))}> #5e6876</Button>
        </FilterContainer>
      </>
    );
  };`,
};
