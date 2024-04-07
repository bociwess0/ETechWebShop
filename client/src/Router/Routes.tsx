import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Products from "../Pages/Products";
import Cart from "../Pages/Cart";
import CartProducts from "../Components/Cart/CartProducts/CartProducts";
import Address from "../Components/Cart/Address/Address";
import CheckoutInfo from "../Components/Cart/CheckoutInfo/CheckoutInfo";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'products', element: <Products /> },
            { 
                path: 'cart',
                element: <Cart /> , 
                children: [
                    {path: "productsInCart", element: <CartProducts /> },
                    {path: "address", element: <Address /> },
                    {path: "checkout", element: <CheckoutInfo /> }
                ]
            },
        
        ]
    }
])