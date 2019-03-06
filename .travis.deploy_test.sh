#!/usr/bin/env bash

set -v

ssh -i /tmp/deploy_rsa apps1@prod.cmlteam.com "
    (echo \"\$(date) www.cmlteam.com \$(pwd)\" ;
    rm -rf www.cmlteam.com/test ;
    mkdir www.cmlteam.com/test ) >> /tmp/.deploy 2>&1"
cd _site ; scp -i /tmp/deploy_rsa -C -r * apps1@prod.cmlteam.com:~/www.cmlteam.com/test
