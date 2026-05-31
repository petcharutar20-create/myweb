#!/bin/bash
export PATH="/opt/homebrew/opt/node@26/bin:$PATH"
export NODE="/opt/homebrew/opt/node@26/bin/node"
cd /Users/petcharut/Programming/my-app
node ./node_modules/.bin/next dev
