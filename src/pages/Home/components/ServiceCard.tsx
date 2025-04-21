import { Card, Icon, Stack, Text } from "@grafana/ui";
import React from "react";


interface ServiceCardProps {
    targetUrl: string;
    service: string;
}

const ServiceCard = ({ targetUrl, service }: ServiceCardProps) => {
    // 模拟数据
    const requestCount = Math.floor(Math.random() * 10000);
    const successRate = (Math.random() * 100).toFixed(2);
    const errorCount = Math.floor(Math.random() * 100);

    return (
        <Card href={targetUrl}>
            <Card.Figure>
                <Icon name="add-user" />
            </Card.Figure>
            <Card.Heading>
                <Stack direction="row" gap={1} alignItems="center">
                    <Text>{service}</Text>
                    <Text variant="bodySmall" color={Number(successRate) > 95 ? "success" : "warning"}>
                        {successRate}%
                    </Text>
                </Stack>
            </Card.Heading>
            <Card.Meta>
                <Stack direction="column" gap={0.5}>
                    <Text variant="bodySmall" color="secondary">
                        请求量: {requestCount.toLocaleString()}
                    </Text>
                    <Text variant="bodySmall" color="secondary">
                        错误数: {errorCount}
                    </Text>
                </Stack>
            </Card.Meta>
        </Card>
    );
};

export default ServiceCard;
