import { getBackendSrv } from "@grafana/runtime";

// 获取或创建服务文件夹，返回文件夹UID
export const getOrCreateServiceFolder = async (service: string, folderUid: string) => {
    const folders = await getBackendSrv().get<Array<{ title: string, uid: string }>>(`/api/search?folderUIDs=${folderUid}&query=${service}&type=dash-folder&deleted=false`);
    const matchedFolder = folders.filter((folder: { title: string, uid: string }) => folder.title.toLowerCase() === service.toLowerCase());
    if (matchedFolder.length > 0) {
        return matchedFolder[0].uid;
    }
    const response = await getBackendSrv().post<{ uid: string }>('/api/folders', {
        title: service,
        parentUid: folderUid
    });
    return response.uid;
};
