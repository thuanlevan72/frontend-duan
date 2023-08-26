import React from "react";

class Bill extends React.Component {
  render() {
    const { curentInfo, count, currenOrderDeatail } = this.props;
    const body = {
      font: "VCR OSD Mono",
      color: " #000",
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      fontZize: "10px",
    };
    const billStyles = {
      width: "400px",
      boxShadow: "0 0 3px #aaa",
      padding: "20px 20px",
      lineHeight: "30px",
      boxSizing: "border-box",
    };

    const tableStyles = {
      borderCollapse: "collapse",
      width: "100%",
      padding: "40px 0",
    };

    const headerRowStyles = {
      borderTop: "2px dashed #000",
      borderBottom: "2px dashed #000",
    };

    const totalRowStyles = {
      borderTop: "2px dashed #000",
      borderBottom: "2px dashed #000",
    };

    const netAmountRowStyles = {
      borderTop: "2px dashed #000",
    };

    return (
      <>
        <div style={body}>
          {console.log(currenOrderDeatail)}
          <div style={billStyles} className="bill">
            <div className="brand">
              <b>PolyFood</b> - Hóa đơn
            </div>
            <div className="address">
              địa chỉ - {curentInfo.address} <br /> Số điện thoại -{" "}
              {curentInfo.phone}
            </div>
            <div className="shop-details">
              Mã hóa đơn: {curentInfo.codeOrder}
            </div>
            <div className="shop-details">
              Tên người đặt: {curentInfo.fullName}
            </div>
            <div className="bill-details">
              <div>
                Tổng đơn: {curentInfo.actualPrice.toLocaleString("vi-VN")} vnd
              </div>

              <div className="flex justify-between">
                <div>Ngày đặt: {curentInfo.createdAt}</div>
                {/* <div>TIME: 14:10</div> */}
              </div>
            </div>
            <table style={tableStyles} className="table">
              <tbody>
                <tr style={headerRowStyles} className="header">
                  <th>Particulars</th> <th>Qty</th>
                  <th></th>
                  <th>Amount</th>
                </tr>
                {/* {
    "productId": 2,
    "nameProduct": "Khoai môn",
    "avartarImageProduct": "https://res.cloudinary.com/doedovklj/image/upload/v1686122885/xyz-abc_638217448807644326image.webp",
    "priceOld": "56.000 vnd",
    "quantity": 1,
    "price": "53.200 vnd",
    "totalPrice": "53.200 vnd"
} */}
                {currenOrderDeatail.map((item, index) => {
                  return (
                    <tr>
                      <td>{item.nameProduct}</td>
                      <td>{item.quantity}</td>
                      <td></td>
                      <td>{item.totalPrice}</td>
                    </tr>
                  );
                })}
                <tr style={totalRowStyles} className="total">
                  <td />
                  <td>Tổng tiền</td>
                  <td>{count}</td>
                  <td>{curentInfo.actualPrice.toLocaleString("vi-VN")} vnd</td>
                </tr>

                {/* <td />
                  <td>CGST</td>
                  <td>5%</td>
                  <td>17.5</td>
                </tr>
                <tr>
                  <td />
                  <td>SGST</td>
                  <td>5%</td>
                  <td>17.5</td>
                </tr>
                <tr>
                  <td />
                  <td>RND-Off</td>
                  <td>0</td>
                  <td>17.5</td>
                </tr> */}
                {/* <tr style={netAmountRowStyles} className="net-amount">
                  <td />
                  <td>Net Amnt</td>
                  <td />
                  <td>385</td>
                </tr> */}
              </tbody>
            </table>
            Phương thức thanh toán: {curentInfo.paymentOrder}
            <br />
            Mã đơn hàng ID: {curentInfo.codeOrder}
            <br />
            Tên tài khoảng: {curentInfo.fullName}
            <br />
            Cảm ơn ! Vui lòng ghé thăm lại
          </div>
        </div>
      </>
    );
  }
}

export default Bill;
