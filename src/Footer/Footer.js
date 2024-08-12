import React from 'react';
import './styles.css'; // Отдельный файл стилей для компонента Header
import backgroundimage from './img/footer.png'
import TelegramIcon from '@mui/icons-material/Telegram';


const Footer = () => {
    const divStyle = {
        backgroundImage: `url(${backgroundimage})`,
        backgroundSize: 'cover', // Заставляет изображение покрывать весь фон
        backgroundRepeat: 'no-repeat', // Убирает повторения
        backgroundPosition: 'center', // Центрирует изображение
        backgroundColor: '#EBECF7', // Цвет фона на случай если изображение не загрузится
        width: '100vw', // 100% ширины окна браузера
        height: '300px'
    };
    return (
        <section style={divStyle}  className="footer">
            <div className="container">
                <div className='telegram_cont'>
                <a href='https://t.me/SigaShop_manager' target="_blank" className='telegram_btn'>
                    <div className='tg_bot__name'>Связаться с нами
                    <TelegramIcon sx={{marginLeft:'10px', marginTop:'3px'}} fontSize='large' color='#212395'/>
                </div>

                </a>
                <p className='all_rights'>&copy; Все права защищены</p>
                </div>
                
            </div>
        </section>
    )
}

export default Footer;