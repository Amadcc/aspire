import React, { Component } from "react";
import Remarkable from "remarkable";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import About from "./payment";
import "../styles/counter.css";

const RATE = 0.015; //1.5%

class Counter extends Component {
  constructor(props) {
    super(props);
    this.onAmmountChange = this.onAmmountChange.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    const loanAmmount = 100;
    const monthlyFee = loanAmmount * RATE;
    const monthlyPayment = loanAmmount + monthlyFee;
    this.state = {
      value: loanAmmount,
      monthlyFee: monthlyFee.toString(),
      monthlyPayment: monthlyPayment.toString(),
      loanWithFee: monthlyPayment,
      monthAmount: 1
    };
  }

  onAmmountChange(e) {
    let inputData = e.target.value;
    inputData = inputData.replace(/,/g, "");
    inputData = inputData.replace(/\./g, "");
    inputData = inputData.replace(/^0+/, "");
    inputData = inputData.replace(/[-\+=()*&^%$#@!]/g, "");

    if (inputData === "") {
      inputData = "0";
    }

    let inputInt = parseInt(inputData);
    let monthlyFee = inputInt * RATE;
    let loanWithFee = inputInt + monthlyFee;
    inputData = inputInt.toLocaleString();

    e.target.value = inputData;

    console.log(inputData);
    this.setState({
      monthlyFee: monthlyFee.toLocaleString(),
      monthlyPayment: (loanWithFee / this.state.monthAmount).toLocaleString(),
      loanWithFee: loanWithFee,
      value: inputInt
    });
  }

  onMonthChange(e) {
    let monthAmount = parseInt(e.target.value);

    this.setState({
      monthAmount: monthAmount,
      monthlyPayment: (this.state.loanWithFee / monthAmount).toLocaleString()
    });
  }

  onSubmit() {
    console.log("old state", this.state);
    localStorage.setItem("loanAmmount", this.state.value);
    localStorage.setItem("monthlyFee", this.state.monthlyFee);
    localStorage.setItem("monthlyPayment", this.state.monthlyPayment);
    localStorage.setItem("loanWithFee", this.state.loanWithFee);
    localStorage.setItem("monthAmount", this.state.monthAmount);
  }

  getFeesVal() {
    const md = new Remarkable();
    return { __html: md.render(this.state.monthlyFee) };
  }
  getMPVal() {
    const md = new Remarkable();
    return { __html: md.render(this.state.monthlyPayment) };
  }
  render() {
    return (
      <Router>
        <div>
          <Route
            exact={true}
            path={"/"}
            render={() => (
              <div className="card chart-card">
                <div className="card-header text-center">LOAN APPLICATION</div>
                <div className="card-body">
                  <form>
                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label className="lbl-change">ID</label>
                        <input
                          type="text"
                          className="form-control input-changes"
                          placeholder="ID Number"
                          required
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label className="lbl-change">CONTACT</label>
                        <input
                          className="form-control input-changes"
                          placeholder="Contact Number"
                          required
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label className="lbl-change">EMAIL</label>
                        <input
                          type="email"
                          className="form-control input-changes"
                          placeholder="Email"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label className="lbl-change">FIRST NAME</label>
                        <input
                          className="form-control input-changes"
                          placeholder="First Name"
                          required
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label className="lbl-change">LAST NAME</label>
                        <input
                          className="form-control input-changes"
                          placeholder="Last Name"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="lbl-change">Address</label>
                      <input
                        type="text"
                        className="form-control input-changes"
                        placeholder="1234 Main St"
                        required
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label className="lbl-change">City</label>
                        <input
                          type="text"
                          className="form-control input-changes"
                          placeholder="City"
                          required
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label className="lbl-change">State</label>
                        <select className="form-control">
                          <option>Choose...</option>
                          <option value="1">...</option>
                        </select>
                      </div>
                      <div className="form-group col-md-2">
                        <label className="lbl-change">Zip</label>
                        <input
                          type="text"
                          className="form-control input-changes"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-3">
                        <label className="lbl-change">AMOUNT</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">s$</span>
                          </div>
                          <input
                            id="markdown-content"
                            onChange={this.onAmmountChange}
                            defaultValue={this.state.value}
                          />
                          <div className="invalid-feedback">
                            Please choose a username.
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-md-3">
                        <label className="lbl-change">LOAN TERM</label>
                        <select
                          className="form-control input-changes"
                          onChange={this.onMonthChange}
                        >
                          <option value="1">1 months</option>
                          <option value="2">2 months</option>
                          <option value="3">3 months</option>
                          <option value="4">4 months</option>
                          <option value="5">5 months</option>
                          <option value="6">6 months</option>
                        </select>
                      </div>
                      <div className="form-group col-md-3">
                        <label className="lbl-change">FEES</label>
                        <div className="payment">
                          <h1 className="txt-payment">s$</h1>
                          <h1
                            className="txt-payment"
                            dangerouslySetInnerHTML={this.getFeesVal()}
                          />
                        </div>
                      </div>
                      <div className="form-group col-md-3">
                        <label className="lbl-change">MONTHLY REPAYMENT</label>
                        <div className="payment">
                          <h1 className="txt-payment">s$</h1>
                          <h1
                            className="txt-payment"
                            dangerouslySetInnerHTML={this.getMPVal()}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="invalidCheck2"
                          required
                        />
                        <label className="form-check-label">
                          Agree to terms and conditions
                        </label>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="card-footer text-muted text-center">
                  <Link to={"/payment"}>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={this.onSubmit}
                    >
                      Submit
                    </button>
                  </Link>
                </div>
              </div>
            )}
          />
          <Route path={"/payment"} component={About} />
        </div>
      </Router>
    );
  }
}

export default Counter;
