import { CouponsModels } from '../../../../../models/CouponsModels';

export interface EditCouponTypes {
  dataItem: CouponsModels;
  onClose: () => void;
  refreshFeth: () => void;
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
