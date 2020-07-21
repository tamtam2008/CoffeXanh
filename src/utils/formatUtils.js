import AppConfig from '../config/App.config';

export const formatCurrency = amount =>
  Number(amount.toFixed(0))
    .toLocaleString()
    .replace(/\d(?=(\d{3})+$)/g, '$&,') + ` ${AppConfig.CurrencyUnit}`;
