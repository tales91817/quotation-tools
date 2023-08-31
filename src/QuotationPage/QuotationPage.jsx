import React, { useEffect, useRef, useState } from "react";
import "./quotation-page.scss";
import { db } from "../firebase.utils";
import { collection, getDocs } from "firebase/firestore";
import ProductItem from "./ProductItem/ProductItem";
import SalesInfo from "./SalesInfo/SalesInfo";
import ToolBar from "./ToolBar/ToolBar";
import TermModalBox from "./ModalBox/TermModalBox";
import ProductModalBox from "./ModalBox/ProductModalBox";
import SignatureBox from "./SignatureBox/SignatureBox";

const QuotationPage = () => {
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const [productList, setProductList] = useState([]);
  const [salesList, setSalesList] = useState([]);
  const [tradeInput, setTradeInput] = useState({
    companyName: "",
    contactor: "",
    project: "",
    tradeTerm: "",
    paymentTerm: "",
    exp: "",
    destination: "",
  });
  const [tradeInputIn, setTradeInputIn] = useState({});
  const [isTermModalOpen, setIsTermModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [quotationList, setQuotationList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  //Drawing State

  //Terms Section

  const salesInfo = async () => {
    const salesCol = collection(db, "Sales");
    const saleSnapshot = await getDocs(salesCol);
    const allSales = saleSnapshot.docs.map((doc) => doc.data());
    setSalesList(allSales);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTradeInput((prevTerm) => ({
      ...prevTerm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsTermModalOpen(false);
    setTradeInputIn(tradeInput);
  };

  const clearInfo = () => {
    setTradeInput({
      companyName: "",
      contactor: "",
      project: "",
      tradeTerm: "",
      paymentTerm: "",
      exp: "",
      destination: "",
    });
  };

  //Product Section

  const productInfo = async () => {
    const productsCol = collection(db, "Server Rack");
    const productSnapshot = await getDocs(productsCol);
    const allProduct = productSnapshot.docs.map((doc) => doc.data());
    setProductList(allProduct);
  };

  const handleAddProduct = (product, qty, price) => {
    productList.map((prod) => {
      if (product === prod.partNo) {
        const newProduct = {
          id: new Date().getTime(),
          color: prod.color,
          hasStock: prod.hasStock,
          partNo: prod.partNo,
          price: price,
          productName: prod.productName,
          quantity: qty,
          seriesNo: prod.seriesNo,
          size: prod.size,
          unit: prod.unit,
          total: qty * price,
        };
        setQuotationList((prevProdList) => [...prevProdList, newProduct]);
        setTotalAmount((preveTotal) => preveTotal + newProduct.total);
        return prod;
      } else {
        return prod;
      }
    });
  };

  const handleDeleteProduct = (id, total) => {
    setQuotationList((prevProdList) =>
      prevProdList.filter((product) => product.id !== id)
    );

    setTotalAmount((preveTotal) => preveTotal - total);
  };

  useEffect(() => {
    productInfo();
    salesInfo();
  }, []);

  return (
    <div className="quotation-page">
      <div className="quotation-cotainer">
        <div className="header-wrapper">
          <h1>EA-HWA Enterprise Industrial Co., Ltd.</h1>
          <p>NO. 7, Lane 229,Shin Ku Rd., Shih Ku Tsun,</p>
          <p>Shen Gaang Hsiang, Changhua Hsien, Taiwan, R.O.C.</p>
          <p>TEL:886-4-7990312 FAX:886-4-7990865</p>
          <h2>御 見 積 書</h2>
        </div>

        <div className="dateInfo">
          <p className="date">
            <strong>見積日: </strong>
            {`${year}/${month}/${date}`}
          </p>
          <p className="timestamp">
            <strong>見積No.: </strong>
            EH_{new Date().getTime()}
          </p>
        </div>

        <div className="customerInfo">
          <div className="title">
            <div className="titleName">
              <p>センターピア株式会社</p>
              <p>御中</p>
            </div>
          </div>
          <div className="contactor">ご担当： {tradeInputIn.contactor} 様</div>
        </div>

        <div className="tradeTerm">
          <div className="tradInfo">
            <p>件名：{tradeInputIn.project}</p>
            <p>下記の通り、御見積申し上げます。</p>
            <p>貿易条件：{tradeInputIn.tradeTerm}</p>
            <p>支払条件：{tradeInputIn.paymentTerm}</p>
            <p>有効期限：{tradeInputIn.exp}</p>
            <p>納品先：{tradeInputIn.destination}</p>
            <p>合計金額： US {totalAmount}</p>
          </div>

          {salesList.map((sales) => (
            <SalesInfo
              key={sales.id}
              name={sales.name}
              Email={sales.Email}
              company={sales.company}
              address={sales.address}
              tel={sales.tel}
              fax={sales.fax}
            />
          ))}
        </div>

        <div className="priceTable">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>項目</th>
                <th>內容</th>
                <th>数量</th>
                <th>ユニット</th>
                <th>単価</th>
                <th>金額</th>
              </tr>
            </thead>
            {quotationList.map((quote, i) => (
              <ProductItem
                key={quote.id}
                id={quote.id}
                partNo={quote.partNo}
                order={i}
                productName={quote.productName}
                hasStock={quote.hasStock}
                price={quote.price}
                quantity={quote.quantity}
                size={quote.size}
                color={quote.color}
                unit={quote.unit}
                total={quote.total}
                onDeleteProduct={handleDeleteProduct}
              />
            ))}
            <tbody>
              <tr>
                <td colSpan={5}></td>
                <td>
                  <strong>合計金額</strong>
                </td>
                <td>US {totalAmount}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>備考</td>
                <td colSpan={6}></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="remittanceInfo">
          <h1>【振込先】</h1>
          <p>
            <strong>Beneficiary:</strong> EA-HWA ENTERPRISE INDUSTRIAL CO., LTD.
          </p>
          <p>
            <strong>ADDRESS:</strong> NO.7, Lane 229, Shihgu Rd., Shengang
            Township, Changhua County 509, Taiwan.
          </p>
          <p>
            <strong>Bank Name:</strong> FIRST COMMERCIAL BANK
          </p>
          <p>
            <strong>BANKBank Address:</strong> 144 TSU YU ROAD SEC. 1, TAICHUNG,
            TAIWAN.
          </p>
          <p>
            <strong>ACCOUNT NO.:</strong> 123-45-678910
          </p>
          <p>
            <strong>SWIFT CODE.:</strong> ABCDEFGH123
          </p>
        </div>
        <div className="sign">
          <div className="singZone">
            <SignatureBox />
            <p>EA-HWA ENTERPRISE</p>
          </div>

          <div className="singZone">
            <SignatureBox />
            <p>CenterPeer.</p>
          </div>
        </div>
      </div>
      <ToolBar
        popupTermModal={() => setIsTermModalOpen(true)}
        popupProductModal={() => setIsProductModalOpen(true)}
      />
      {isTermModalOpen && (
        <TermModalBox
          tradeInput={tradeInput}
          closeModal={() => setIsTermModalOpen(false)}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          clearInfo={clearInfo}
        />
      )}
      {isProductModalOpen && (
        <ProductModalBox
          productList={productList}
          onAddProduct={handleAddProduct}
          closeModal={() => setIsProductModalOpen(false)}
        />
      )}
    </div>
  );
};

export default QuotationPage;
