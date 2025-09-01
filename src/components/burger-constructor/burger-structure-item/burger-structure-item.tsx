import { Price } from "@/components/common/price/price";
import { TIngredient } from "@/utils/types"
import { DeleteIcon, DragIcon, LockIcon } from "@krgaa/react-developer-burger-ui-components";
import styles from "./burger-structure-item.module.css";

type TBurgerStructureItemProps = {
    ingredient: TIngredient;
    isTopBun?: boolean;
    isBottomBun?: boolean;
}

export const BurgerStructureItem = ({ ingredient, isTopBun = false, isBottomBun = false }: TBurgerStructureItemProps): React.JSX.Element => {
    const { name, price, image_mobile } = ingredient;
    const isBun = isTopBun || isBottomBun;
    const ingredientClasses = [
        styles.item_inner,
        'pt-4 pb-4 pr-8 pl-6'
    ];
    if (isTopBun) {
        ingredientClasses.push(styles.item_top_bun);
    } else if (isBottomBun) {
        ingredientClasses.push(styles.item_bottom_bun);
    }

    return (
        <article className={styles.item}>
            <span className={isBun ? 'pr-8' : 'pr-2'}>{!isBun && <DragIcon type="primary" />}</span>
            <div className={ingredientClasses.join(' ')}>
                <img src={image_mobile} className={styles.img}/>
                <span className={`${styles.name} ml-5 mr-5`}>{name}</span>
                <span className="mr-5"><Price price={price} /></span>
                <span>{isBun ? <LockIcon type="secondary" /> : <DeleteIcon type="primary" />}</span>
            </div>
        </article>
    );
}