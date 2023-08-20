import React from 'react';

import { useAppDispatch, useAppSelector } from './store/store';
import './App.css';
import {
  loadApplication,
  pickApplicationDirectory,
} from './store/features/settings.slice';
import InsertOpenAiApiKeyPrompt from './components/modals/InsertOpenAiApiKeyPrompt';
import Chat from './Chat';
import SimpleTextButton from './components/buttons/SimpleTextButton';

function App() {
  const { isAppDirSet } = useAppSelector(({ settings }) => settings);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(loadApplication());
  }, [dispatch]);

  const handleOnChooseDirectoryClick = () => {
    dispatch(pickApplicationDirectory());
  };

  return (
    <div className="flex flex-row h-screen">
      {(!isAppDirSet && (
        <div className="flex flex-col items-center justify-center gap-y-2 mx-auto">
          <SimpleTextButton
            title="Choose directory"
            onClick={handleOnChooseDirectoryClick}
          />
          <div className="text-gray-300 w-full text-sm text-center">
            Please pick the directory where the application folder should be
            located.
          </div>
        </div>
      )) || <Chat />}
      <InsertOpenAiApiKeyPrompt />
    </div>
  );
}

export default App;
