import { Card, Stack, Text, Tooltip, useTheme2 } from "@grafana/ui";
import React, { useMemo, useState } from "react";
import { formatPercentValue, formatShortValue } from "utils/utils.unit";
import { ConfigProps } from "../../../components/AppConfig/AppConfig";
import { getLanguageIcon } from "../../../utils/utils.icon";
import { addUrlParamsToUrl } from "../../../utils/utils.url";
import { getOrCreateServiceFolder } from "../../../utils/utils.folder";

export type ServiceCardProps = {
    targetUrl: string;
    service: string;
    namespace: string;
    language?: string;
    successRate: number;
    requestCount: number;
    errorCount: number;
    config: ConfigProps;
}

// 将常量移到组件外部
const SUCCESS_THRESHOLD = 0.99;

const ServiceCard = ({ targetUrl, service, namespace, successRate, requestCount, errorCount, language, config }: ServiceCardProps) => {
    const isHealthy = successRate >= SUCCESS_THRESHOLD;
    const [loading, setLoading] = useState(false);
    const theme = useTheme2();
    const statusColor = useMemo(() => {
        return isHealthy ? "success" : "error";
    }, [isHealthy]);

    const languageIcon = useMemo(() => getLanguageIcon(language), [language]);

    const handleClick = async (config: ConfigProps) => {
        setLoading(true);
        try {
            const serviceFolderUid = await getOrCreateServiceFolder(service, config.folderUid);
            // 添加服务文件夹UID作为查询参数
            const url = addUrlParamsToUrl(targetUrl, namespace, serviceFolderUid, language);
            window.location.href = url;
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <Card className="service-card" onClick={() => handleClick(config)}>
                <Card.Figure>
                    <Tooltip content={language || "Unknown language"}>
                        {languageIcon}
                    </Tooltip>
                </Card.Figure>
                <Card.Heading>
                    <Stack direction="row" gap={1} alignItems="center" justifyContent="space-between">
                        <Text element="span" truncate>{service}</Text>
                        <Tooltip content={`Success Rate: ${formatPercentValue(successRate)}`}>
                            <Text variant="h6" color={statusColor}>
                                {formatPercentValue(successRate)}
                            </Text>
                        </Tooltip>
                    </Stack>
                </Card.Heading>
                <Card.Description>
                    <Stack direction="column" gap={1}>
                        <Stack direction="row" gap={1} justifyContent="space-between">
                            <Text variant="bodySmall" color="secondary">Total:</Text>
                            <Text variant="bodySmall">{formatShortValue(requestCount)}</Text>
                        </Stack>
                        <Stack direction="row" gap={1} justifyContent="space-between">
                            <Text variant="bodySmall" color="secondary">Errors:</Text>
                            <Text variant="bodySmall" color={errorCount > 0 ? "error" : undefined}>
                                {formatShortValue(errorCount)}
                            </Text>
                        </Stack>
                    </Stack>
                </Card.Description>
            </Card>
            {loading && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: theme.colors.background.secondary,
                    opacity: 0.7,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                    borderRadius: '4px'
                }}>
                    <Text variant="h6" color="primary">Loading...</Text>
                </div>
            )}
        </div>
    );
};

export default React.memo(ServiceCard);
