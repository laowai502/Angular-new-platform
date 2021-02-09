/**
 * workarea for temp
 */
import * as go from 'gojs';
import temp from './';
import link from './link';

// create the nodeTemplateMap, holding main view node templates:
const nodeTemplateMap = new go.Map<string, go.Node>();
// for each of the node categories, specify which template to use
nodeTemplateMap.add('activity', temp.activityNodeTemplate);
nodeTemplateMap.add('event', temp.eventNodeTemplate);
nodeTemplateMap.add('gateway', temp.gatewayNodeTemplate);
nodeTemplateMap.add('annotation', temp.annotationNodeTemplate);
nodeTemplateMap.add('dataobject', temp.dataObjectNodeTemplate);
nodeTemplateMap.add('datastore', temp.dataStoreNodeTemplate);
nodeTemplateMap.add('privateProcess', temp.privateProcessNodeTemplate);
// for the default category, "", use the same template that Diagrams use by default
// this just shows the key value as a simple TextBlock

const groupTemplateMap = new go.Map<string, go.Group>();
groupTemplateMap.add('subprocess', temp.subProcessGroupTemplate);
groupTemplateMap.add('Lane', temp.swimLanesGroupTemplate);
groupTemplateMap.add('Pool', temp.poolGroupTemplate);

const linkTemplateMap = new go.Map<string, go.Link>();
linkTemplateMap.add('msg', link.messageFlowLinkTemplate);
linkTemplateMap.add('annotation', link.annotationAssociationLinkTemplate);
linkTemplateMap.add('data', link.dataAssociationLinkTemplate);
linkTemplateMap.add('', link.sequenceLinkTemplate);  // default

export { nodeTemplateMap, groupTemplateMap, linkTemplateMap };