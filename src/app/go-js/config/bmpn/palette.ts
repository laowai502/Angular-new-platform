import * as go from 'gojs';
import bmpn from './';

const palNodeTemplateMap = new go.Map<string, go.Node>();
palNodeTemplateMap.add('activity', bmpn.activityNodeTemplateForPalette);
palNodeTemplateMap.add('event', bmpn.eventNodeTemplate);
palNodeTemplateMap.add('gateway', bmpn.gatewayNodeTemplateForPalette);
palNodeTemplateMap.add('annotation', bmpn.annotationNodeTemplate);
palNodeTemplateMap.add('dataobject', bmpn.dataObjectNodeTemplate);
palNodeTemplateMap.add('datastore', bmpn.dataStoreNodeTemplate);
palNodeTemplateMap.add('privateProcess', bmpn.privateProcessNodeTemplateForPalette);

const palGroupTemplateMap = new go.Map<string, go.Group>();
palGroupTemplateMap.add('subprocess', bmpn.subProcessGroupTemplateForPalette);
palGroupTemplateMap.add('Pool', bmpn.poolTemplateForPalette);
palGroupTemplateMap.add('Lane', bmpn.swimLanesGroupTemplateForPalette);

export { palNodeTemplateMap, palGroupTemplateMap };