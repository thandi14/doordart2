import React, { useEffect, useRef, useState } from "react";
import * as sessionActions from "../../store/session";
import * as cartActions from "../../store/shoppingcart";
import * as restaurantActions from "../../store/restaurants";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ItemForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useFilters } from "../../context/Filters";
import Instructions from "./Instructions";
import Recommendations from "./Recommendations";

function ItemFormModal({ itemId }) {
  const dispatch = useDispatch();
  const { restaurant }  = useSelector((state) => state.restaurants);
  const { cartItem, shoppingCart }  = useSelector((state) => state.cart);
  const { closeModal, setModalContent } = useModal();
  const history = useHistory()
  const [ quantity, setQuantity ] = useState(1)
  const [ ops, setOps ] = useState([])
  const { setItem, setCount, setSelections, selections, validation, setValidation, price, setPrice } = useFilters()
  const [ data, setData ] = useState({})
  const [ items, setItems ] = useState(selections);
  const [ optionIds, setOptionIds ] = useState([]);
  const targetRef = useRef()

  let options = cartItem.ItemOptions

  options = options?.filter((ops) => ops.ItemSelections.length > 0)

  useEffect(() => {
        setItems(selections)
        setPrice(0)
    }, [selections]);

  useEffect(() => {

    const handleDocumentClick = (event) => {
        if (targetRef.current && !targetRef.current.contains(event.target)) {
            setSelections({});
        }

      };

      document.addEventListener('click', handleDocumentClick);
      return () => {
          document.removeEventListener('click', handleDocumentClick);
      };

    }, []);


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
    const fetchData = async () => {
        await dispatch(cartActions.thunkGetCart(restaurant.id))
        let data = await dispatch(cartActions.thunkGetItem(itemId))
        let ops = data.ItemOptions;
        let selectedOptions = {}; // Object to store selected options and their selections

        if (ops && ops.length > 0) {
            for (let option of ops) {
                for (let selection of option.ItemSelections) {
                    if (selection.selected) {
                        const num = option.id;
                        if (!selectedOptions[num]) {
                            selectedOptions[num] = []; // Initialize array if not exists
                        }
                        selectedOptions[num].push(selection.id); // Add selection ID to array
                    }
                }
            }
        }

        setItems({
            ...items,
            ...selectedOptions,
        })

    };

    fetchData();

}, [dispatch, itemId]);

useEffect(() => {
    async function validateItem() {
        let required = []
        let ops = []
        ops = cartItem.ItemOptions?.filter((ops) => ops.ItemSelections.length > 0)
        if (ops?.length) {
            for (let o of ops) {
                if (o.required && !Object.keys(items).some((i) => i == o.id)) required.push(o.id)
                console.log(o)
            }

        }
        setValidation(required)
    }
    validateItem()

}, [dispatch, itemId, cartItem])

  const handleSubmit = async (e) => {

    const generateRandomSessionId = () => {
        return Math.random().toString(36).substring(2);
    };

    setCount(quantity)
    setItem(cartItem)
    let selections = Object.values(items)
    const ops = [].concat(...selections);
    let data = { itemId: cartItem.id, options: ops, quantity }
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
    setTimeout(() =>{
        setPrice(0)
    }, 2500)
    };

   options = options?.filter((op) => op.ItemSelections.sort((a, b) => b.selection.localeCompare(a.selection)))

  return (
    <div ref={targetRef} className="item-modal">
        <div id="close-item">
        <i onClick={(() => {
            setSelections({})
            setPrice(0)
            closeModal()})} class="fi fi-br-cross"></i>
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
                            { option.required && <span style={{ gap: "3px", display: "flex", alignItems: "center", color: optionIds.some((id) => option.id == id) || Object.keys(items).some((id) => option.id == id) ? "green" : "gold", fontSize: "11px"}}>
                                { optionIds.some((id) => option.id == id) || Object.keys(items).some((id) => option.id == id) ? <i style={{ width: "12px", height: "12px", fontSize: "12px" }} class="fi fi-sr-check-circle"></i> :
                                <i style={{ width: "12px", height: "12px", fontSize: "12px" }} class="fi fi-sr-triangle-warning"></i>}
                                 Required</span>}
                                { !option.required && <span style={{ gap: "3px", display: "flex", alignItems: "center", color: "grey", fontSize: "11px"}}>
                                (Optional)</span>}
                                <i style={{ width: "8px", height: "8px", fontSize: "8px" }} class="fi fi-sr-bullet"></i>
                            Select {!option.required && "up to"} {option.number}
                        </p>
                    {option.ItemSelections?.map((selection) =>
                    <>
                        {option.required ? <div style={{ position: "relative"}} onClick={(()=> {
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
                            { selection.ItemRecommendations?.length > 0 && <i onClick={(() => window.alert("Feature coming soon"))} style={{ width: "16px", height: "16px", fontSize: "16px", position: "absolute", right: "0" }}  class="fi fi-rr-angle-small-right"></i>}
                        </div>
                        :
                        <div style={{ position: "relative"}} onClick={(()=> {
                            items[option.id]?.some((i) => i == selection.id) ? removeItem(selection, option) : addItem(selection, option)
                            if (selection.price && !items[option.id]?.some((i) => i == selection.id) ) setPrice(price + selection.price)
                            if (selection.price && items[option.id]?.some((i) => i == selection.id) ) setPrice(price - selection.price)
                            if (selection.ItemRecommendations?.length) {
                                if (Object.values(items).length) setSelections(items)
                                setModalContent(<Recommendations val={validation} selection={selection} opIds={optionIds} itemId={itemId} items={items} op={option} />)
                            }
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
                                { selection.ItemRecommendations?.some((i) => items[option.id]?.includes(i.id)) && <p style={{ fontSize: "12px", fontWeight: "500" }}>
                                {selection.ItemRecommendations?.find((i) =>  items[option.id]?.includes(i.id)).recommendation}
                                </p>}
                                <p style={{ fontSize: "12px", color: "#767676", fontWeight: "500" }}>
                                 {selection.cals && selection.cals }
                                 {selection.price && ` + ${selection.price}`}
                                </p>
                                {items[option.id]?.some((i) => i == selection.id) && selection.ItemRecommendations?.length > 0 &&
                                       <div id="es">
                                       <p style={{ fontSize: "12px", fontWeight: "500" }}>
                                        Edit selection
                                        </p>
                                       </div>
                                }
                            </div>
                        { selection.ItemRecommendations?.length > 0 && <i onClick={(() => {
                            if (Object.values(items).length) setSelections(items)
                            setModalContent(<Recommendations val={validation} selection={selection}  opIds={optionIds} itemId={itemId} items={items} op={option}  />)
                            })} style={{ width: "16px", height: "16px", fontSize: "16px", position: "absolute", right: "0" }}  class="fi fi-rr-angle-small-right"></i>}
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
            <span onClick={(() => {
                setSelections(items)
                setModalContent(<Instructions />)})} style={{ cursor: "pointer"}}>
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
                 if (validation?.length == 0 ) {
                    handleSubmit()
                 }
            })}>
                {validation?.length == 0 ? "Add to cart" : `Make ${validation?.length} required selections` } - ${!options?.length ? cartItem.price * quantity : (validation.length == 0 && price == 0 ? cartItem.price * quantity : price == 0 ? 0 : (cartItem.price + price) * quantity)}
            </button>
        </div>
    </div>
  );
}

export default ItemFormModal;
