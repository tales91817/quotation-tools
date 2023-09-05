import React, { useEffect, useState, useRef } from "react";
import "./quotation-page.scss";
import { db } from "../../firebase.utils";
import { collection, getDocs } from "firebase/firestore";
import ProductItem from "./ProductItem/ProductItem";
import SalesInfo from "./SalesInfo/SalesInfo";
import ToolBar from "../ToolBar/ToolBar";
import TermModalBox from "./ModalBox/TermModalBox";
import ProductModalBox from "./ModalBox/ProductModalBox";
import { jsPDF } from "jspdf";
import * as htmlToImage from "html-to-image";
import SignModal from "./ModalBox/SignModal";
import CurrencyModalBox from "./ModalBox/CurrencyModalBox/CurrencyModalBox";
import CalculatorModalBox from "./ModalBox/CalculatorModalBox/CalculatorModalBox";

const QuotationPage = () => {
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const [timeStamp, setTimeStamp] = useState(new Date().getTime());
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
  const [quotationList, setQuotationList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [signatureDataURL, setSignatureDataURL] = useState(null);
  //For Modal using
  const [isTermModalOpen, setIsTermModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState(false);

  //For PDF using
  const contentRef = useRef(null);
  const [isTransferring, setIsTransferring] = useState(true);

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

  const handleClearProducts = () => {
    setProductList({});
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

  //Transfer To PNG then to PDF
  const handleTransfer = async () => {
    const content = contentRef.current;
    setIsTransferring(false);

    //transfer to png
    htmlToImage
      .toPng(content)
      .then(function (dataUrl) {
        const img = new Image();
        img.src = dataUrl;

        //transfer to PDF
        const pdf = new jsPDF();
        pdf.addImage(dataUrl, "PNG", 10, 10, 190, 220);
        pdf.save("newPDF.pdf");
        setIsTransferring(true);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  //Insert Signature Params
  const handleSignatureDataChange = (dataURL) => {
    setSignatureDataURL(dataURL);
  };

  useEffect(() => {
    productInfo();
    salesInfo();
  }, []);

  //TimeStamp
  useEffect(() => {
    const newTimeStamp = new Date().getTime();
    setTimeStamp(newTimeStamp);
  }, []);

  return (
    <div className="quotation-page">
      <div className="quotation-cotainer" ref={contentRef}>
        <div className="header-wrapper">
          <h1>EA-HWA Enterprise Industrial Co., Ltd.</h1>
          <p>NO. 7, Lane 229,Shin Ku Rd., Shih Ku Tsun,</p>
          <p>Shen Gaang Hsiang, Changhua Hsien, Taiwan, R.O.C.</p>
          <p>TEL:886-4-7990312 FAX:886-4-7990865</p>
          <h2>QUOTATION</h2>
        </div>

        <div className="dateInfo">
          <p className="date">
            <strong>Date: </strong>
            {`${year}/${month}/${date}`}
          </p>
          <p className="timestamp">
            <strong>No.: </strong>
            EH_{timeStamp}
          </p>
        </div>

        <div className="customerInfo">
          <div className="title">
            <div className="titleName">
              <p>{tradeInput.companyName}</p>
            </div>
          </div>
          <div className="contactor">Contactor: {tradeInputIn.contactor}</div>
        </div>

        <div className="tradeTerm">
          <div className="tradInfo">
            <p>Project: {tradeInputIn.project}</p>
            <p>Trade Term: {tradeInputIn.tradeTerm}</p>
            <p>Payment Term: {tradeInputIn.paymentTerm}</p>
            <p>Expiry Date of Quotation: {tradeInputIn.exp}</p>
            <p>Ship To: {tradeInputIn.destination}</p>
            <p>Total Amount: US {totalAmount}</p>
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
                <th>Item</th>
                <th>Description</th>
                <th>Q'ty</th>
                <th>Unit</th>
                <th>Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
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
                  isTransferring={isTransferring}
                />
              ))}
              <tr>
                <td colSpan={5}></td>
                <td>
                  <strong>Total Amount</strong>
                </td>
                <td>US {totalAmount}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>Note</td>
                <td colSpan={6}></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="remittanceInfo">
          <h1>Remittance Account</h1>
          <p>
            <strong>Beneficiary:</strong> EA-HWA ENTERPRISE INDUSTRIAL CO., LTD.
          </p>
          <p>
            <strong>ADDRESS:</strong> NO.7, Lane 229, Shihgu Rd., Shengang
            Township, Changhua County 509, Taiwan.
          </p>
          <p>
            <strong>Bank Name:</strong> Big World BANK
          </p>
          <p>
            <strong>BANKBank Address:</strong> 145 GG ROAD SEC. 1, TAICHUNG,
            TAIWAN.
          </p>
          <p>
            <strong>ACCOUNT NO.:</strong> 123-45-678910
          </p>
          <p>
            <strong>SWIFT CODE.:</strong> ABCDEFGH123
          </p>
        </div>
        <div className="signature">
          <div className="myCompanySign">
            {signatureDataURL && <img src={signatureDataURL} alt="Signature" />}
            <div className="line"></div>
            <p>EA-HWA Enterprise Industrial Co., Ltd.</p>
          </div>
          <div className="customerSign">
            <div className="line"></div>
            {tradeInput.companyName && <p>{tradeInput.companyName}</p>}
          </div>
        </div>
      </div>
      <div className="toolbar-area">
        <ToolBar
          popupTermModal={() => setIsTermModalOpen(true)}
          popupProductModal={() => setIsProductModalOpen(true)}
          popupSignModal={() => setIsSignModalOpen(true)}
          popupCurrnecyModal={() => setIsCurrencyModalOpen(true)}
          popupCalculatorModal={() => setIsCalculatorModalOpen(true)}
          transferToPDF={handleTransfer}
        />
      </div>
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
          clearProducts={handleClearProducts}
        />
      )}
      {isSignModalOpen && (
        <SignModal
          closeModal={() => setIsSignModalOpen(false)}
          onSignatureDataChange={handleSignatureDataChange}
        />
      )}
      {isCurrencyModalOpen && (
        <CurrencyModalBox closeModal={() => setIsCurrencyModalOpen(false)} />
      )}
      {isCalculatorModalOpen && (
        <CalculatorModalBox
          closeModal={() => setIsCalculatorModalOpen(false)}
        />
      )}
    </div>
  );
};

export default QuotationPage;
