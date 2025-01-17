import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBoard, IList, ITask } from "../../types";

type TBoardsState = {
  modalActive: boolean;
  boardArray : IBoard[];
}

type TBoardAction = {
  board: IBoard;
}

type TDeleteListAction = {
  boardId : string;
  listId : string;
}

type TAddListAction = {
  boardId : string;
  list : IList;
}

type TAddTaskAction = {
  boardId : string;
  listId : string;
  task : ITask;
}

const initialState : TBoardsState = {
  modalActive : false,
  boardArray : [
    {
      boardId : 'board-0',
      boardName : "첫 번재 게시물",
      lists : [
        {
          listId : 'lists-0',
          listName : 'list-1',
          tasks : [
            {
              taskId : 'task-0',
              taskName : 'Task 1',
              taskDescription : 'Description',
              taskOwner : 'Harry',
            },
            {
              taskId : 'task-1',
              taskName : 'Task 2',
              taskDescription : 'Description',
              taskOwner : 'Harry',
            }
          ]
        },
        {
          listId : 'lists-1',
          listName : 'list-2',
          tasks : [
            {
              taskId : 'task-3',
              taskName : 'Task 3',
              taskDescription : 'Description',
              taskOwner : 'Harry',
            }
          ]
        }
      ]
    }
  ]
}

const boardsSlice = createSlice({
  name : 'boards',
  initialState,
  reducers : {
    addBoard: (state, { payload } : PayloadAction<TBoardAction>) => {
      state.boardArray.push(payload.board);
    },

    addList : (state, { payload } : PayloadAction<TAddListAction>) => {
      state.boardArray.map(board => 
        board.boardId === payload.boardId
        ? {...board, lists: board.lists.push(payload.list)}
        : board
      )
    },

    addTask : (state, { payload } : PayloadAction<TAddTaskAction>) => {
      state.boardArray.map(board => 
        board.boardId === payload.boardId
        ? {
          ...board,
          lists: board.lists.map(list => 
            list.listId === payload.listId
            ? {
              ...list,
              tasks : list.tasks.push(payload.task)
            }
            : list
          )
        }
        : board
      )
    },

    deleteList: (state, {payload} : PayloadAction<TDeleteListAction>) => {
      state.boardArray = state.boardArray.map(
        board =>
        board.boardId === payload.boardId
        ?
        {
          ...board,
          lists: board.lists.filter(
            list => list.listId !== payload.listId
          )
        }
        :
        board
      )
    },
    setModalActive: (state, { payload } : PayloadAction<boolean>) => {
      state.modalActive = payload
    }
  }
})

export const {addBoard, deleteList, setModalActive, addTask, addList} = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;