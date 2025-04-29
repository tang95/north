import { locationService } from '@grafana/runtime';

/**
 * 从URL中获取folderUid参数
 * @returns 返回folderUid的值
 */
export const getFolderUid = (): string => {
    const folderUid = locationService.getSearchObject().folderUid;
    return folderUid as string;
};

/**
 * 为URL添加folderUid参数
 * @param targetUrl 目标URL
 * @param folderUid 文件夹UID
 * @returns 返回添加了folderUid参数的完整URL
 */
export const addFolderUidToUrl = (targetUrl: string, folderUid: string): string => {
    const url = new URL(targetUrl, window.location.origin);
    url.searchParams.append('folderUid', folderUid);
    return url.toString();
}; 
