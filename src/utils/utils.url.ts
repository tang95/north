import { locationService } from '@grafana/runtime';

/**
 * 从URL中获取参数
 * @returns 返回参数的值
 */
export const getUrlParams = (): {
    namespace: string;
    language?: string;
    folderUid: string;
} => {
    const params = locationService.getSearchObject();
    return params as {
        namespace: string;
        language?: string;
        folderUid: string;
    };
};

/**
 * 为URL添加参数
 * @param targetUrl 目标URL
 * @param namespace 命名空间
 * @param language 语言
 * @param folderUid 文件夹UID
 * @returns 返回添加了参数的完整URL
 */
export const addUrlParamsToUrl = (targetUrl: string, namespace: string, folderUid: string, language?: string): string => {
    const url = new URL(targetUrl, window.location.origin);
    url.searchParams.append('namespace', namespace);
    url.searchParams.append('folderUid', folderUid);
    if (language) {
        url.searchParams.append('language', language);
    }
    return url.toString();
}; 
