import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { loadBasketToStorage, loadOrdersToStorage } from "../../helpFunctions/helpFunctions";


const OrderForm = ({saveOrder, cleanBasket}) => {

    let [date, setDate] = useState('');
    let [time, setTime] = useState('');
    let [adress, setAdress] = useState('');
    let [name, setName] = useState('');
    let [tel, setTel] = useState('');

    const [validated, setValidated] = useState(false);

    const clearForm = () => {
        setDate('');
        setTime('');
        setAdress('');
        setName('');
        setTel('');
        cleanBasket();
    }

    const getDate = () => {
        const options = {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }
        let date = new Date();
        date = date.toLocaleDateString('ru', options)
        return date;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() !== false) {       
            let orderList = loadOrdersToStorage()
            console.log(orderList)

            const order = [...orderList, 
                {
                    products: [...loadBasketToStorage()],
                    date,
                    time,
                    adress,
                    name,
                    tel,
                    orderData: getDate()
                }
            ]

            saveOrder(order);
            // clearForm();
            setValidated(false);
            return;
            
        } 
        setValidated(true);       
    };


    const dateChange = (e) => {
        setDate(e.currentTarget.value)
    }

    const timeChange = (e) => {
        setTime(e.currentTarget.value)
    }

    const adressInput = (e) => {
        setAdress(e.currentTarget.value)
    }

    const nameInput = (e) => {
        setName(e.currentTarget.value)
    }

    const telInput = (e) => {
        setTel(e.currentTarget.value)
    }




    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                    {/* <Form.Label>Выберите дату</Form.Label> */}
                    <Form.Control value={date}  onChange={(e) => dateChange(e)} type="date" placeholder="Выберите дату" required />
                    <Form.Control.Feedback type="invalid">
                        Укажите валидную дату.
                    </Form.Control.Feedback>
                    
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                    {/* <Form.Label>Выберите время</Form.Label> */}
                    <Form.Control value={time} onChange={(e) => timeChange(e)} type="time" placeholder="Выберите время" required />
                    <Form.Control.Feedback type="invalid">
                        Укажите валидное время.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom03">
                    <Form.Label>Куда доставить?</Form.Label>
                    <Form.Control value={adress} onChange={(e) => adressInput(e)} type="text" placeholder="Выберите адрес доставки" required />
                    <Form.Control.Feedback type="invalid">
                        Укажите адрес доставки.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control
                        value={name}
                        onChange={(e) => nameInput(e)}
                        required
                        type="text"
                        placeholder="Введите имя"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Телефон</Form.Label>
                    <Form.Control
                        value={tel} 
                        onChange={(e) => telInput(e)}
                        required
                        type="tel"
                        placeholder="Введите номер телефона"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button type="submit">Сделать заказ</Button>
        </Form>
    );
}

export default OrderForm;