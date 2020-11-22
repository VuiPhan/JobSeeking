import React, { useState,useEffect } from "react";
import ReactDOM from "react-dom";
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import LoadSheduleList from '../../api/loadSheduleList';
// Use your own styles to override the default styles
import "./styles.css";

var board = {
  columns: [
    {
      id: 1,
      title: "Vui",
      cards: [
        {
          id: 1,
          title: "Card title 1",
          description: "Card content"
        },
        {
          id: 2,
          title: "Card title 2",
          description: "Card content"
        },
        {
          id: 3,
          title: "Card title 3",
          description: "Card content"
        }
      ]
    },
    {
      id: 2,
      title: "Dep",
      cards: [
        {
          id: 9,
          title: "Card title 9",
          description: "Card content"
        }
      ]
    },
    {
      id: 3,
      title: "Q&A",
      cards: [
        {
          id: 10,
          title: "Card title 10",
          description: "Card content"
        },
        {
          id: 11,
          title: "Card title 11",
          description: "Card content"
        }
      ]
    },
    {
      id: 4,
      title: "Production",
      cards: [
        {
          id: 12,
          title: "Card title 12",
          description: "Card content"
        },
        {
          id: 13,
          title: "Card title 13",
          description: "Card content"
        }
      ]
    }
  ]
};
const board2 = {
  columns: [
    {
      id: 1,
      title: "Backlogssss",
      cards: [
        {
          id: 1,
          title: "Card title 1",
          description: "Card content"
        },
        {
          id: 2,
          title: "Card title 2",
          description: "Card content"
        },
        {
          id: 3,
          title: "Card title 3",
          description: "Card content"
        }
      ]
    },
    {
      id: 2,
      title: "Doing",
      cards: [
        {
          id: 9,
          title: "Card title 9",
          description: "Card content"
        }
      ]
    },
    {
      id: 3,
      title: "Q&A",
      cards: [
        {
          id: 10,
          title: "Card title 10",
          description: "Card content"
        },
        {
          id: 11,
          title: "Card title 11",
          description: "Card content"
        }
      ]
    },
    {
      id: 4,
      title: "Production",
      cards: [
        {
          id: 12,
          title: "Card title 12",
          description: "Card content"
        },
        {
          id: 13,
          title: "Card title 13",
          description: "Card content"
        }
      ]
    }
  ]
};

export default function ControlledBoard() {
  // You need to control the state yourself.
  const [controlledBoard, setBoard] = useState(board2);
  // setBoard(board2);
  function handleCardMove(_card, source, destination) {
    const updatedBoard = moveCard(controlledBoard, source, destination);
    const itemMove = {From: source.fromColumnId,To:destination.toColumnId,IdItem:_card.id}
    LoadSheduleList.post(itemMove);
    setBoard(updatedBoard);
  }
  const onCardClick2 = (cardId, metadata, laneId) =>{
  }



  const fetchSheduleList = async () =>{
    setBoard(board2);
    try{
       let responseUpdate = await LoadSheduleList.get(56);
      //  board =responseUpdate;
       // setBoard(responseUpdate);
       board.columns = responseUpdate;
       setBoard(board);
    }
    catch (error){
        console.error();
    }
  }
  useEffect(() => {
    fetchSheduleList();
    //setBoard(board);
   }, [])
  return (
    
    <Board onCardDragEnd={handleCardMove} onClick={onCardClick2} disableColumnDrag>
      {controlledBoard}
    </Board>
  );
}
