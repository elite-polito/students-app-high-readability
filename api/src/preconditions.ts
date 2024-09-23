import * as Sentry from "@sentry/node";
import {nodeProfilingIntegration} from "@sentry/profiling-node";
import dotenv from "dotenv";

dotenv.config();

Sentry.init({
    dsn: "https://3d94f5b023cf08ba55a8725d91073aa4@sentry.k8s.polito.it/9",
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

