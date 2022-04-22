import React from "react";
import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";
import ListElement from "../ListElement";
describe('<ListElement />', () => {
  const product = {
    id: 1,
    name: "Koszulka sportowa - Puma",
    price: 300,
    quantity: 1,
  }
  it('should show if the component displays the name, price and quantity and not the id', () => {
    render(<ListElement product={product} onRemove={jest.fn()} onAdd={jest.fn()} />);
    const name=screen.getByText(product.name);
    expect(name).toBeDefined();

    const quantity=screen.getByText(product.quantity);
    expect(quantity).toBeDefined();

    const price = screen.queryByText("300zł");
    expect(price).toBeDefined();

    const productId = screen.queryByText(product.id);
    expect(productId).not.toBe(null)
  });
  it('should start the increase or decrease function when clicked', () => {
    const onAddMock = jest.fn();
    const onRemoveMock = jest.fn();
    render (<ListElement
    product={product}
    onAdd={onAddMock}
    onRemove={onRemoveMock}
    />)
    const addButton = screen.getByText("+1");
    const removeButton = screen.getByText("-1");
    user.click(addButton);
    user.click(removeButton);
    expect(onAddMock).toBeCalledTimes(1);
    expect(onRemoveMock).toBeCalledTimes(1);
  })
  it('should display proper price after changing the quantity', () => {
    const { rerender } = render(<ListElement product={product} /> );
    const price = screen.getAllByText("3zł");
    expect(price).toHaveLength(2);
    product.quantity = 2;
    rerender(<ListElement product={product} />);
    const unitPrice = screen.getAllByText("3zł");
    expect(unitPrice).toHaveLength(1);
    const sumPrice = screen.getAllByText("6zł");
    expect(sumPrice).toHaveLength(1);
  })

})