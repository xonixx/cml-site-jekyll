#!/usr/bin/env bash

set -v

ssh -i /tmp/deploy_rsa apps1@prod.cmlteam.com "
    (echo \"\$(date) next.cmlteam.com \$(pwd)\" ;
    rm -rf next.cmlteam.com                     ;
    mkdir next.cmlteam.com                      ;
    cd next.cmlteam.com                         ;
    echo 'User-agent: *'    > robots.txt        ;
    echo 'Disallow: /'     >> robots.txt        ;
    echo                   >> robots.txt        ;
    cd ..                                       ;
    echo 'User-agent: *'    > robots.txt        ;
    echo 'Disallow: /test/'>> robots.txt        ;
    echo                   >> robots.txt        ;
    ) >> /tmp/.deploy 2>&1"
cd _site ; scp -i /tmp/deploy_rsa -C -r * apps1@prod.cmlteam.com:~/next.cmlteam.com
