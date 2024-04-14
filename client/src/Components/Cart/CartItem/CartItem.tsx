import { useDispatch } from "react-redux";
import productImage from "../../../Assets/headphones.webp";
import { Product } from "../../../Interfaces/Interface";
import classes from './CartItem.module.css';
import { removeFromCart } from "../../../Redux/cartSlice";
import { removeFromCartDB } from "../../../DatabaseRequests/Requests";
import ChooseQuantity from "../../Product/ChooseQuantity/ChooseQuantity";

interface Props {
    product: Product;
}

function CartItem({product}: Props) {

    const dispatch = useDispatch();

    const removeFromCartHandler = () => {
        removeFromCartDB(product.id, product.quantity);
        dispatch(removeFromCart({item: product}));
    }

    return(
        <div className={classes.cartItem}>
            <div className={classes.imgAndPrice}>
                <div className={classes.imgWrapper}>
                    <img src={productImage} alt="" />
                </div>
                <div className={classes.cartInfo}>
                    <div className={classes.category}>{product.brand}</div>
                    <div className={classes.name}>{product.name}</div>
                </div>
            </div>
            <ChooseQuantity product={product} cartItem={true} />
            <div className={classes.price}>{`${product.price}€`}</div>
            <div className={classes.btnWrapper}>
                <button onClick={removeFromCartHandler}>Remove</button>
            </div>
        </div>
    )
}

export default CartItem;