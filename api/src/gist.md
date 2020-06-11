https://www.ixsystems.com/community/resources/fn11-2-iocage-jails-plex-tautulli-sonarr-radarr-lidarr-jackett-transmission-organizr.58/

# Plex

Fresh Install
```
echo '{"pkgs":["plexmediaserver-plexpass","ca_root_nss"]}' > /tmp/pkg.json
iocage create -n "plex" -p /tmp/pkg.json -r 11.2-RELEASE ip4_addr="vnet0|X.X.X.X/24" defaultrouter="X.X.X.X" vnet="on" allow_raw_sockets="1" boot="on"
rm /tmp/pkg.json

jls then jexec ##

mkdir /config
chown -R plex:plex /config
mkdir /mnt/tvshows
chown -R plex:plex /mnt/tvshows
mkdir /mnt/movies
chown -R plex:plex /mnt/movies
mkdir /mnt/other
chown -R plex:plex /mnt/other
exit

iocage fstab -a plex /mnt/tinyrick/apps/plex /config nullfs rw 0 0
iocage fstab -a plex /mnt/tinyrick/tvshows /mnt/tvshows nullfs ro 0 0
iocage fstab -a plex /mnt/tinyrick/movies /mnt/movies nullfs ro 0 0
iocage fstab -a plex /mnt/tinyrick/video/other /mnt/other nullfs ro 0 0

jls then jexec #

sysrc "plexmediaserver_plexpass_enable=YES"
sysrc plexmediaserver_plexpass_support_path="/config"
service plexmediaserver_plexpass start
exit
```

Migrate Old Install

sites:
https://support.plex.tv/articles/201370363-move-an-install-to-another-system/
https://support.plex.tv/articles/201154527-move-viewstate-ratings-from-one-install-to-another/

# Unifi Controller

Install `unifi5`
```
echo '{"pkgs":["unifi5"]}' > /tmp/pkg.json
iocage create -n "unifi" -p /tmp/pkg.json -r 11.2-RELEASE ip4_addr="vnet0|192.168.8.48/24" defaultrouter="192.168.8.1" vnet="on" allow_raw_sockets="1" boot="on"
rm /tmp/pkg.json

```
or create the new jail and run this
```
iocage create -n "unifi" -r 11.2-RELEASE ip4_addr="vnet0|192.168.8.48/24" defaultrouter="192.168.8.1" vnet="on" allow_raw_sockets="1" boot="on"
iocage exec unifi pkg update
iocage exec unifi pkg install unifi5
```
Setup the config folder and add a main jail user
```
already exists - iocage exec unifi "pw user add unifi -c unifi -u 109 -d /nonexistent -s /usr/bin/nologin"

iocage exec unifi mkdir /config
iocage exec unifi chown -R unifi:unifi /config

iocage fstab -a unifi /mnt/tinyrick/apps/unifi /config nullfs rw 0 0
iocage exec unifi sysrc "unifi_enable=YES"
iocage exec unifi service unifi start
```
skipped these
```
no file or directory - iocage exec unifi chown -R unifi:unifi /usr/local/
share/unifi /config
iocage exec unifi cp /usr/local/share/unifi/init-scripts/init.freenas /usr/local/etc/rc.d/unifi
iocage exec unifi chmod u+x /usr/local/etc/rc.d/unifi
iocage exec unifi sysrc "unifi_flags=--datadir /config"
```
Connect on `localhost:8443`

# Tautulli
```
echo '{"pkgs":["python2","py27-sqlite3","py27-openssl","ca_root_nss","git"]}' > /tmp/pkg.json
iocage create -n "tautulli" -p /tmp/pkg.json -r 11.2-RELEASE ip4_addr="vnet0|192.168.8.45/24" defaultrouter="192.168.8.1" vnet="on" allow_raw_sockets="1" boot="on"
rm /tmp/pkg.json
iocage exec tautulli git clone https://github.com/Tautulli/Tautulli.git /usr/local/share/Tautulli
iocage exec tautulli "pw user add tautulli -c tautulli -u 109 -d /nonexistent -s /usr/bin/nologin"

jls then jexec ##

mkdir /config
chown -R tautulli:tautulli /config
exit
iocage fstab -a plex /mnt/tinyrick/apps/tautulli /config nullfs rw 0 0
iocage exec tautulli chown -R tautulli:tautulli /usr/local/share/Tautulli /config
iocage exec tautulli cp /usr/local/share/Tautulli/init-scripts/init.freenas /usr/local/etc/rc.d/tautulli
iocage exec tautulli chmod u+x /usr/local/etc/rc.d/tautulli
iocage exec tautulli sysrc "tautulli_enable=YES"
iocage exec tautulli sysrc "tautulli_flags=--datadir /config"
iocage exec tautulli service tautulli start
```
# Sonarr
```
echo '{"pkgs":["mono","mediainfo","sqlite3","ca_root_nss","curl"]}' > /tmp/pkg.json
iocage create -n "sonarr" -p /tmp/pkg.json -r 11.2-RELEASE ip4_addr="vnet0|192.168.8.42/24" defaultrouter="192.168.8.1" vnet="on" allow_raw_sockets="1" boot="on"
rm /tmp/pkg.json
iocage exec sonarr "pw user add media -c media -u 351 -d /nonexistent -s /usr/bin/nologin"
iocage exec sonarr pw group add media -g 8675309

jls then jexec ##

mkdir /config
chown -R media:media /config
mkdir /mnt/tvshows
chown -R media:media /mnt/tvshows
mkdir /mnt/tvshows
chown -R media:media /mnt/tvshows
mkdir /mnt/downloads
chown -R media:media /mnt/downloads
exit

iocage fstab -a sonarr /mnt/tinyrick/apps/sonarr /config nullfs rw 0 0
iocage fstab -a sonarr /mnt/tinyrick/downloads /mnt/downloads nullfs rw 0 0
iocage fstab -a sonarr /mnt/tinyrick/tvshows /mnt/tvshows nullfs rw 0 0
iocage exec sonarr ln -s /usr/local/bin/mono /usr/bin/mono
iocage exec sonarr "fetch http://download.sonarr.tv/v2/master/mono/NzbDrone.master.tar.gz -o /usr/local/share"
iocage exec sonarr "tar -xzvf /usr/local/share/NzbDrone.master.tar.gz -C /usr/local/share"
iocage exec sonarr rm /usr/local/share/NzbDrone.master.tar.gz
iocage exec sonarr "pw user add media -c media -u 351 -d /nonexistent -s /usr/bin/nologin"
iocage exec sonarr chown -R media:media /usr/local/share/NzbDrone /config
iocage exec sonarr mkdir /usr/local/etc/rc.d
```

