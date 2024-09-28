import * as Sentry from "@sentry/node";
import {nodeProfilingIntegration} from "@sentry/profiling-node";
import dotenv from "dotenv";

dotenv.config();

Sentry.init({
    dsn: "https://2ad97acfc92d0beef8b1fbf6e7e2eeee@sentry.k8s.polito.it/11",
    integrations: [
        nodeProfilingIntegration(),
    ],
    // Add Tracing by setting tracesSampleRate
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    // Set sampling rate for profiling
    // This is relative to tracesSampleRate
    profilesSampleRate: 1.0,
});

