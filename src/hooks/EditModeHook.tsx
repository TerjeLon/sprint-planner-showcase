import React, { useCallback, useState } from 'react';

interface EditModeInterface {
  active: boolean;
  taskId: number | null;
}

interface EditModeContext {
  currentEditMode: EditModeInterface;
  setCurrentEditMode: (editMode: EditModeInterface) => void;
}

export const EDIT_MODE_DEFAULT_VALUE: EditModeContext = {
  currentEditMode: {
    active: false,
    taskId: null,
  },
  setCurrentEditMode: () => {}
}

export const EditModeContext = React.createContext<EditModeContext>(EDIT_MODE_DEFAULT_VALUE);

export const useEditMode = (): EditModeContext => {
  const [current, setEditMode] = useState<EditModeInterface>({
    active: false,
    taskId: null
  });

  const setCurrentEditMode = useCallback((editMode: EditModeInterface): void => {
    setEditMode(editMode);
  }, [])

  return {
    currentEditMode: current,
    setCurrentEditMode
  }
}
