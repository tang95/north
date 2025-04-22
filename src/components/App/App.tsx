import { AppRootProps } from '@grafana/data';
import { SceneApp } from '@grafana/scenes';
import { Alert } from '@grafana/ui';
import React, { useMemo } from 'react';
import { getHomePage } from '../../pages/Home';
import { PluginPropsContext, usePluginJsonData } from '../../utils/utils.plugin';
import { JsonData } from '../AppConfig/AppConfig';

function getSceneApp(jsonData: JsonData) {
  return new SceneApp({
    pages: [getHomePage(jsonData)],
    urlSyncOptions: {
      updateUrlOnInit: true,
      createBrowserHistorySteps: true,
    },
  });
}

function AppWithScenes() {
  const jsonData = usePluginJsonData();
  const scene = useMemo(() => {
    if (jsonData) {
      return getSceneApp(jsonData);
    }
    return;
  }, [jsonData]);
  
  if (!jsonData) {
    return (
      <Alert title={`Configuration Missing`}>
        Please configure the application to proceed.
      </Alert>
    );
  }

  return (
    <>
      {scene && <scene.Component model={scene} />}
    </>
  );
}

function App(props: AppRootProps) {
  return (
    <PluginPropsContext.Provider value={props}>
      <AppWithScenes />
    </PluginPropsContext.Provider>
  );
}

export default App;