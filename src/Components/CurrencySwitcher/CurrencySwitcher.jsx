import React, { Component } from "react";
import withDataContext from "../../Context/DataContextProvider";

export class CurrencySwitcher extends Component {
  render() {
    // const { currencies, setCurrency } = this.context;
    const { currencies, setCurrency } = this.props.dataContext;

    return (
      <div>
        <div className="cart-overlay " onClick={this.props.closeCurrency}></div>

        <div className="currency-list">
          <ul>
            {currencies.map((cur) => {
              const { label, symbol } = cur;
              return (
                <li
                  key={label}
                  onClick={() => {
                    setCurrency({ label, symbol });
                    this.props.closeCurrency();
                  }}
                >
                  <p>{symbol}</p> <p>{label}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default withDataContext(CurrencySwitcher);

// export default CurrencySwitcher;
// CurrencySwitcher.contextType = DataContext;
