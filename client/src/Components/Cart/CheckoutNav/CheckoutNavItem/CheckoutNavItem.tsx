import { NavLink, useLocation } from 'react-router-dom';
import classes from './CheckoutNavItem.module.css';

function CheckoutNavItem(props: any) {

    const location = useLocation();
    const locationArray = location.pathname.split("/");
    const currentPermalnik = locationArray[locationArray.length - 1];    

    return(
        <NavLink to={props.link} className={classes.navItem} style={{pointerEvents: (props.permalink === "checkout") ? "none" : "auto"}}>
            <div className={classes.number} style={{
                background: currentPermalnik === props.permalink ? "#DA0047" : "#7D8693", 

                }} >{props.number}</div>
            <div className={classes.text}>{props.text}</div>
        </NavLink>
    )
}

export default CheckoutNavItem;