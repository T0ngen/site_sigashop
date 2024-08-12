import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import WelcomeSection from '../WelcomeSection/WelcomeSection';
import CatalogSection from '../CatalogSection/CatalogSection';
import Footer from '../Footer/Footer';

export default function MainPage() {
    const [cartItems, setCartItems] = useState([]);

    const setCartItemsFull = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    useEffect(() => {
        const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(savedCartItems);
    }, []);

    const addItemToCart = (item) => {
        const updatedCartItems = [...cartItems, item];
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const updateItemQuantity = (index, quantity) => {
        const updatedCartItems = cartItems.map((item, i) => {
            if (i === index) {
                return { ...item, quantity: Math.max(item.quantity + quantity, 1) };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };
    const removeItemFromCart = (index) => {
        const updatedCartItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };


    return (
        <>
            <Header 
                cartItems={cartItems}
                addItemToCart={addItemToCart}
                updateItemQuantity={updateItemQuantity}
                removeItemFromCart={removeItemFromCart}
                setCartItemsFull={setCartItemsFull}
            />
            <WelcomeSection />
            <CatalogSection addItemToCart={addItemToCart} />
            <Footer />
        </>
    );
}