rc.d file Contents
--------------------

#!/bin/sh
```
# $FreeBSD$
#
# PROVIDE: sonarr
# REQUIRE: LOGIN
# KEYWORD: shutdown
#
# Add the following lines to /etc/rc.conf.local or /etc/rc.conf
# to enable this service:
#
# sonarr_enable: Set to YES to enable sonarr
# Default: NO
# sonarr_user: The user account used to run the sonarr daemon.
# This is optional, however do not specifically set this to an
# empty string as this will cause the daemon to run as root.
# Default: media
# sonarr_group: The group account used to run the sonarr daemon.
# This is optional, however do not specifically set this to an
# empty string as this will cause the daemon to run with group wheel.
# Default: media
# sonarr_data_dir: Directory where sonarr configuration
# data is stored.
# Default: /var/db/sonarr
```

```
. /etc/rc.subr

name=sonarr
rcvar=${name}_enable
load_rc_config $name

: ${sonarr_enable:="NO"}
: ${sonarr_user:="media"}
: ${sonarr_group:="media"}
: ${sonarr_data_dir:="/config"}

pidfile="${sonarr_data_dir}/nzbdrone.pid"
command="/usr/sbin/daemon"
procname="/usr/local/bin/mono"
command_args="-f ${procname} /usr/local/share/NzbDrone/NzbDrone.exe --data=${sonarr_data_dir} --nobrowser"

start_precmd=sonarr_precmd
sonarr_precmd() {
if [ ! -d ${sonarr_data_dir} ]; then
install -d -o ${sonarr_user} -g ${sonarr_group} ${sonarr_data_dir}
fi

export XDG_CONFIG_HOME=${sonarr_data_dir}
}

run_rc_command "$1"
```
---
```
iocage exec sonarr chmod u+x /usr/local/etc/rc.d/sonarr
iocage exec sonarr sysrc "sonarr_enable=YES"
iocage exec sonarr service sonarr start
```

# Bitcoin Node
https://github.com/bitcoin/bitcoin/blob/master/doc/build-freebsd.md
```
iocage create -n "bitcoin-node" -r 11.2-RELEASE ip4_addr="vnet0|X.X.X.X/24" defaultrouter="X.X.X.X" vnet="on" allow_raw_sockets="1" boot="on"

mkdir /config
chown -R plex:plex /config

pkg install autoconf automake boost-libs git gmake libevent libtool pkgconf

git clone https://github.com/bitcoin/bitcoin.git

cd bitcoin/
./autogen.sh
./configure --with-gui=no --disable-wallet MAKE=gmake
gmake

pw add group bitcoin
pw add user -n bitcoin -g bitcoin -s /sbin/nologin -c "Bitcoin"

# echo 'bitcoind_user="bitcoin"' >> /etc/rc.conf
# echo 'bitcoind_group="bitcoin"' >> /etc/rc.conf
# echo 'bitcoind_data="/var/db/bitcoind"' >> /etc/rc.conf
# echo 'bitcoind_enable="YES"' >> /etc/rc.conf

bitcoin/src/bitcoind -conf=/config/bitcoin.conf
```
https://github.com/dan-da/jsonrpc-cli
https://project.altservice.com/issues/889
https://roll.urown.net/server/bitcoin/bitcoin-full-node.html

- jsonrpc test command
```
curl --user user:pass --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockchaininfo", "params": [] }' -H 'content-type: text/plain;' http://N.O.D.E:8332/
```
