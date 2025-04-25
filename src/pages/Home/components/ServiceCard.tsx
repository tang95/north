import { Card, Stack, Text } from "@grafana/ui";
import React from "react";
import { formatPercentValue, formatShortValue } from "utils/utils.unit";
import opentelemetryIcon from '../../../img/opentelemetry.svg';
import cppIcon from '../../../img/language/cpp.svg';
import dotnetIcon from '../../../img/language/dotnet.svg';
import erlangIcon from '../../../img/language/erlang.svg';
import goIcon from '../../../img/language/go.svg';
import kotlinIcon from '../../../img/language/kotlin.svg';
import nodejsIcon from '../../../img/language/nodejs.svg';
import phpIcon from '../../../img/language/php.svg';
import pythonIcon from '../../../img/language/python.svg';
import rubyIcon from '../../../img/language/ruby.svg';
import rustIcon from '../../../img/language/rust.svg';
import swiftIcon from '../../../img/language/swift.svg';
import webjsIcon from '../../../img/language/webjs.svg';
import javaIcon from '../../../img/language/java.svg';

export type ServiceCardProps = {
    targetUrl: string;
    service: string;
    namespace: string;
    language?: string;
    successRate: number;
    requestCount: number;
    errorCount: number;
}

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
        return <img src={opentelemetryIcon} alt="OpenTelemetry" style={{ width: '32px', height: '32px' }} />;
    }

    const icon = languageIcons[language.toLowerCase()];
    return icon ? (
        <img src={icon} alt={language} style={{ width: '32px', height: '32px' }} />
    ) : (
        <img src={opentelemetryIcon} alt="OpenTelemetry" style={{ width: '32px', height: '32px' }} />
    );
};

const ServiceCard = ({ targetUrl, service, successRate, requestCount, errorCount, language }: ServiceCardProps) => {
    return (
        <Card href={targetUrl}>
            <Card.Figure>
                {getLanguageIcon(language)}
            </Card.Figure>
            <Card.Heading>
                <Stack direction="row" gap={1} alignItems="center">
                    <Text>{service}</Text>
                    <Text variant="bodySmall" color={successRate < 0.99 ? "error" : "success"}>
                        {formatPercentValue(successRate)}
                    </Text>
                </Stack>
            </Card.Heading>
            <Card.Meta>
                <Stack direction="column" gap={0.5}>
                    <Text variant="bodySmall" color="secondary">
                        Total: {formatShortValue(requestCount)}
                    </Text>
                    <Text variant="bodySmall" color="secondary">
                        Errors: {formatShortValue(errorCount)}
                    </Text>
                </Stack>
            </Card.Meta>
        </Card>
    );
};

export default ServiceCard;
