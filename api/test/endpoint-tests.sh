#!/usr/bin/env sh
npm start &
sleep 2
npm run test-endpoints
