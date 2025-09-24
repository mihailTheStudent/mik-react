import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks';
import {
  changeIngredientPlace,
  applyDragging,
  removeIngredient,
  setDraggableItem,
  draggableItem,
} from '@/services/store/burger-constructor.store';
import { INGREDIENT_SORT } from '@/utils/dnd.const';
import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import type { TIngredientSortItem } from '@/utils/dnd.const';
import type { TIngredient } from '@/utils/types';

import styles from './constructor-element-wrapper.module.css';

type TConstructorElementWrapperProps = {
  ingredient: TIngredient;
  type?: 'bun-top' | 'bun-bottom';
  index: number;
};

export const ConstructorElementWrapper = ({
  ingredient,
  type,
  index,
}: TConstructorElementWrapperProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const _removeIngredient = useCallback(() => {
    if (ingredient.type === 'bun') {
      return;
    }
    dispatch(removeIngredient(index));
  }, [index]);

  const typeValue =
    type === 'bun-top' ? 'top' : type === 'bun-bottom' ? 'bottom' : undefined;
  const text = `${ingredient.name}${type === 'bun-top' ? ' (верх)' : type === 'bun-bottom' ? ' (низ)' : ''}`;
  const isLocked = !!typeValue;

  const [, sortDragRef] = useDrag<TIngredientSortItem>(
    () => ({
      type: isLocked ? 'invalid_type' : INGREDIENT_SORT,
      item: { index },
      end: (_, monitor): void => {
        dispatch(applyDragging(monitor.didDrop()));
      },
    }),
    []
  );

  const isDragging = useAppSelector(draggableItem) === index;

  const [, sortDropRef] = useDrop<TIngredientSortItem>(() => ({
    accept: isLocked ? 'invalid_type' : INGREDIENT_SORT,
    hover(item, monitor): void {
      if (monitor.isOver()) {
        dispatch(changeIngredientPlace({ index: item.index, newIndex: index }));
        dispatch(setDraggableItem(index));
      }
    },
  }));

  return (
    <div
      className={`${styles.wrapper} ${isLocked ? '' : styles.draggable} ${isDragging ? styles.is_dragging : ''}`}
      ref={(ref) => {
        sortDragRef(ref);
        sortDropRef(ref);
      }}
    >
      <div className={`${isLocked ? styles.no_drag : ''} mr-2`}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        extraClass={styles.burger_ingredient}
        text={text}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        isLocked={isLocked}
        type={typeValue}
        handleClose={() => _removeIngredient()}
      />
    </div>
  );
};
