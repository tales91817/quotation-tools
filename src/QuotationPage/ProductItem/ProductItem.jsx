import React from "react";
import "./product-item.scss";
import { ReactComponent as DeleteBtn } from "../../asset/icons/delete.svg";

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
}) => {
  const removeProduct = () => {
    onDeleteProduct(id, total);
  };
  return (
    <>
      <tbody>
        <tr>
          <td>{order + 1}</td>
          <td>{partNo}</td>
          <td>
            品物：{productName}
            <br />
            サイズ：{size}
            <br />
            コーティング：{color}
          </td>
          <td>{quantity}</td>
          <td>{unit}</td>
          <td>US {price}</td>
          <td>US {total}</td>
          <td className="delete-btn">
            <DeleteBtn onClick={removeProduct} />
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default ProductItem;
