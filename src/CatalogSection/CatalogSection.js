import './styles.css'
import { styled } from '@mui/system';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { MenuItem, Select, TextField } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState, useRef, useEffect } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import fakeData from './fakeData.json';

// const fakeData = [
//     {id: 1, category_id: 1, name: 'Chapman Ice Cherry SS', price: 1000, description: `Формат кинг сайз.
//     Дубль хорошего качества.
//     Отличная альтернатива магазинными сигаретам.`, photo_url:'https://telegra.ph/file/ccb5ca4621dfcdfbf1115.jpg',proizvoditel: 'Азербайджан/Cahan Tobacco International', proizvodstvo: '',
//         aromat: `LEMON JELLY, HONEYDEW ICE CREAM, STRAWBERRY CUSTARD, WATERMELON FRESH, CHERRY LIME, APPLE GRAPE HALLS, JELLY BEARS, BARBERRY, RASPBERRY LEMONADE, BERRY ENERGY, MANGO PINACOLADA, COLA SODA ICE, WATERMELON BUBLEGUM, STRAWBERRY WATERMELON, MIXED BERRIES`, nikotin:'Смола - 4 мг Никотин - 0.3 мг'
//      },
//     {id: 2, category_id: 1, name: 'Tigranakert Black Slims', price: 1000, description: `Формат кинг сайз. Дубль хорошего качества. Отличная альтернатива магазинными сигаретам.`, photo_url:'https://telegra.ph/file/e664bc603256cff590912.jpg',proizvoditel: '', proizvodstvo: '',
//         aromat: '', nikotin:''
//      },
//     {id: 3, category_id: 1, name: 'Chapman Ice Cherry SS', price: 1000, description: '-', photo_url:'https://telegra.ph/file/ccb5ca4621dfcdfbf1115.jpg',proizvoditel: '', proizvodstvo: '',
//         aromat: '', nikotin:''
//      },
//     {id: 4, category_id: 1, name: 'Chapman Ice Cherry SS', price: 1000, description: '-', photo_url:'https://telegra.ph/file/ccb5ca4621dfcdfbf1115.jpg',proizvoditel: '', proizvodstvo: '',
//         aromat: '', nikotin:''
//      },
//     {id: 5, category_id: 1, name: 'Chapman Ice Cherry SS', price: 1000, description: '-', photo_url:'https://telegra.ph/file/ccb5ca4621dfcdfbf1115.jpg',proizvoditel: '', proizvodstvo: '',
//         aromat: '', nikotin:''
//      },
//     {id: 6, category_id: 1, name: 'Chapman Ice Cherry SS', price: 1000, description: '-', photo_url:'https://telegra.ph/file/ccb5ca4621dfcdfbf1115.jpg',proizvoditel: '', proizvodstvo: '',
//         aromat: '', nikotin:''
//      },
//     {id: 7, category_id: 1, name: 'Chapman Ice Cherry SS', price: 1000, description: '-', photo_url:'https://telegra.ph/file/ccb5ca4621dfcdfbf1115.jpg',proizvoditel: '', proizvodstvo: '',
//         aromat: '', nikotin:''
//      },
//     {id: 8, category_id: 1, name: 'Chapman Ice Cherry SS', price: 1000, description: '-', photo_url:'https://telegra.ph/file/ccb5ca4621dfcdfbf1115.jpg',proizvoditel: '', proizvodstvo: '',
//         aromat: '', nikotin:''
//      },
//     {id: 9, category_id: 1, name: 'Chapman Ice Cherry SS', price: 1000, description: '-', photo_url:'https://telegra.ph/file/ccb5ca4621dfcdfbf1115.jpg',proizvoditel: '', proizvodstvo: '',
//         aromat: '', nikotin:''
//      },
//     {id: 10, category_id: 1, name: 'Chapman Ice Cherry SS', price: 1000, description: '-', photo_url:'https://telegra.ph/file/ccb5ca4621dfcdfbf1115.jpg',proizvoditel: '', proizvodstvo: '',
//         aromat: '', nikotin:''
//      },
//     {id: 11, category_id: 1, name: 'Chapman Ice Cherry SS', price: 1000, description: '-', photo_url:'https://telegra.ph/file/ccb5ca4621dfcdfbf1115.jpg',proizvoditel: '', proizvodstvo: '',
//         aromat: '', nikotin:''
//      },
//     {id: 12, category_id: 3, name: 'Chapman Ice Cherry SS', price: 1000, description: '-', photo_url:'https://telegra.ph/file/ccb5ca4621dfcdfbf1115.jpg',proizvoditel: '', proizvodstvo: '',
//         aromat: '', nikotin:''
//      },
//     {id: 13, category_id: 3, name: 'Chapman Ice Cherry SS', price: 1000, description: '-', photo_url:'https://telegra.ph/file/ccb5ca4621dfcdfbf1115.jpg',proizvoditel: '', proizvodstvo: '',
//         aromat: '', nikotin:''
//      },
//     {id: 14, category_id: 3, name: 'Chapman Ice Cherry SS', price: 1000, description: '-', photo_url:'https://telegra.ph/file/ccb5ca4621dfcdfbf1115.jpg',proizvoditel: '', proizvodstvo: '',
//         aromat: '', nikotin:''
//      },
// ]


