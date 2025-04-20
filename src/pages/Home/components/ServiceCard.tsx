import { Card, Icon } from "@grafana/ui";
import React from "react";


interface ServiceCardProps {
    targetUrl: string;
    service: string;
}

const ServiceCard = ({ targetUrl, service }: ServiceCardProps) => {
    return (
        <Card href={targetUrl}>
            <Card.Figure>
                <Icon name="add-user" />
            </Card.Figure>
            <Card.Heading>{service}</Card.Heading>
        </Card>
    );
};

export default ServiceCard;
