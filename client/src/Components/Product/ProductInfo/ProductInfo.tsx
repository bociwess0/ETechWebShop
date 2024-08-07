import { Button } from 'react-bootstrap';
import { Product } from '../../../Interfaces/Interface';
import ChooseQuantity from '../ChooseQuantity/ChooseQuantity';
import classes from './ProductInfo.module.css';
import { addTocartDB } from '../../../DatabaseRequests/Requests';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { addToCart } from '../../../Redux/cartSlice';
import ToastMessage from '../../Layout/ToastMessage/ToastMessage';

interface Props {
    product: Product
}

function ProductInfo({product} : Props) {

    const dispatch = useDispatch();
    const [enteredQuantity, setEnteredQuantity] = useState<number>(1);
    const [buttonText, setButtonText] = useState<string>("Add to cart");

    const [showToast, setShowToast] = useState(false);

    const handleShowToast = () => {        
      setShowToast(true);
    };
  
    const handleCloseToast = () => {
      setShowToast(false);
    };


    const AddToCartHandler = () => {        
        addTocartDB(product, enteredQuantity);
        dispatch(addToCart({product: product, quantity: enteredQuantity}));
        handleShowToast();
    }

    const [outOfStock, setOutOfStock] = useState<boolean>(false)

    useEffect(() => {        
        if(product.quantityInStock === 0) {
            setOutOfStock(true)
            setButtonText("Out of stock")
        } else {
            setOutOfStock(false)
            setButtonText("Add to cart")
        }
    }, [product.quantityInStock])

    return(
        <div className={classes.productInfoWrapper}>
            <h2 className={classes.title}>{product.name}</h2>
            <h4 className={classes.brand}>{product.brand}</h4>
            <div className={classes.description}>{product.description}</div>
            <div className={classes.price}>{`${product.price}€`}</div>
            <ChooseQuantity product={product} cartItem={false} action={setEnteredQuantity} />
            <button className={`${classes.addToCartButton} ${outOfStock ? classes.outOfStockButton : ""}`} onClick={AddToCartHandler} >{buttonText}</button>
            <ToastMessage message="Product is successfully added to cart!" show={showToast} onClose={handleCloseToast} />
        </div>
    )
}

export default ProductInfo;