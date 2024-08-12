import React from 'react';
import backgroundimage from './img/maindisplay.png'
import { Link, animateScroll as scroll } from 'react-scroll';



import './styles.css';
export default function WelcomeSection(){
    const divStyle = {
        backgroundImage: `url(${backgroundimage})`,
        backgroundSize: 'cover', // Заставляет изображение покрывать весь фон
        backgroundRepeat: 'no-repeat', // Убирает повторения
        backgroundPosition: 'center', // Центрирует изображение
        backgroundColor: '#EBECF7', // Цвет фона на случай если изображение не загрузится
        width: '100vw', // 100% ширины окна браузера
    };

    
    return(
        <> 
        <div style={divStyle}>
        <div   className='container'>
            <div  className='main_section'>
               <div className='main__text_container'>
                   <h1 className='main__text'>Сигареты оптом и в розницу</h1>
                   <div className='rows text_container'>
                        <div className='desctiprions_cont'>
                        <p className='main__description'>Широкий ассортимент продукции</p>
                        <p className='main__description2'>от лучших производителей</p>
                        </div>

                       <div className='btn_cont'>
                       <Link to="catalogSection" smooth={false} duration={500} >
                       <div className='btn_medium'>
                            каталог
                       </div>

                                </Link>

                       </div>
                   </div>
               </div>
               <div className='main_info_cont'>
                    <p className='main_info_text'>Информация, размещенная на сайте </p>
                    <p style={{fontWeight:'600'}} className='main_info_text'>предоставлена для ознакомления</p>
                    <p className='main_info_text'>и не является публичной офретой</p>
               </div>
            </div>
        </div>
        </div>
        </>
    )
}

