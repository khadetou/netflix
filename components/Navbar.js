import { FiChevronDown } from "react-icons/fi";
import { MdNotificationsNone, MdSearch } from "react-icons/md";
import { useState, useEffect } from "react";
import styles from "@/styles/style.module.scss";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/client";

const Navbar = () => {
  const {
    navbar,
    navbar__scrolled,
    navbar__container,
    navbar__left,
    navbar__icon,
    navbar__profile,
    navbar__options,
    navbar__right,
    navbar__img,
  } = styles;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
    };
  }, []);

  return (
    <div className={isScrolled ? `${navbar} ${navbar__scrolled}` : `${navbar}`}>
      <div className={navbar__container}>
        <div className={navbar__left}>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
            width={111}
            height={30}
            className={navbar__img}
          />
          <Link href="/">
            <span className="link">Homepage</span>
          </Link>
          <Link href="/series">
            <span className="navbarmainLinks">Series</span>
          </Link>
          <Link href="/movies">
            <span className="navbarmainLinks">Movies</span>
          </Link>
          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className={navbar__right}>
          <MdSearch className={navbar__icon} />
          <span>KID</span>
          <MdNotificationsNone className={navbar__icon} />
          <Image
            src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            width={30}
            height={30}
            objectFit="cover"
          />
          <div className={navbar__profile}>
            <FiChevronDown className={navbar__icon} />
            <div className={navbar__options}>
              <span>Settings</span>
              <span onClick={() => signOut()}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
