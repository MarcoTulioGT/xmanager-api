/*instrumentation.js*/
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
// For troubleshooting, set the log level to DiagLogLevel.DEBUG
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const opentelemetry = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations, } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter, } = require('@opentelemetry/exporter-trace-otlp-http');
const { OTLPMetricExporter,} = require('@opentelemetry/exporter-metrics-otlp-http');
const { PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');

const sdk = new opentelemetry.NodeSDK({

resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'xmanager-api',
  }),
  
traceExporter: new OTLPTraceExporter({
// optional - default url is http://localhost:4318/v1/traces
url: 'http://35.202.29.2:4318/v1/traces',
// optional - collection of custom headers to be sent with each request, empty by default
headers: {},
}),
metricReader: new PeriodicExportingMetricReader({
exporter: new OTLPMetricExporter({
url: 'http://35.202.29.2:4318/v1/metrics', // url is optional and can be omitted - default is http://localhost:4318/v1/metrics
headers: {}, // an optional object containing custom headers to be sent with each request
concurrencyLimit: 1, // an optional limit on pending requests
}),
}),
instrumentations: [getNodeAutoInstrumentations()],
});
sdk.start();

// /*"start": "node --require ./instrumentation.js src/server.js"*/
