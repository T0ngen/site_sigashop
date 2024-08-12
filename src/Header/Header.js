import React, { useState } from 'react';
import './header.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import TelegramIcon from '@mui/icons-material/Telegram';
import { useNavigate } from 'react-router-dom';


const BOT_TOKEN = process.env.REACT_APP_BOT_TOKEN;
const CHAT_ID = process.env.REACT_APP_CHAT_ID;


const sendMessageToTelegram = async (message) => {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const payload = {
        chat_id: CHAT_ID,
        text: message
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log('Telegram response:', data);
    } catch (error) {
        console.error('Error sending message to Telegram:', error);
    }
};



const OrderConfirmationModal = ({ isOpen, onClose, orderNumber }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
            <CloseIcon onClick={onClose} className="close-icon" fontSize="large" />
                <h2>Ваш заказ №{orderNumber}</h2>
                <p style={{paddingTop:'15px'}}>Для оформления заказа свяжитесь с менеджером</p>
                <div style={{display:"flex", justifyContent:"center", paddingTop:'20px'}}>
                <a href='https://t.me/SigaShop_manager' target="_blank" className='telegram_btn'>
                    <div className='tg_bot__name'>Связаться с нами
                    <TelegramIcon sx={{marginLeft:'10px', marginTop:'3px'}} fontSize='large' color='#212395'/>
                </div>
                </a>
                </div>
            </div>
        </div>
    );
};

const formatCartItems = (items) => {
    return items.map(item => `${item.name}, Цена: ${item.price}`).join('\n');
};



const Header = ({ cartItems, removeItemFromCart, setCartItemsFull }) => {
    const [cartOpen, setCartOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderNumber, setOrderNumber] = useState(null);

    


    const removeAllItemsFromCart = () => {
        setCartItemsFull([]);
    };

    const toggleCartOpen = () => {
        setCartOpen(prev => !prev);
        document.body.classList.toggle('no-scroll', !cartOpen);
    };

    const closeCart = () => {
        setCartOpen(false);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    const handleCheckout = () => {
        // Генерация случайного 6-значного числа
        console.log(cartItems)
        const randomOrderNumber = Math.floor(100000 + Math.random() * 900000);
        setOrderNumber(randomOrderNumber);
        
        const message = `заказ №${randomOrderNumber}\n\n${formatCartItems(cartItems)}\n\nПолная Цена: ${calculateTotal()}`;
        sendMessageToTelegram(message);
       
        setIsModalOpen(true);
    
        
        
    
    
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const navigate = useNavigate();

    const handleClick = () => {
        
        navigate(`/about`);
    };
    const handleClick2 = () => {
        
        navigate(`/delivery`);
    };
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

   
    

      

    return (
        <>
            <div className={`overlay ${cartOpen && 'open'}`} onClick={closeCart}></div>
            <header className="header">
                <div className="container">
                    <div className="rows">
                        <div className="hamburger" onClick={toggleMenu}>
                            <div className={`line ${menuOpen ? 'open' : ''}`}></div>
                            <div className={`line ${menuOpen ? 'open' : ''}`}></div>
                            <div className={`line ${menuOpen ? 'open' : ''}`}></div>
                        </div>

                        <ul className={`links_container ${menuOpen ? 'open' : ''}`}>
                            <li className="link-container">
                                <a onClick={() => handleClick()} className="link_text">О нас</a>
                            </li>
                            <li className="link-container">
                                <a onClick={() => handleClick2()} className="link_text">Доставка и оплата</a>
                            </li>
                            <li className="link-container">
                                <a href="https://t.me/SigaShopBot" target='_blank' className="link_text">Telegram Bot</a>
                            </li>
                        </ul>
                        <div className="cart-container">
                            <ShoppingCartIcon onClick={toggleCartOpen} className={`shop-cart-btn ${cartOpen && 'active'}`} fontSize="large" />
                            {cartItems.length > 0 && (
                                <span className="cart-count">
                                    {cartItems.length}
                                </span>
                            )}
                            <div className={`shop-cart ${cartOpen && 'open'}`}>
                                <div className="shop-cart-header">
                                    <CloseIcon onClick={toggleCartOpen} className="close-icon" fontSize="large" />
                                </div>
                                {cartItems.length === 0 ? (
                                    <p style={{ textAlign: 'center', paddingTop: '20px' }}>Корзина пуста</p>
                                ) : (
                                    <div className="cart-items">
                                        <ul>
                                            {cartItems.map((item, index) => (
                                                <li key={index} className="cart-item">
                                                    <img src={item.photo_url} alt={item.name} width={50} />
                                                    <p>{item.name}</p>
                                                    <p>{item.price} руб</p>
                                                    <button onClick={() => removeItemFromCart(index)} className="delete-btn">
                                                        <DeleteIcon className="delete-icon" />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="cart-total">
                                            <p>Итого: {calculateTotal()} руб</p>
                                            <div>
                                                <button onClick={removeAllItemsFromCart} className="btn_delete_all">Удалить все</button>
                                                <div onClick={handleCheckout} className="btn_s btn_buy">Оформить заказ</div>
                                            </div>
                                            <OrderConfirmationModal isOpen={isModalOpen} onClose={handleCloseModal} orderNumber={orderNumber} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;