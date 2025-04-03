interface Props {
  currency: string;
  value: number;
}

export function currencyFormatter({ currency, value }: Props) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    minimumFractionDigits: 2,
    currency,
  });
  return formatter.format(value);
}
