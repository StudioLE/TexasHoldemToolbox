#!/bin/bash

echo "Converting LESS to CSS"
lessc -x /srv/woodfarm/app/css/style.less /srv/woodfarm/app/css/style.css
