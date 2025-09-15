import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { TCommonProps } from '@/utils/types';

import styles from './price.module.css';

type TPriceSize = 's' | 'm' | 'l';

type TPriceProps = {
  price: number;
  size?: TPriceSize;
} & TCommonProps;

export const Price = ({
  price,
  size = 's',
  extraClass,
}: TPriceProps): React.JSX.Element => {
  let textSizeStyle;
  if (size === 's') textSizeStyle = 'text_type_digits-default';
  else if (size === 'm') textSizeStyle = 'text_type_digits-medium';
  else if (size === 'l') textSizeStyle = 'text_type_digits-large';

  let iconSizeStyle;
  if (size === 's') iconSizeStyle = styles.price_icon_s;
  else if (size === 'm') iconSizeStyle = styles.price_icon_m;
  else if (size === 'l') iconSizeStyle = styles.price_icon_l;

  return (
    <p className={`${styles.price} pt-1 pb-1 ${extraClass}`}>
      <span className={`mr-2 text ${textSizeStyle}`}>{price}</span>
      <CurrencyIcon type="primary" className={iconSizeStyle} />
    </p>
  );
};
