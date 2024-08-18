/* eslint-disable react/prop-types */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const Header = ({ numberImages, indexTexture, duration }) => {
  return (
    <div className="absolute top-0 left-0 z-50 w-full h-16 text-white font-semibold pt-16 ">
      <div className="flex items-center justify-center gap-3">
        {Array.from({ length: numberImages }).map((_, index) => {
          return (
            <Step
              key={index}
              index={index}
              indexTexture={indexTexture}
              duration={duration}
            />
          );
        })}
      </div>
      <div className="mt-10 flex justify-center items-center gap-5">
        <div className="h-14 w-14 rounded-full overflow-hidden">
          <img className="w-full h-full object-cover" src="logo.webp" />
        </div>
        <div>
          <h1 className="text-2xl overflow-hidden relative w-80">
            <AnimatedText
              text={
                indexTexture === 0
                  ? "Preaching of john the baptist"
                  : "View haarlem haarlemmer"
              }
              key={indexTexture}
              duration={duration}
            ></AnimatedText>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Header;

const Step = ({ index, indexTexture, duration }) => {
  const el = useRef(null);
  useGSAP(() => {
    if (index === indexTexture) {
      gsap.to(el.current, {
        duration: duration / 2,
        scaleX: 1,
        ease: "power2.in",
      });
      gsap.set(el.current, {
        delay: duration / 2,
        transformOrigin: "right",
      });
      gsap.to(el.current, {
        duration: duration / 2,
        scaleX: 0,
        ease: "power2.out",
        delay: duration / 2,
        onComplete: () => {
          gsap.set(el.current, { scaleX: 0, transformOrigin: "left" });
        },
      });
    }
  }, [indexTexture]);

  return (
    <div className="relative w-20 h-[0.175rem]  bg-white rounded-full bg-opacity-75 overflow-hidden">
      <div
        ref={el}
        className="absolute top-0 left-0 w-full h-full bg-white rounded-full bg-opacity-100 scale-x-0 origin-left"
      ></div>
    </div>
  );
};

const AnimatedText = ({ text, duration }) => {
  const el = useRef(null);
  const splitedText = text.split("");
  useGSAP(
    () => {
      console.log("animation");
      gsap.from(".word", {
        yPercent: 100,
        ease: "power1.out",
        stagger: {
          each: 0.01,
        },
      });
      gsap.to(".word", {
        yPercent: -100,
        ease: "power1.out",
        delay: duration / 2,
        stagger: {
          each: 0.01,
        },
      });
    },
    { scope: el },
    [text]
  );

  return (
    <div ref={el} className="flex ">
      {splitedText.map((word, index) => {
        return (
          <span key={index} className="inline-block relative word">
            {word === " " ? "\u00A0" : word}
          </span>
        );
      })}
    </div>
  );
};
