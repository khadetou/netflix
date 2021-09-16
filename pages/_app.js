import "../styles/globals.scss";
import { wrapper } from "@/redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer position="top-center" />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
