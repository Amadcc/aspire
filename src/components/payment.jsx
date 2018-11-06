import React, { Component } from "react";
import "../styles/payment.css";

class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      isLoaded: false
    };

    this.onPaymentClick = this.onPaymentClick.bind(this);

    let loanAmmount = localStorage.getItem("loanAmmount");
    let monthlyFee = localStorage.getItem("monthlyFee");
    let monthlyPayment = localStorage.getItem("monthlyPayment");
    let loanWithFee = parseFloat(localStorage.getItem("loanWithFee"));
    let monthAmount = localStorage.getItem("monthAmount");

    let paymentsCount = monthAmount * 4;

    this.state = {
      loanAmmount: loanAmmount,
      monthlyFee: monthlyFee,
      monthlyPayment: monthlyPayment,
      loanWithFee: loanWithFee,
      leftPayment: loanWithFee.toLocaleString(),
      monthAmount: monthAmount,
      weeklyPayment: loanWithFee / paymentsCount
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json
        });
      });
  }

  onPaymentClick(e) {
    console.log("called");
    let temp = this.state.loanWithFee;
    temp -= this.state.weeklyPayment;

    let leftPayment;
    if (temp <= 0) {
      leftPayment = "PAYED!!!";
    } else {
      leftPayment = temp.toLocaleString();
    }

    this.setState({ loanWithFee: temp, leftPayment: leftPayment });
  }

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="card">
          <div className="card-header text-center">PAYMENT</div>
          <div className="card-body">
            <div className="form-row">
              <div className="form-group col">
                <label className="lbl-change">USERNAME</label>
                <div className="payment">
                  <p className="input-changes">{items.username}</p>
                </div>
              </div>
              <div className="form-group col">
                <label className="lbl-change">FULL NAME</label>
                <div className="payment">
                  <p className="input-changes">{items.name}</p>
                </div>
              </div>

              <div className="form-group col">
                <label className="lbl-change">EMAIL</label>
                <div className="payment">
                  <p className="input-changes">{items.email}</p>
                </div>
              </div>
              <div className="form-group col">
                <label className="lbl-change">PHONE NUMBER</label>
                <div className="payment">
                  <p className="input-changes">{items.phone}</p>
                </div>
              </div>
              <div className="form-group col">
                <label className="lbl-change">ADDRESS</label>
                <div className="payment">
                  <p className="input-changes">
                    {items.address.street} | {items.address.suite}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer text-muted">
            <div className="form-row">
              <div className="form-group col">
                <label className="lbl-change">AMOUNT</label>
                <div className="payment">
                  <h1 className="txt-payment">
                    s$
                    {this.state.loanAmmount}
                  </h1>
                </div>
              </div>

              <div className="form-group col">
                <label className="lbl-change">MONTH</label>
                <div className="payment">
                  <h1 className="txt-payment">{this.state.monthAmount}</h1>
                  <h1 className="txt-payment">month</h1>
                </div>
              </div>
              <div className="form-group col">
                <label className="lbl-change">FEES</label>
                <div className="payment">
                  <h1 className="txt-payment">
                    s$
                    {this.state.monthlyFee}
                  </h1>
                </div>
              </div>
              <div className="form-group col">
                <label className="lbl-change">WEEKLY REPAYMENT LEFT</label>
                <div className="payment">
                  <h1 className="txt-payment">
                    s$
                    {this.state.leftPayment}
                  </h1>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.onPaymentClick}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default About;
