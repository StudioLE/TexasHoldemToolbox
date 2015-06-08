#!/bin/bash

echo "Converting LESS to CSS"
lessc -x /srv/texasholdem/www/assets/master.less /srv/texasholdem/www/assets/master.css
