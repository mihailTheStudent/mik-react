import { CurrencyIcon } from "@krgaa/react-developer-burger-ui-components";
import styles from "./price.module.css";

type TPriceSize = "s" | "m" | "l";

type TPriceProps = {
    price: number;
    size?: TPriceSize;
}

export const Price = ({ price, size = "s" }: TPriceProps): React.JSX.Element => {
    let sizeStyle;
    if (size === "s") sizeStyle = "text_type_digits-default";
    else if (size === "m") sizeStyle = "text_type_digits-medium";
    else if (size === "l") sizeStyle = "text_type_digits-large";

    return (
        <p className={`${styles.price} pt-1 pb-1`}>
            <span className={`mr-2 text ${sizeStyle}`}>{price}</span>
            <CurrencyIcon type="primary" />
        </p>
    );
}