const categories = [
    { id: 1, name: "Сигареты  БЛОКАМИ" },
    { id: 2, name: "СИГАРИЛЛЫ" },
    { id: 3, name: "ОДНОРАЗКИ" },
    { id: 4, name: "ЖИДКОСТИ" },
    { id: 5, name: "ПОДЫ" },
    { id: 6, name: "КАРТРИДЖЫ" },
    { id: 7, name: "Сигареты Россия" },
];
const StyledPagination = styled(Pagination)(({ theme }) => ({
    '& .Mui-selected': {
        backgroundColor: '#EBECF7 !important',
        color: '#212395',
    },
}));

export default function CatalogSection({ addItemToCart }) {
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const containerRef = useRef(null);
    
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCurrentPage(1);
        setSelectedCategoryId(e.target.value);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleOpen = (item) => {
        setSelectedItem(item);
        setModalOpen(true);
    };

    const handleClose = () => {
        setSelectedItem(null);
        setModalOpen(false);
    };


    const filteredData = fakeData
        .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter(item => selectedCategoryId === '' || item.category_id === Number(selectedCategoryId));

    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // useEffect(() => {
    //     // Scroll to the top of the container whenever searchQuery, selectedCategoryId, or currentPage changes
    //     if (containerRef.current) {
    //         containerRef.current.scrollTop = 0;
    //     }
    // }, [searchQuery, selectedCategoryId, currentPage]);
    const handlePageChangeAndScroll = (event, value) => {
        // Прокрутка страницы вверх
        window.scrollTo({
          top: 800,
          behavior: 'smooth' // Плавная прокрутка
        });
        
        // Вызов оригинального обработчика запросов
        handlePageChange(event, value);
      };
    

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);



    
    return (
        <div  className="container">
            <div ref={containerRef}  id="catalogSection" className="controls" style={{ paddingTop: '100px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '60px' }}>
                <Select
                    value={selectedCategoryId}
                    onChange={handleCategoryChange}
                    displayEmpty
                    variant="outlined"
                    className='select_category'
                    style={{
                        borderRadius: '25px',
                        minWidth: '230px',
                        color: '#575757',
                        fontWeight: '600',
                        fontFamily: 'Montserrat, sans-serif', // Используем Montserrat здесь
                        height: '40px',
                        marginRight: '30px',
                    }}
                    inputProps={{
                        style: {
                            borderRadius: '25px',
                            color: '#575757',
                            fontFamily: 'Montserrat, sans-serif', // И тут тоже
                            padding: '0 10px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            boxSizing: 'border-box',
                        }
                    }}
                >
                    <MenuItem  value=''>
                        <div className='caregories-name-all'>Категории</div>
                    </MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>

                <TextField
                    type="text"
                    placeholder="Поиск..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    variant="outlined"
                    className='search_input'
                    size="small"
                    style={{
                        borderRadius: '25px',
                        minWidth: '230px',
                        height: '40px',
                    }}
                    InputProps={{
                        style: { 
                            borderRadius: '25px', 
                            height: '40px', 
                            display: 'flex',
                            alignItems: 'center', 
                            padding: '0 10px',
                            fontWeight:'600',
                            boxSizing: 'border-box',
                            fontFamily: 'Montserrat, sans-serif' // Устанавливаем Montserrat и для поля поиска
                        },
                        endAdornment: <SearchIcon style={{ color: '#575757' }} />
                    }}
                />
            </div>




            <div  className="catalog">
                {paginatedData.map(item => (
                    <div key={item.id} className="card_item">
                        <div className='card_item__info'>
                        
                            <img  src={item.photo_url} alt={item.name} />
                            <h3 className='card_item__name'>{item.name}</h3>
                            <p className='card_item__price'>Производство: {item.proizvoditel}</p>
                            <p className='card_item__price'>Никотин: {item.nikotin}</p>
                            <p className='card_item__name'>{item.price} руб</p>
                        </div>
                        <div className='btn_s btn_buy' onClick={() => addItemToCart({ ...item, quantity: 1 })}>
                            добавить
                            <ShoppingCartIcon sx={{ marginLeft: '10px' }} fontSize='small' />
                        </div>
                        <div className='btn_s btn_about'onClick={() => handleOpen(item)}>
                            подробнее
                        </div>
                    </div>
                ))}
            </div>

            <Stack style={{paddingTop:'40px', paddingBottom:'90px'}} className='pagination' spacing={2} alignItems="center">
                <StyledPagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChangeAndScroll}
                    
                    
                />
            </Stack>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    borderRadius:'25px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 'auto',
                    bgcolor: 'background.paper',
                   
                    boxShadow: 24,
                    p: 4,
                    pt: 6, // Оставляем немного пространства для крестика сверху
                }}>
                    {selectedItem && (
                        <div>
                           
                                <div className='back-from-about' onClick={handleClose}>Назад</div>
                               
                            <div className='card_column' style={{display:'flex', paddingTop:'15px'}}>
                            <div className='card_about_item'>
                            
                            <img src={selectedItem.photo_url} alt={selectedItem.name} style={{minWidth:"200px"}} width="300px" />
                            <p className='modal__title' id="modal-title">{selectedItem.name}</p>
                            </div>
                            <div className='left_modal'>
                            {selectedItem.description && selectedItem.description !== '-' && (
                                <p style={{ marginBottom: '10px' }} className='modaal_border' id="modal-description">
                                {selectedItem.description}
                                </p>
                            )}
                            {selectedItem.aromat && selectedItem.aromat !== '-' && (
                                <p style={{ marginBottom: '10px' }} className='modaal_border'>
                                    <b>Аромат:</b> {selectedItem.aromat}
                                </p>
                            )}
                            {selectedItem.proizvoditel && selectedItem.proizvoditel !== '-' && (
                                <p style={{ marginBottom: '10px' }} className='modaal_border'>
                                <b>Производитель:</b> {selectedItem.proizvoditel}
                                </p>
                            )}
                            {selectedItem.nikotin && selectedItem.nikotin !== '-' && (
                                <p style={{ marginBottom: '10px' }} className='modaal_border'>
                                <b>Никотин:</b> {selectedItem.nikotin}
                                </p>
                            )}

                            <p><b>Цена:</b> {selectedItem.price} руб</p>
                            <div className='btn_s btn_buy2' onClick={() => addItemToCart({ ...selectedItem, quantity: 1 })}>
                            добавить
                            <ShoppingCartIcon sx={{ marginLeft: '10px' }} fontSize='small' />
                        </div>
                            </div>
                            </div>
                        </div>
                    )}
                </Box>
            </Modal>


        </div>
    );
}

