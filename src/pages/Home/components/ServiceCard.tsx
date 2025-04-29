import { Card, Stack, Text, Tooltip } from "@grafana/ui";
import React, { useMemo, useState } from "react";
import { formatPercentValue, formatShortValue } from "utils/utils.unit";
import { ConfigProps } from "../../../components/AppConfig/AppConfig";
import cppIcon from '../../../img/language/cpp.svg';
import dotnetIcon from '../../../img/language/dotnet.svg';
import erlangIcon from '../../../img/language/erlang.svg';
import goIcon from '../../../img/language/go.svg';
import javaIcon from '../../../img/language/java.svg';
import kotlinIcon from '../../../img/language/kotlin.svg';
import nodejsIcon from '../../../img/language/nodejs.svg';
import phpIcon from '../../../img/language/php.svg';
import pythonIcon from '../../../img/language/python.svg';
import rubyIcon from '../../../img/language/ruby.svg';
import rustIcon from '../../../img/language/rust.svg';
import swiftIcon from '../../../img/language/swift.svg';
import webjsIcon from '../../../img/language/webjs.svg';
import opentelemetryIcon from '../../../img/opentelemetry.svg';
import { addFolderUidToUrl } from "../../../utils/urls.helper";
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
const ICON_SIZE = '32px';

const languageIcons: { [key: string]: string } = {
    cpp: cppIcon,
    dotnet: dotnetIcon,
    erlang: erlangIcon,
    go: goIcon,
    kotlin: kotlinIcon,
    nodejs: nodejsIcon,
    php: phpIcon,
    python: pythonIcon,
    ruby: rubyIcon,
    rust: rustIcon,
    swift: swiftIcon,
    webjs: webjsIcon,
    java: javaIcon,
    unknown: opentelemetryIcon
};

const getLanguageIcon = (language?: string) => {
    if (!language) {
        return <img src={opentelemetryIcon} alt="OpenTelemetry" style={{ width: ICON_SIZE, height: ICON_SIZE }} />;
    }

    const icon = languageIcons[language.toLowerCase()];
    return icon ? (
        <img src={icon} alt={language} style={{ width: ICON_SIZE, height: ICON_SIZE }} />
    ) : (
        <img src={opentelemetryIcon} alt="OpenTelemetry" style={{ width: ICON_SIZE, height: ICON_SIZE }} />
    );
};

const ServiceCard = ({ targetUrl, service, namespace, successRate, requestCount, errorCount, language, config }: ServiceCardProps) => {
    const isHealthy = successRate >= SUCCESS_THRESHOLD;
    const [loading, setLoading] = useState(false);
    const statusColor = useMemo(() => {
        return isHealthy ? "success" : "error";
    }, [isHealthy]);
    
    const languageIcon = useMemo(() => getLanguageIcon(language), [language]);

    const handleClick = async (config: ConfigProps) => {
        setLoading(true);
        try {
            const serviceFolderUid = await getOrCreateServiceFolder(service, config.folderUid);
            
            // 添加服务文件夹UID作为查询参数
            const url = addFolderUidToUrl(targetUrl, serviceFolderUid);
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
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
