import type { TIngredient } from '@/utils/types';

import styles from './ingredient-details.module.css';

type TIngredientDetails = {
  ingredient: TIngredient;
};

export const IngredientDetails = ({
  ingredient,
}: TIngredientDetails): React.JSX.Element => {
  const { image_large, name, calories, proteins, fat, carbohydrates } = ingredient;

  return (
    <div className={styles.modal}>
      <img className={`${styles.ingredient_image} mb-4`} src={image_large} alt={name} />
      <p className="text text_type_main-medium mb-8">{name}</p>
      <div className={styles.ingredient_details}>
        <p className={styles.ingredient_detail}>
          <span className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {calories}
          </span>
        </p>
        <p className={styles.ingredient_detail}>
          <span className="text text_type_main-default text_color_inactive">
            Белки, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {proteins}
          </span>
        </p>
        <p className={styles.ingredient_detail}>
          <span className="text text_type_main-default text_color_inactive">
            Жиры, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {fat}
          </span>
        </p>
        <p className={styles.ingredient_detail}>
          <span className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {carbohydrates}
          </span>
        </p>
      </div>
    </div>
  );
};
