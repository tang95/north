import { AppRootProps } from '@grafana/data';
import { SceneApp } from '@grafana/scenes';
import { Alert } from '@grafana/ui';
import React, { useMemo } from 'react';
import { getHomePage } from '../../pages/Home';
import { PluginPropsContext, usePluginJsonData } from '../../utils/utils.plugin';
import { ConfigProps } from '../AppConfig/AppConfig';

function getSceneApp(config: ConfigProps) {
  return new SceneApp({
    pages: [getHomePage(config)],
    urlSyncOptions: {
      updateUrlOnInit: true,
      createBrowserHistorySteps: true,
    },
  });
}

function AppWithScenes() {
  const jsonData = usePluginJsonData();
  const scene = useMemo(() => {
    if (jsonData && jsonData.datasourceUid && jsonData.folderUid) {
      return getSceneApp({
        datasourceUid: jsonData.datasourceUid,
        folderUid: jsonData.folderUid
      });
    }
    return;
  }, [jsonData]);
  
  if (!jsonData || !jsonData.datasourceUid || !jsonData.folderUid) {
    return (
      <Alert title={`Configuration Missing`}>
        Please configure the plugin to proceed.
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
