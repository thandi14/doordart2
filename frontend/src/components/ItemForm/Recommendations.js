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
import ItemFormModal from ".";

function Recommendations({ selection, itemId, items, opIds, op }) {
  const dispatch = useDispatch();
  const { restaurant }  = useSelector((state) => state.restaurants);
  const { cartItem, shoppingCart }  = useSelector((state) => state.cart);
  const { closeModal, setModalContent } = useModal();
  const history = useHistory()
  const [ ops, setOps ] = useState([])
  const { setItem, setCount, setSelections, selections } = useFilters()
  const [ data, setData ] = useState({})
  const [ itemsTwo, setItemsTwo ] = useState(items);
  const [ validation, setValidation ] = useState([])
  const [ optionIds, setOptionIds ] = useState(opIds);
  const [ price, setPrice ] = useState(0)
  const targetRef = useRef()

  let options = selection.ItemRecommendations

  useEffect(() => {
    if (!opIds) {
        setOptionIds([])

    }

    let num = op.id

    if (!itemsTwo[num]?.includes(selection.id)) {

        const newArray = [...optionIds, num];
        setOptionIds(newArray)
        const currentArray = itemsTwo[num]?.length ? itemsTwo[num] : [];
        const updatedArray = [...currentArray, selection.id];
        setItemsTwo({
            ...itemsTwo,
            [num]: updatedArray
        });
        setSelections(itemsTwo)

    }

  }, [opIds, op]);

  console.log(itemsTwo)

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


  const addItem = (s, option, recommendation) => {



    console.log(recommendation)

    let num = option.id

    if (validation.length < recommendation.number && s.optionId === recommendation.id) {
        setValidation([...validation, num]);
    }

    const newArray = [...optionIds, num];
    setOptionIds(newArray)
    const currentArray = itemsTwo[num]?.length ? itemsTwo[num] : [];
    const updatedArray = [...currentArray, s.id];

    if (updatedArray.length > recommendation.number && s.optionId === recommendation.id) {
      updatedArray.shift();
    }

    setItemsTwo({
      ...itemsTwo,
      [num]: updatedArray
    });

  };

  const removeItem = (selection, option) => {
    const num = option.id;

    const newArray = optionIds.filter(id => id !== num);
    setOptionIds(newArray);

    const currentArray = items[num] || [];

    const updatedArray = currentArray.filter(id => id !== selection.id);

    setItemsTwo({
        ...itemsTwo,
        [num]: updatedArray
    });
  };



    useEffect(() => {
        let ops = selection.ItemRecommendations;
        let selectedOptions = {}; // Object to store selected options and their selections

        if (ops && ops.length > 0) {
                for (let selection of ops) {
                    if (selection.selected) {
                        const num = selection.optionId;
                        if (!selectedOptions[num]) {
                            selectedOptions[num] = []; // Initialize array if not exists
                        }
                        selectedOptions[num].push(selection.id); // Add selection ID to array
                    }
                }
        }

        setItemsTwo(selectedOptions)

    }, [dispatch, itemId]);

    console.log(selection)

  const handleSubmit = async (e) => {
      setSelections(itemsTwo)
      setModalContent(<ItemFormModal />)
    };

  let recommendations = selection.ItemRecommendations.sort((a, b) => a.recommendation.localeCompare(b.recommendation))
  let option = selection.ItemRecommendations.find((r) => r.ItemOption).ItemOption

console.log(validation)
console.log(op)

  return (
    <div ref={targetRef} className="item-modal">
        <div style={{ display: "flex", gap: "10px"}} id="instruct-item">
        <i onClick={(() => setModalContent(<ItemFormModal />))} class="fi fi-rr-arrow-small-left"></i>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px", paddingTop: "16px"}} >
        <p style={{ fontSize: "14px", margin: "0px"}}>{cartItem.item}</p>
        <h1 style={{ fontSize: "16px", margin: "0px"}} >{selection.selection}</h1>
        </div>
        </div>
        <div style={{ marginBottom: "20px" }} id="item-modal">
        <div className="item-two">
                <div id="item-options">
                    <h2 style={{ fontSize: "15px", margin: "0px" }}>{option.option}</h2>
                        <p style={{ margin: "6px 0px", gap: "3px", color: "#767676", fontSize: "11px", display: "flex", alignItems: "center"}}>
                            { option?.required && <span style={{ gap: "3px", display: "flex", alignItems: "center", color: optionIds.some((id) => option.id == id) ? "green" : "gold", fontSize: "11px"}}>
                                { optionIds.some((id) => option.id == id) ? <i style={{ width: "12px", height: "12px", fontSize: "12px" }} class="fi fi-sr-check-circle"></i> :
                                <i style={{ width: "12px", height: "12px", fontSize: "12px" }} class="fi fi-sr-triangle-warning"></i>}
                                 Required</span>}
                                { !option.required && <span style={{ gap: "3px", display: "flex", alignItems: "center", color: "grey", fontSize: "11px"}}>
                                (Optional)</span>}
                                <i style={{ width: "8px", height: "8px", fontSize: "8px" }} class="fi fi-sr-bullet"></i>
                            Select {!option.required && "up to"} {option.number}
                        </p>
                    {recommendations?.map((selection) =>
                    <>
                        {selection.ItemOption?.required ? <div onClick={(()=> {
                            console.log(selection.price)
                            setPrice(price + selection.price)
                            addItem(selection, selection.ItemOption)
                            })} id="item-selection">
                            { selection.ItemOption?.required &&
                            <>
                            {
                            itemsTwo[op.id]?.some((i) => i == selection.id) ?
                            <i style={{ width: "16px", height: "16px", fontSize: "16px" }} class="fi fi-bs-dot-circle"></i> :
                            <i style={{ width: "16px", height: "16px", fontSize: "16px" }} class="fi fi-rr-circle"></i>
                            }
                            </>
                            }
                            <div>
                                <p style={{ fontSize: "14px", fontWeight: "500" }}>
                                {selection.recommendation}
                                </p>
                                <p style={{ fontSize: "12px", color: "#767676", fontWeight: "500" }}>
                                {selection.cals ? selection.cals : selection.price}
                                </p>
                            </div>
                        </div>
                        :
                        <div onClick={(()=> {
                            if (selection.price) setPrice(price + selection.price)
                            if (selection.ItemRecommendations?.length) setModalContent(<Recommendations selection={selection} itemId={itemId} items={items} opIds={optionIds} op={op}/>)
                            itemsTwo[op.id]?.some((i) => i == selection.id) ? removeItem(selection, op, selection.ItemOption) : addItem(selection, op, selection.ItemOption)
                            })} id="item-selection">
                            { !selection.ItemOption?.required &&
                            <>
                            {
                            itemsTwo[op.id]?.some((i) => i == selection.id) ?
                            <i class="fi fi-sr-square-x"></i> :
                            <i class="fi fi-rr-square"></i>
                            }
                            </>
                            }
                            <div>
                                <p style={{ fontSize: "14px", fontWeight: "500" }}>
                                {selection.recommendation}
                                </p>
                                <p style={{ fontSize: "12px", color: "#767676", fontWeight: "500" }}>
                                {selection.cals ? selection.cals : selection.price}
                                </p>
                            </div>
                        </div>}
                    </>
                    )}
                </div>
        </div>
        </div>
        <div id="buy-item">
            <button style={{ width: "100%", justifyContent: "center", }} onClick={(() => {
                 if (validation.length > 0) {
                    handleSubmit()
                 }
            })}>
                {validation.length > 0 ? "Save" : `Make 1 required selection` }
            </button>
        </div>
    </div>
  );
}

export default Recommendations;
