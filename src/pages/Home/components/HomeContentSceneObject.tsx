import { urlUtil } from '@grafana/data';
import { locationService } from '@grafana/runtime';
import { SceneComponentProps, SceneObjectBase, SceneObjectState } from '@grafana/scenes';
import { Grid, ScrollContainer } from '@grafana/ui';
import React from 'react';
import { prefixRoute } from 'utils/utils.routing';
import ServiceCard from './ServiceCard';

const SERVICE_VARIANTS = {
  'user-service': ['auth', 'profile', 'preferences', 'social', 'admin'],
  'payment-service': ['transaction', 'refund', 'subscription', 'billing', 'crypto'],
  'order-service': ['checkout', 'fulfillment', 'tracking', 'returns', 'inventory'],
  'product-service': ['catalog', 'pricing', 'review', 'recommendation', 'search'],
  'notification-service': ['email', 'sms', 'push', 'webhook', 'in-app'],
  'analytics-service': ['metrics', 'logging', 'tracking', 'reporting', 'dashboard'],
  'storage-service': ['blob', 'file', 'cache', 'backup', 'archive'],
  'api-service': ['gateway', 'proxy', 'internal', 'external', 'graphql'],
  'auth-service': ['oauth', 'jwt', 'sso', 'mfa', 'rbac'],
  'monitoring-service': ['health', 'alerts', 'metrics', 'tracing', 'logs'],
  'search-service': ['elastic', 'full-text', 'faceted', 'geo', 'realtime'],
  'cache-service': ['redis', 'memcached', 'distributed', 'local', 'session'],
  'config-service': ['global', 'env', 'feature-flags', 'secrets', 'deployment'],
  'messaging-service': ['queue', 'pubsub', 'stream', 'websocket', 'kafka'],
  'cdn-service': ['static', 'media', 'assets', 'images', 'video'],
  'database-service': ['primary', 'replica', 'warehouse', 'timeseries', 'graph'],
  'security-service': ['firewall', 'waf', 'encryption', 'compliance', 'audit'],
  'integration-service': ['webhook', 'partner', 'third-party', 'legacy', 'external'],
  'workflow-service': ['orchestration', 'scheduler', 'pipeline', 'task', 'batch'],
  'ml-service': ['inference', 'training', 'feature', 'model', 'prediction'],
};

interface HomeContentSceneObjectState extends SceneObjectState {
}

export class HomeContentSceneObject extends SceneObjectBase<HomeContentSceneObjectState> {
  static Component = ({ model }: SceneComponentProps<HomeContentSceneObject>) => {
    const services = Object.entries(SERVICE_VARIANTS).flatMap(([baseName, variants]) => 
      variants.map(variant => `${baseName}-${variant}`)
    );

    return (
      <div style={{ width: '100%' }}>
        <div style={{ marginBottom: '10px', color: 'var(--colors-text-secondary)' }}>
          Found {services.length} services
        </div>
        <ScrollContainer showScrollIndicators height={87}>
          <Grid columns={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 4 }} gap={1}>
            {services.map((serviceName, index) => (
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
