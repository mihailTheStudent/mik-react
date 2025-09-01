import { TIngredient } from "@/utils/types";
import { Counter, CurrencyIcon } from "@krgaa/react-developer-burger-ui-components";
import styles from "./ingredient-item.module.css";

type TBurgerIngredientItemProps = {
    ingredient: TIngredient;
    count?: number;
};

export const IngredientItem = ({ ingredient, count }: TBurgerIngredientItemProps): React.JSX.Element => {
    const { name, price, image } = ingredient;
    
    return (
        <article className={`${styles.item} pb-4`}>
            <img src={image} className="pl-4 pr-4" />
            {count ? <Counter count={count} /> : null}
            <p className={`${styles.price} pt-1 pb-1`}>
                <span className="mr-2 text text_type_digits-default">{price}</span>
                <CurrencyIcon type="primary" />
            </p>
            <p className={styles.name}>{name}</p>
        </article>
    );
}