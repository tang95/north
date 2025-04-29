import { AppRootProps } from '@grafana/data';
import { SceneApp } from '@grafana/scenes';
import { Alert, LinkButton, Stack } from '@grafana/ui';
import React, { useMemo } from 'react';
import pluginJson from '../../plugin.json';
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
      <div style={{ maxWidth: '80%', margin: '40px auto', padding: '24px' }}>
        <Alert severity="warning" title="Configuration Missing">
          <Stack direction="column" gap={2}>
            <p>Please configure the plugin to proceed. You need to set up:</p>
            <ul>
              <li>Data Source UID (datasourceUid)</li>
              <li>Folder UID (folderUid)</li>
            </ul>
            <div style={{ marginTop: '16px' }}>
              <LinkButton variant="primary" href={`/plugins/${pluginJson.id}`}>Go to Plugin Configuration</LinkButton>
            </div>
          </Stack>
        </Alert>
      </div>
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
