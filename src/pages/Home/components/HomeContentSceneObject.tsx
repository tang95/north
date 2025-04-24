import { urlUtil } from '@grafana/data';
import { locationService } from '@grafana/runtime';
import { SceneComponentProps, sceneGraph, SceneObjectBase, SceneObjectState } from '@grafana/scenes';
import { Grid, ScrollContainer } from '@grafana/ui';
import React, { useEffect } from 'react';
import { prefixRoute } from 'utils/utils.routing';
import ServiceCard from './ServiceCard';

const SERVICE_VARIANTS = [
  'user-service',
  'payment-service',
  'order-service',
  'product-service',
  'notification-service',
  'analytics-service',
  'storage-service',
  'api-service',
  'auth-service',
  'monitoring-service',
  'search-service',
  'cache-service',
  'config-service',
  'messaging-service',
  'cdn-service',
  'database-service',
  'security-service',
  'integration-service',
  'workflow-service',
  'ml-service'
];

interface HomeContentSceneObjectState extends SceneObjectState {
}

export class HomeContentSceneObject extends SceneObjectBase<HomeContentSceneObjectState> {
  static Component = ({ model }: SceneComponentProps<HomeContentSceneObject>) => {
    const {data} = sceneGraph.getData(model).useState();
    useEffect(() => {
      if (data) {
        console.log(data.series)
      }
    }, [data])
    return (
      <div style={{ width: '100%' }}>
        <div style={{ marginBottom: '10px', color: 'var(--colors-text-secondary)' }}>
          Found {SERVICE_VARIANTS.length} services
        </div>
        <ScrollContainer showScrollIndicators height={87}>
          <Grid columns={{ xs: 1, sm: 1, md: 2, lg: 4, xl: 4, xxl: 6 }} gap={1}>
            {SERVICE_VARIANTS.map((serviceName, index) => (
              <ServiceCard key={index} service={serviceName} targetUrl={model.getServiceUrl(serviceName)} />
            ))}
          </Grid>
        </ScrollContainer>
      </div>
    );
  };

  public getServiceUrl(service: string) {
    return urlUtil.renderUrl(prefixRoute(`/${service}`), locationService.getSearchObject());
  }
}
