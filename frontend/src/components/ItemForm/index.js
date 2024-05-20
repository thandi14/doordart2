import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import * as cartActions from "../../store/shoppingcart";
import * as restaurantActions from "../../store/restaurants";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ItemForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useFilters } from "../../context/Filters";
import Instructions from "./Instructions";

function ItemFormModal({ itemId }) {
  const dispatch = useDispatch();
  const { restaurant }  = useSelector((state) => state.restaurants);
  const { cartItem, shoppingCart }  = useSelector((state) => state.cart);
  const { closeModal, setModalContent } = useModal();
  const history = useHistory()
  const [ quantity, setQuantity ] = useState(1)
  const [items, setItems] = useState({});
  const [ ops, setOps ] = useState([])
  const { setItem, setCount } = useFilters()
  const [ data, setData ] = useState({})
  const [ validation, setValidation ] = useState([])
  const [ optionIds, setOptionIds ] = useState([]);
  const [ price, setPrice ] = useState(0)

  let options = cartItem.ItemOptions

  useEffect(() => {
    console.log("Options:", options); // Log options to check its value

    // Function to add selected options to items state
    if (options && options.length > 0) {
            for (let i = 0; i < options.length; i++) {
                const option = options[i];
                // Check if the option is selected
                if (option.selected) {
                    // If selected, update the items state
                    const num = option.id;
                    setItems(prevItems => {
                        const currentArray = prevItems[num]?.length ? prevItems[num] : [];
                        const updatedArray = [...currentArray, option.id];
                        return {
                            ...prevItems,
                            [num]: updatedArray
                        };
                    });
                }
            }
    }

}, [dispatch, options, setItems]);


  const addItem = (selection, option) => {
    let num = option.id
    if (validation.includes(num)) {
        const updatedValidation = validation.filter(item => item !== num);
        setValidation(updatedValidation);
    }
    const newArray = [...optionIds, num];
    setOptionIds(newArray)
    const currentArray = items[num]?.length ? items[num] : [];
    const updatedArray = [...currentArray, selection.id];

    if (updatedArray.length > option.number && selection.optionId === option.id) {
      updatedArray.shift();
    }

    setItems({
      ...items,
      [num]: updatedArray
    });
  };

  const removeItem = (selection, option) => {
    const num = option.id;

    const newArray = optionIds.filter(id => id !== num);
    setOptionIds(newArray);

    const currentArray = items[num] || [];

    const updatedArray = currentArray.filter(id => id !== selection.id);

    setItems({
        ...items,
        [num]: updatedArray
    });
};



   useEffect(() => {
    async function validateItem() {
        let required = []
        let ops = []
        ops = cartItem.ItemOptions
        if (ops?.length) {
            for (let o of ops) {
                if (o.required) required.push(o.id)
            }

        }
        setValidation(required)
    }
    validateItem()

  }, [dispatch, itemId, options])

  useEffect(() => {
    async function fetchData() {
         await dispatch(cartActions.thunkGetItem(itemId))
         await dispatch(cartActions.thunkGetCart(restaurant.id))
       }
    fetchData()

  }, [dispatch, itemId])

  const handleSubmit = async (e) => {

    const generateRandomSessionId = () => {
        return Math.random().toString(36).substring(2);
    };



    // e.preventDefault();
    setCount(quantity)
    setItem(cartItem)
    let selections = Object.values(items)
    const ops = [].concat(...selections);
    let data = { itemId, options: ops, quantity }
    let data1
    if (!shoppingCart?.id) {
        let sessionId = localStorage.getItem('sessionId');

        if (!sessionId) sessionId = generateRandomSessionId();

        const requestBody = {
            sessionId,
        };

        localStorage.setItem('sessionId', sessionId);
        data1 = await dispatch(cartActions.thunkCreateCart(restaurant.id, requestBody))
        if (data1) await dispatch(cartActions.thunkCreateCartItem(data1.id, data))
    }
    if (shoppingCart?.id) await dispatch(cartActions.thunkCreateCartItem(shoppingCart.id, data))
    closeModal()
  };

//   options = options.filter((op) => op.required)
console.log(options)
console.log(items)
console.log(price)


  return (
    <div className="item-modal">
        <div id="close-item">
        <i onClick={(() => closeModal())} class="fi fi-br-cross"></i>
        </div>
        <div id="item-modal">
        <div className="item-one">
            <h1>{cartItem.item}</h1>
            {cartItem.cals && <p>{cartItem.cals} cal</p>}
            <p>{cartItem.description}</p>
        </div>
        <img style={{ width: "100%", marginBottom: "20px" }} src={cartItem.imgUrl}></img>
        <div className="item-two">
            {options?.length > 0 && options.map((option) =>
            <>
                <div id="item-options">
                    <h2 style={{ fontSize: "15px", margin: "0px" }}>{option.option}</h2>
                        <p style={{ margin: "6px 0px", gap: "3px", color: "#767676", fontSize: "11px", display: "flex", alignItems: "center"}}>
                            { option.required && <span style={{ gap: "3px", display: "flex", alignItems: "center", color: optionIds.some((id) => option.id == id) ? "green" : "gold", fontSize: "11px"}}>
                                { optionIds.some((id) => option.id == id) ? <i style={{ width: "12px", height: "12px", fontSize: "12px" }} class="fi fi-sr-check-circle"></i> :
                                <i style={{ width: "12px", height: "12px", fontSize: "12px" }} class="fi fi-sr-triangle-warning"></i>}
                                 Required</span>}
                                { !option.required && <span style={{ gap: "3px", display: "flex", alignItems: "center", color: "grey", fontSize: "11px"}}>
                                (Optional)</span>}
                                <i style={{ width: "8px", height: "8px", fontSize: "8px" }} class="fi fi-sr-bullet"></i>
                            Select {!option.required && "up to"} {option.number}
                        </p>
                    {option.ItemSelections?.map((selection) =>
                    <>
                        {option.required ? <div onClick={(()=> {
                            console.log(selection.price)
                            setPrice(price + selection.price)
                            addItem(selection, option)
                            })} id="item-selection">
                            { option.required &&
                            <>
                            {
                            items[option.id]?.some((i) => i == selection.id) ?
                            <i style={{ width: "16px", height: "16px", fontSize: "16px" }} class="fi fi-bs-dot-circle"></i> :
                            <i style={{ width: "16px", height: "16px", fontSize: "16px" }} class="fi fi-rr-circle"></i>
                            }
                            </>
                            }
                            <div>
                                <p style={{ fontSize: "14px", fontWeight: "500" }}>
                                {selection.selection}
                                </p>
                                <p style={{ fontSize: "12px", color: "#767676", fontWeight: "500" }}>
                                {selection.cals ? selection.cals : selection.price}
                                </p>
                            </div>
                        </div>
                        :
                        <div onClick={(()=> {
                            if (selection.price) setPrice(price + selection.price)
                            items[option.id]?.some((i) => i == selection.id) ? removeItem(selection, option) : addItem(selection, option)
                            })} id="item-selection">
                            { !option.required &&
                            <>
                            {
                            items[option.id]?.some((i) => i == selection.id) ?
                            <i class="fi fi-sr-square-x"></i> :
                            <i class="fi fi-rr-square"></i>
                            }
                            </>
                            }
                            <div>
                                <p style={{ fontSize: "14px", fontWeight: "500" }}>
                                {selection.selection}
                                </p>
                                <p style={{ fontSize: "12px", color: "#767676", fontWeight: "500" }}>
                                {selection.cals ? selection.cals : selection.price}
                                </p>
                            </div>
                        </div>}
                    </>
                    ).reverse()}
                </div>

            </>
            )
            }

        </div>
        <div style={{ marginTop: "15px"}} id="si">
            <span>
            <h2 style={{ fontSize: "16px"}}>Preferences</h2>
            <p style={{ fontSize: "14px", color: "#767676" }}>(Optional)</p>
            </span>
            <span onClick={(() => setModalContent(<Instructions />))} style={{ cursor: "pointer"}}>
            <p style={{ fontSize: "16px"}}>Add Special Instructions</p>
            <i style={{ fontSize: "20px", width: "20px", height: "20px" }} class="fi fi-rr-angle-small-right"></i>
            </span>
        </div>
        </div>
        <div id="buy-item">
            <div>
                <i style={{ curser: quantity == 1 ? "not-allowed" : "pointer" }} onClick={(() => {
                    if (quantity == 1) {
                        setQuantity(1)
                    }
                    else {
                        setQuantity(quantity - 1)
                    }
                })} class="fi fi-rr-minus-circle"></i>
                <span>
                    {quantity}
                    </span>
                <i onClick={(() => setQuantity(quantity + 1))} class="fi fi-rr-add"></i>
            </div>
            <button onClick={(() => {
                 if (Object.keys(items).length == validation) {
                    handleSubmit()
                 }
            })}>
                {validation.length == 0 ? "Add to cart" : `Make ${validation.length} required selections` } - ${!options?.length ? cartItem.price * quantity : (validation.length == 0 && price == 0 ? cartItem.price * quantity : price * quantity)}
            </button>
        </div>
    </div>
  );
}

export default ItemFormModal;
