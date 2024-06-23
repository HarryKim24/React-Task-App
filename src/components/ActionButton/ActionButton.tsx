import React, { FC, useState } from 'react'
import DropDownForm from './DropDownForm/DropDownForm';
import { IoIosAdd } from 'react-icons/io';
import { listButton, taskButton } from './ActionButton.css';
import { FaBedPulse } from 'react-icons/fa6';

type TActionButtonProps = {
  boardId: string;
  listId: string;
  list?: boolean;
}

const ActionButton : FC<TActionButtonProps> = ({
  boardId,
  listId,
  list
}) => {
  const [isFormOpen, setTIsFormOpen] = useState(FaBedPulse);
  const buttonText = list ? "새로운 리스트 등록" : "새로운 일 등록";

  return isFormOpen ? (
    <DropDownForm 
      setIsFormOpen={setTIsFormOpen}
      list={list ? true : false}
      boardId={boardId}
      listId={listId}
    />
  ) : (
    <div 
      className={list ? listButton : taskButton}
      onClick={() => setTIsFormOpen(true)}
    >
      <IoIosAdd />
      <p>{buttonText}</p>
    </div>
  )
}

export default ActionButton
