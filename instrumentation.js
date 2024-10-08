/*instrumentation.js*/
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
const { Resource, envDetector, processDetector } = require('@opentelemetry/resources');
const { SEMRESATTRS_SERVICE_NAME } = require('@opentelemetry/semantic-conventions');
// For troubleshooting, set the log level to DiagLogLevel.DEBUG
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const opentelemetry = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations, } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter, } = require('@opentelemetry/exporter-trace-otlp-http');
const { OTLPMetricExporter,} = require('@opentelemetry/exporter-metrics-otlp-http');
const { PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');
const { dockerCGroupV1Detector } = require('@opentelemetry/resource-detector-docker');


const sdk = new opentelemetry.NodeSDK({

resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: 'xmanager-api',
  }),


    
traceExporter: new OTLPTraceExporter({
// optional - default url is http://localhost:4318/v1/traces
url: 'http://34.41.106.145:4318/v1/traces',
// optional - collection of custom headers to be sent with each request, empty by default
headers: {},
}),
metricReader: new PeriodicExportingMetricReader({
exporter: new OTLPMetricExporter({
url: 'http://34.41.106.145:4318/v1/metrics', // url is optional and can be omitted - default is http://localhost:4318/v1/metrics
headers: {}, // an optional object containing custom headers to be sent with each request
concurrencyLimit: 1, // an optional limit on pending requests
}),
}),
instrumentations: [getNodeAutoInstrumentations()],
  resourceDetectors: [envDetector, processDetector, dockerCGroupV1Detector],
});
sdk.start();

