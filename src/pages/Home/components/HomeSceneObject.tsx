import { urlUtil } from '@grafana/data';
import { locationService } from '@grafana/runtime';
import { SceneComponentProps, sceneGraph, SceneObjectBase, SceneObjectState } from '@grafana/scenes';
import { Grid, ScrollContainer, Stack } from '@grafana/ui';
import React, { useEffect, useState } from 'react';
import { prefixRoute } from 'utils/utils.routing';
import HomeSearchBar from './HomeSearchBar';
import ServiceCard, { ServiceCardProps } from './ServiceCard';

interface HomeSceneObjectState extends SceneObjectState {
}

export class HomeSceneObject extends SceneObjectBase<HomeSceneObjectState> {
  static Component = ({ model }: SceneComponentProps<HomeSceneObject>) => {
    const { data } = sceneGraph.getData(model).useState();
    const [services, setServices] = useState<ServiceCardProps[]>([]);
    const [filteredServices, setFilteredServices] = useState<ServiceCardProps[]>([]);
    
    // 从URL获取初始参数或使用默认值
    const searchParams = locationService.getSearchObject();
    const [namespace, setNamespace] = useState<string>(searchParams.namespace as string || 'all');
    const [namespaces, setNamespaces] = useState<string[]>([]);
    const [sortKey, setSortKey] = useState<string>(searchParams.sortKey as string || 'total');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>((searchParams.sortOrder as 'asc' | 'desc') || 'desc');
    const [keyword, setKeyword] = useState<string>(searchParams.keyword as string || '');
    const { getServiceUrl } = model;

    // 检查输入是否是trace ID的函数
    const isTraceId = (value: string): boolean => {
      // 通常trace ID是16或32位的十六进制字符串
      // 这里使用一个简单的正则表达式来匹配
      return /^[0-9a-f]{16,32}$/i.test(value.trim());
    };

    // 处理关键词变化，检查是否是trace ID
    const handleKeywordChange = (value: string) => {
      setKeyword(value);
      
      // 如果输入的是trace ID，跳转到trace页面
      if (isTraceId(value)) {
        locationService.push(prefixRoute(`/trace/${value}`));
      }
    };

    useEffect(() => {
      if (data) {
        const serviceFields = data.series
          .filter((series) => series.name === 'service')
          .flatMap((series) => series.fields)
        const nameValues = serviceFields
          .filter((field) => field.name === "Service")
          .map((field) => field.values)
          .flat()
        const totalValues = serviceFields
          .filter((field) => field.name === 'Total')
          .map((field) => field.values)
          .flat()
        const errorCountValues = serviceFields
          .filter((field) => field.name === 'Errors')
          .map((field) => field.values)
          .flat()
        const successRateValues = serviceFields
          .filter((field) => field.name === 'SuccessRate')
          .map((field) => field.values)
          .flat()
        const languageValues = serviceFields
          .filter((field) => field.name === 'Language')
          .map((field) => field.values)
          .flat()
        const namespaceValues = serviceFields
          .filter((field) => field.name === 'Namespace')
          .map((field) => field.values)
          .flat()
        const serviceList = nameValues.map((value, index) => ({
          service: value,
          targetUrl: getServiceUrl(value),
          successRate: successRateValues[index],
          requestCount: totalValues[index],
          errorCount: errorCountValues[index],
          language: languageValues[index],
          namespace: namespaceValues[index]
        }));
        setServices(serviceList);
      }
    }, [data, getServiceUrl]);

    useEffect(() => {
      if (data) {
        const namespaceFields = data.series
          .filter((series) => series.name === 'namespace')
          .flatMap((series) => series.fields)
        const namespaceValues = namespaceFields
          .filter((field) => field.name === 'Namespace')
          .map((field) => field.values)
          .flat()
        setNamespaces(namespaceValues);
      }
    }, [data]);

    // 处理搜索和排序
    useEffect(() => {
      let result = [...services]; // 创建一个副本以避免修改原数组

      // 按命名空间筛选
      if (namespace !== 'all') {
        result = result.filter(service => service.namespace === namespace);
      }

      // 按关键词搜索
      if (keyword) {
        const lowerKeyword = keyword.toLowerCase();
        result = result.filter(service =>
          service.service.toLowerCase().includes(lowerKeyword)
        );
      }

      // 排序
      result.sort((a, b) => {
        let valueA, valueB;

        switch (sortKey) {
          case 'successRate':
            valueA = a.successRate;
            valueB = b.successRate;
            break;
          case 'total':
            valueA = a.requestCount;
            valueB = b.requestCount;
            break;
          case 'errors':
            valueA = a.errorCount;
            valueB = b.errorCount;
            break;
          default:
            valueA = a.service;
            valueB = b.service;
        }

        if (sortOrder === 'desc') {
          // 降序：大值在前
          return typeof valueA === 'number' && typeof valueB === 'number'
            ? valueB - valueA
            : String(valueB).localeCompare(String(valueA));
        } else {
          // 升序：小值在前
          return typeof valueA === 'number' && typeof valueB === 'number'
            ? valueA - valueB
            : String(valueA).localeCompare(String(valueB));
        }
      });

      setFilteredServices(result);
    }, [services, namespace, keyword, sortKey, sortOrder]);

    return (
      <Stack direction="column" width={"100%"}>
        <HomeSearchBar
          namespaceList={namespaces}
          namespace={namespace}
          sortKey={sortKey}
          sortOrder={sortOrder}
          keyword={keyword}
          onNamespaceChange={(value) => setNamespace(value)}
          onSortKeyChange={(value) => setSortKey(value)}
          onSortOrderChange={(value) => setSortOrder(value)}
          onKeywordChange={handleKeywordChange}
        />
        <div>
          Found {filteredServices.length} services
        </div>
        <ScrollContainer showScrollIndicators maxHeight={86}>
          <Grid columns={{ xs: 1, sm: 1, md: 2, lg: 4 }} gap={2}>
            {filteredServices.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </Grid>
        </ScrollContainer>
      </Stack>
    );
  };

  public getServiceUrl(service: string) {
    return urlUtil.renderUrl(prefixRoute(`/${service}`), locationService.getSearchObject());
  }
}
