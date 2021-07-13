import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Button from "../atoms/Button";
import { NewProduct } from "../types/Product";
import Input from "../atoms/Input";
import { Currency } from "../types/Currency";
import { createProduct, updateProduct } from "../api/api";
import { useAppDispatch, useAppSelector } from "../state/store";
import { fetchProducts } from "../state/cart";
import Loader from "../atoms/Loader";

type Props = {
  onSubmit: () => void;
  mode: "edit" | "new";
  prodId?: string;
};
export const NewProductForm = ({ onSubmit, mode, prodId }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.cart);
  const data = useAppSelector((state) =>
    state.cart.products?.find((elem) => elem._id === prodId),
  );
  const [newProdForm, setNewProdForm] = useState<NewProduct>({
    name: { pl: "", en: "" },
    brand: "",
    price: [
      { currency: Currency.USD },
      { currency: Currency.PLN },
      { currency: Currency.EUR },
    ],
  });

  useEffect(() => {
    if (mode === "edit" && data) {
      setNewProdForm({
        name: data.name,
        brand: data.brand,
        price: data.price,
      });
    }
  }, [data]);

  if (mode === "edit") {
    if (loading || !data) return <Loader />;

    if (error) return <div>Error! ${error}</div>;
  }

  const onSave = async () => {
    if (mode === "new") {
      await createProduct(newProdForm);
    } else if (prodId) {
      await updateProduct(prodId, newProdForm);
    }
    dispatch(fetchProducts());
    onSubmit();
  };

  const onChange = (value: any, key: string) => {
    setNewProdForm({ ...newProdForm, [key]: value });
  };

  const onChangePrice = (currency: Currency, value: number) => {
    const elementIndex = newProdForm.price.findIndex(
      (element) => element.currency === currency,
    );
    const oldPrices = [...newProdForm.price];
    oldPrices[elementIndex] = { ...oldPrices[elementIndex], price: value };
    setNewProdForm({ ...newProdForm, price: oldPrices });
  };

  const getValue = (currency: Currency) => {
    const elementIndex = newProdForm.price.findIndex(
      (element) => element.currency === currency,
    );
    return newProdForm.price[elementIndex].price;
  };

  return (
    <FormContainer>
      <Input
        placeholder={t("Product name in Polish")}
        value={newProdForm.name.pl}
        onChange={(e) =>
          onChange({ ...newProdForm.name, pl: e.target.value }, "name")
        }
      />
      <Input
        placeholder={t("Product name in English")}
        value={newProdForm.name.en}
        onChange={(e) =>
          onChange({ ...newProdForm.name, en: e.target.value }, "name")
        }
      />
      <Input
        placeholder={t("Brand")}
        value={newProdForm.brand}
        onChange={(e) => onChange(e.target.value, "brand")}
      />
      <Input
        type="number"
        placeholder={t("Price in cents (USD)")}
        value={getValue(Currency.USD)}
        onChange={(e) => onChangePrice(Currency.USD, +e.target.value)}
      />
      <Input
        type="number"
        placeholder={t("Price in eurocents (EUR)")}
        value={getValue(Currency.EUR)}
        onChange={(e) => onChangePrice(Currency.EUR, +e.target.value)}
      />
      <Input
        type="number"
        placeholder={t("Price in grosze (PLN)")}
        value={getValue(Currency.PLN)}
        onChange={(e) => onChangePrice(Currency.PLN, +e.target.value)}
      />

      <Button onClick={() => onSave()}>{t("Save")}</Button>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
