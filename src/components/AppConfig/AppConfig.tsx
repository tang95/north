import { css } from '@emotion/css';
import {
    AppPluginMeta,
    DataSourceInstanceSettings,
    GrafanaTheme2,
    PluginConfigPageProps,
    PluginMeta
} from '@grafana/data';
import { DataSourcePicker, getBackendSrv, locationService } from '@grafana/runtime';
import { Button, Field, Input, useStyles2 } from '@grafana/ui';
import React, { useState } from 'react';
import { lastValueFrom } from 'rxjs';

const supportedDataSourceTypes = ['grafana-clickhouse-datasource']

export type ConfigProps = {
    datasourceUid: string;
    folderUid: string;
}

export type JsonData = {
    datasourceUid?: string;
    folderUid?: string;
};

export interface AppConfigProps extends PluginConfigPageProps<AppPluginMeta<JsonData>> {
}

const AppConfig = ({ plugin }: AppConfigProps) => {
    const styles = useStyles2(getStyles);
    const { enabled, pinned, jsonData } = plugin.meta;
    const [state, setState] = useState<JsonData>(jsonData || {});

    const updateData = (data: JsonData) => {
        setState({
            ...state,
            ...data,
        });
    };

    const onSubmit = () => {
        updatePluginAndReload(plugin.meta.id, {
            enabled,
            pinned,
            jsonData: state,
        });
    };

    return (
        <form onSubmit={onSubmit}>
            <Field label="Data Source">
                <DataSourcePicker
                    filter={(ds) => supportedDataSourceTypes.includes(ds.type)}
                    current={state.datasourceUid}
                    noDefault={true}
                    width={40}
                    onChange={(ds: DataSourceInstanceSettings) =>
                        updateData({
                            datasourceUid: ds.uid,
                        })
                    }
                    onClear={() => updateData({ datasourceUid: undefined })}
                />
            </Field>
            <Field label="Folder">
                <Input placeholder="Folder"
                    width={40}
                    value={state.folderUid}
                    onChange={(e) => updateData({
                        folderUid: (e.target as HTMLInputElement).value
                    })}
                />
            </Field>
            <Button type="submit" className={styles.marginTop}>
                Save
            </Button>
        </form>
    );
};

export default AppConfig;

const getStyles = (theme: GrafanaTheme2) => ({
    marginTop: css`
    margin-top: ${theme.spacing(3)};
  `,
});

const updatePluginAndReload = async (pluginId: string, data: Partial<PluginMeta<JsonData>>) => {
    try {
        await updatePlugin(pluginId, data);

        // Reloading the page as the changes made here wouldn't be propagated to the actual plugin otherwise.
        // This is not ideal, however unfortunately currently there is no supported way for updating the plugin state.
        locationService.reload();
    } catch (e) {
        console.error('Error while updating the plugin', e);
    }
};

export const updatePlugin = async (pluginId: string, data: Partial<PluginMeta>) => {
    const response = getBackendSrv().fetch({
        url: `/api/plugins/${pluginId}/settings`,
        method: 'POST',
        data,
    });

    const dataResponse = await lastValueFrom(response);

    return dataResponse.data;
};
