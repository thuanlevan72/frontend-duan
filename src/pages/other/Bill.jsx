import React from "react";

class Bill extends React.Component {
  render() {
    const body = {
      font: "VCR OSD Mono",
      color: " #000",
      textAlign: "center",
      display: "flex",
      // justifyContent: "center",
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
          <div style={billStyles} className="bill">
            <div className="brand">AMIT CHAMBIAL PVT LTD</div>
            <div className="address">
              FLoor 2 Building No 34 India <br /> Phone No- 0192083910
            </div>
            <div className="shop-details">PAN: AAKPS9298A TIN: 09820163701</div>
            <div>RETAIL INVOICE </div>
            <div className="bill-details">
              <div className="flex justify-between">
                <div>BILL NO: 091</div>
                <div>TABLE NO: 091</div>
              </div>
              <div className="flex justify-between">
                <div>BILL DATE: 10/Mar/2022</div>
                <div>TIME: 14:10</div>
              </div>
            </div>
            <table style={tableStyles} className="table">
              <tbody>
                <tr style={headerRowStyles} className="header">
                  <th>Particulars</th> <th>Rate</th> <th>Qty</th>
                  <th>Amount</th>
                </tr>
                <tr>
                  <td>Head and Shoulder</td>
                  <td>100</td>
                  <td>2</td>
                  <td>200</td>
                </tr>
                <tr>
                  <td>Britania</td>
                  <td>25</td>
                  <td>2</td>
                  <td>50</td>
                </tr>
                <tr>
                  <td>Tomatoes</td>
                  <td>40</td>
                  <td>1</td>
                  <td>40</td>
                </tr>
                <tr>
                  <td>Chocolates</td>
                  <td>5</td>
                  <td>12</td>
                  <td>60</td>
                </tr>
                <tr style={totalRowStyles} className="total">
                  <td />
                  <td>Total</td>
                  <td>17</td>
                  <td>350</td>
                </tr>
                <tr>
                  <td />
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
                </tr>
                <tr style={netAmountRowStyles} className="net-amount">
                  <td />
                  <td>Net Amnt</td>
                  <td />
                  <td>385</td>
                </tr>
              </tbody>
            </table>
            Payment Method:Card
            <br />
            Transaction ID: 082098082783
            <br />
            Username: Pradeep [Biller] <br />
            Thank You ! Please visit again
          </div>
        </div>
      </>
    );
  }
}

export default Bill;
