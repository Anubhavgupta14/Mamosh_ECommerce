
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store";
import "../styles/home/home.css"
import "../styles/navbar/navbar.css"
import "../styles/detail.css"
import "../styles/cart.css"
import "../styles/categories/categories.css"
import "../styles/categories/modal.css"
import "../styles/collection/detail.css"
import "../styles/collection/footer.css"
import "../styles/collection/main.css"
import "../styles/collection/sidenav.css"
import "../styles/common/Table.module.css"
import "../styles/home/home.css"
import "../styles/home/video.css"
import "../styles/invoice/dashboard.css"
import "../styles/invoice/detail.css"
import "../styles/address.css"
import "../styles/categoryloader.css"
import "../styles/Chart.module.css"
import "../styles/checkout.css"
import "../styles/construct.css"
import "../styles/dashboard.css"
import "../styles/detail.css"
import "../styles/finalpriceloader.css"
import "../styles/finalpriceloader2.css"
import "../styles/footer.css"
import "../styles/homeloader.css"
import "../styles/loader.css"
import "../styles/loaderproduct.css"
import "../styles/login.css"
import "../styles/main.css"
import "../styles/success.css"
import "../styles/admin/addProduct/popup.css"
import "../styles/admin/addProduct/product.css"
import "../styles/admin/addProduct/variant.css"
import "../styles/admin/chat/chat.css"
import "../styles/admin/mail/mail.css"
import "../styles/admin/menu/menu.css"
import "../styles/admin/products/products.css"
import "../styles/admin/setting/settings.css"
import "../styles/admin/admin.css"
import "../styles/global.css";
import "../styles/invoice/invoice.css"
import "../styles/pro.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <React.StrictMode> */}
        <Component {...pageProps} />
        {/* </React.StrictMode> */}
      </PersistGate>
    </Provider>
  );
}
