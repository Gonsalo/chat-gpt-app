import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setSelectedModel } from '../store/features/model.slice';

function ModelSelector() {
  const { models, selectedModel } = useAppSelector(({ model }) => model);
  const dispatch = useAppDispatch();

  const handleOnModelSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { currentTarget } = event;
    dispatch(setSelectedModel(currentTarget.selectedIndex));
  };

  return (
    <select
      className="rounded-md bg-gray-700 p-1 text-sm outline-none text-gray-200"
      onChange={handleOnModelSelectionChange}
      value={selectedModel?.value}
    >
      {models.map(({ name, value }) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </select>
  );
}

export default ModelSelector;
