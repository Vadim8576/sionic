import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { loadBasketToStorage, loadOrdersToStorage } from "../../helpFunctions/helpFunctions";
import { NavLink } from 'react-router-dom';
import {HistoriItemType} from "../../types/types"



interface OrderFormProps {
    saveOrder: (obj: HistoriItemType[]) => void
    cleanBasket: () => void
}


const OrderForm: React.FC<OrderFormProps> = ({ saveOrder, cleanBasket }) => {

    let [date, setDate] = useState('');
    let [time, setTime] = useState('');
    let [adress, setAdress] = useState('');
    let [name, setName] = useState('');
    let [tel, setTel] = useState('');

    let [orderIsReady, setSetOrderIsReady] = useState(false);

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

        const options: any = {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }
        let dateObject = new Date();
        let date: string = dateObject.toLocaleDateString('ru', options)
        return date;
    }



    const handleSubmit = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() !== false) {
            let orderList: HistoriItemType[] = loadOrdersToStorage()
            // console.log(orderList)

            const order: HistoriItemType[] =
            [...orderList,
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
            clearForm();
            setValidated(false);
            setSetOrderIsReady(true);


            return;

        }
        setValidated(true);
    };


    const dateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.currentTarget.value)
    }

    const timeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTime(e.currentTarget.value)
    }

    const adressInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAdress(e.currentTarget.value)
    }

    const nameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const telInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTel(e.currentTarget.value)
    }




    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        {/* <Form.Label>???????????????? ????????</Form.Label> */}
                        <Form.Control value={date} onChange={dateChange} type="date" placeholder="???????????????? ????????" required />
                        <Form.Control.Feedback type="invalid">
                            ?????????????? ???????????????? ????????.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        {/* <Form.Label>???????????????? ??????????</Form.Label> */}
                        <Form.Control value={time} onChange={timeChange} type="time" placeholder="???????????????? ??????????" required />
                        <Form.Control.Feedback type="invalid">
                            ?????????????? ???????????????? ??????????.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="validationCustom03">
                        <Form.Label>???????? ???????????????????</Form.Label>
                        <Form.Control value={adress} onChange={adressInput} type="text" placeholder="???????????????? ?????????? ????????????????" required />
                        <Form.Control.Feedback type="invalid">
                            ?????????????? ?????????? ????????????????.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label>??????</Form.Label>
                        <Form.Control
                            value={name}
                            onChange={nameInput}
                            required
                            type="text"
                            placeholder="?????????????? ??????"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label>??????????????</Form.Label>
                        <Form.Control
                            value={tel}
                            onChange={telInput}
                            required
                            type="tel"
                            placeholder="?????????????? ?????????? ????????????????"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Button type="submit">?????????????? ??????????</Button>
            </Form>
            {orderIsReady && (
                <>
                    <h3>?????????? ????????????!</h3>
                    <NavLink to={'/history'}>
                        ?????????????? ??????????????
                    </NavLink>
                </>)}
        </>
    );
}

export default OrderForm;