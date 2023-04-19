import axios from "axios";
import React, { useState, useEffect } from "react";
import StripeCheckout from 'react-stripe-checkout';

function Cart() {
  const publishableKey = "pk_test_51Kzmc0AfzzRvpJXw0VPsraEAAh70mZKmV9yuJWkkVM8vcuX1WkUZhrk3cMcGxcQ1YaFoE0ODQh4xpw7XmOPH1LxI0008wECyNz";
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    setCart(() => JSON.parse(localStorage.getItem("cart")));
    cart.map(c => {
      setAmount(amount => amount+=c.price);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])

  const deleteItem = (item) => {
    setCart(cart => cart.filter(c => c._id !== item.id));
    
  };

  const getAmount = () => {
    let amount = 0;
    cart.map(c => {
      amount += c.price;
    });
    return amount;
  }

  const payNow = async token => {
    try {
      const response = await axios({
        url: 'http://localhost:5000/payment',
        method: 'post',
        data: {
          amount: getAmount(),
          token
        }
      });
      if (response.status === 200) {
        console.log('payment successful');
        localStorage.removeItem('cart');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center row mt-5">
        <div className="col-md-8">
          <div>
            <h4>Shopping cart</h4>
          </div>
          {
            cart?.map(c => {
              return (
                <div key={c._id} className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
                  <div><img src={c?.image} width="70" /></div>
                  <div className="d-flex flex-column align-items-center product-details"><span className="font-weight-bold">{c?.name}</span>
                    <div className="d-flex flex-row product-desc">
                      <div className="size mr-1"><span className="text-grey">Category:</span><span className="font-weight-bold">{c?.category.name}</span></div>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center qty"><i className="fa fa-minus text-danger"></i>
                    <input type={"number"} value={1}></input><i className="fa fa-plus text-success"></i></div>
                  <div>
                    <h5 className="text-grey">${c.price}</h5>
                  </div>
                  <div className="d-flex align-items-center"><i onClick={() => deleteItem(c)} className="fa fa-trash mb-1 text-danger" style={{cursor: 'pointer'}}></i></div>
                </div>
              );
            })
          }
          <div className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded">
            <StripeCheckout
              stripeKey={publishableKey}
              label="Pay now"
              name="Pay with credit card"
              billingAddress
              shippingAddress
              amount={getAmount() * 100}
              description={`Your total is $${getAmount()}`}
              token={payNow}
              className="btn btn-block btn-lg ml-2"
            />          
          </div>
        </div>
      </div>
    </>
    // <div className="col-6 mx-auto mt-5">
    //     {
    //       cart.map(c => {
    //         return (
    //           <div>{c?.description}</div>
    //         );
    //       })
    //     }
    // </div>
  )
}

export default Cart;
