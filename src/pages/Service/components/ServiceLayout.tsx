import { getBackendSrv } from "@grafana/runtime";
import { SceneAppPage, SceneAppPageLike, SceneAppPageState, SceneComponentProps } from "@grafana/scenes";
import { LoadingPlaceholder } from "@grafana/ui";
import React, { useEffect, useState } from "react";
import { ConfigProps } from "../../../components/AppConfig/AppConfig";

interface ServiceLayoutState extends SceneAppPageState {
    service: string;
    config: ConfigProps;
    serviceTabs: ((folderUid: string) => SceneAppPageLike)[];
}

const getOrCreateServiceFolder = async (service: string, floderUid: string) => {
    const folders = await getBackendSrv().get<{ title: string, uid: string }[]>(`/api/folders?parentUid=${floderUid}`);
    const matchedFolder = folders.filter((folder: { title: string, uid: string }) => folder.title.toLowerCase() === service.toLowerCase());
    if (matchedFolder.length > 0) {
        return matchedFolder[0].uid;
    }
    const response = await getBackendSrv().post<{ uid: string }>('/api/folders', {
        title: service,
        parentUid: floderUid
    });
    return response.uid;
}

class ServiceLayout extends SceneAppPage {
    static Component = ({ model }: SceneComponentProps<ServiceLayout>) => {
        const { service, config, serviceTabs } = model.useState() as ServiceLayoutState;
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            getOrCreateServiceFolder(service, config.folderUid).then((uid) => {
                const tabs = serviceTabs.map((tab) => tab(uid));
                model.setState({ tabs: tabs });
                setLoading(false);
            });
        }, [service, config.folderUid, serviceTabs]);

        if (loading) {
            return <LoadingPlaceholder text="Loading..." />;
        }
        return <SceneAppPage.Component model={model} />;
    }

    constructor(state: ServiceLayoutState) {
        super(state);
    }
}

export { ServiceLayout };
