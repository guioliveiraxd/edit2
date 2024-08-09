import { CouponsModels } from '../../../../../models/CouponsModels';

export interface AddCouponTypes {
  onClose: () => void;
  refreshFeth: () => void;
  couponid: string;
}

export interface IRowPropsStyled {
  paddingTop?: number;
}

export interface ITotalPriceContainerPropsStyled {
  noExtraSpacing?: boolean;
  flexDirection?: 'row' | 'column';
}

export interface IPricePropsStyled {
  oldPrice?: boolean;
}
