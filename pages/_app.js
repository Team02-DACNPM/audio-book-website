import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-image-gallery/styles/css/image-gallery.css";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/Store";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <ToastContainer />
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
