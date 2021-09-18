import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import ListItem from "./ListItems";
import styles from "@/styles/style.module.scss";
import { useState, useRef } from "react";

export default function List({ list }) {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);

  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 10 - clickLimit) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

  const {
    list,
    list__listTitle,
    list__sliderArrow,
    list__wrapper,
    list__container,
  } = styles;

  return (
    <div className={list}>
      <span className={list__listTitle}>{list.title}</span>
      <div className={list__wrapper}>
        <AiOutlineArrowLeft
          className={`${list__sliderArrow} left`}
          onClick={handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />

        <div className={list__container} ref={listRef}>
          {list.content.map((item, i) => (
            <ListItem index={i} item={item} />
          ))}
        </div>
        <AiOutlineArrowRight
          className={`${list__sliderArrow} right`}
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}
