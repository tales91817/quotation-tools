import React, { useState } from "react";
import { ReactComponent as CloseBtn } from "../../../asset/icons/close.svg";

const ProductModalBox = ({ productList, closeModal, onAddProduct }) => {
  const [outPutProduct, setOutPutProduct] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (quantity <= 0 || unitPrice <= 0) {
      alert("數量或單價輸入錯誤，這兩格必須為阿拉伯數字");
      return;
    }

    onAddProduct(outPutProduct, quantity, unitPrice);
  };

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          <CloseBtn />
        </span>

        <form action="submit">
          <label>Item</label>
          <select
            name="product"
            onChange={(e) => setOutPutProduct(e.target.value)}
          >
            <option value="default">Please select product</option>
            {productList.map((product) => (
              <option key={product.partNo} value={product.partNo}>
                {product.seriesNo}
              </option>
            ))}
          </select>
          <label>Q'ty</label>
          <input
            type="text"
            onChange={(e) => setQuantity(e.target.value)}
            required="required"
          />
          <label>Price</label>
          <input
            type="text"
            onChange={(e) => setUnitPrice(e.target.value)}
            required="required"
          />

          <div className="btn-wrapper">
            <button className="updateBtn" onClick={handleAddProduct}>
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModalBox;
