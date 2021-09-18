import styles from "@/styles/style.module.scss";
import {} from "react-icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getMovie } from "@/redux/actions/movies";

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const { movie } = useSelector((state) => state.Movies);
  useEffect(() => {
    if (!movie) {
      dispatch(getMovie(item));
    }
  }, [movie]);

  return (
    // <Link href={{pathname: "/watch", movie: movie}}>

    // </Link>
    <div></div>
  );
}
