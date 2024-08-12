import React from 'react';

const Cart = ({ cartItems }) => {
    return (
        <div className="cart">
            <h2>Корзина</h2>
            {cartItems.length === 0 && <p>Корзина пуста</p>}
            {cartItems.map((item, index) => (
                <div key={index} className="cart_item">
                    <p>{item.name} - {item.price} руб</p>
                </div>
            ))}
        </div>
    );
};

export default Cart;
