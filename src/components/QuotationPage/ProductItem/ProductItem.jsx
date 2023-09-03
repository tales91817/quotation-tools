import React from "react";
import "./product-item.scss";
import { ReactComponent as DeleteBtn } from "../../../asset/icons/delete.svg";

const ProductItem = ({
  id,
  order,
  partNo,
  productName,
  hasStock,
  price,
  quantity,
  size,
  color,
  unit,
  total,
  onDeleteProduct,
  isTransferring,
}) => {
  const removeProduct = () => {
    onDeleteProduct(id, total);
  };
  return (
    <>
      <tr>
        <td>{order + 1}</td>
        <td>{partNo}</td>
        <td>
          Product: {productName}
          <br />
          Size: {size}
          <br />
          Color: {color}
        </td>
        <td>{quantity}</td>
        <td>{unit}</td>
        <td>US {price}</td>
        <td>US {total}</td>
        <td className="delete-btn">
          {isTransferring && <DeleteBtn onClick={removeProduct} />}
        </td>
      </tr>
    </>
  );
};

export default ProductItem;
