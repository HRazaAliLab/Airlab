###### Installation Notes ######

Original developers' installation instructions are available at
https://bodenmillergroup.github.io/airlab-web/dev/developer/

##### Site Specific Notes #####

Copying `.env.template` to `.env` in the root directory didn't work.
What ended up happening is the template was copied to `/etc/airlab.sh`
and converted into a shell script by prefixing all variable setting
with "export" and converting the scripts in `scripts` to source this
file before performing their tasks.

The `/etc/airlab.sh` used is both on the server and uploaded to
issue 8317 of our Redmine issue tracking system.

The `docker-compose` commands were updated to `docker compose` but
otherwise unchanged. These are checked into the repository.

Some of the dependencies were updated in the container definitions
under `.deploy`. These included moving to Postgres 15 (the original
container used version 12, but the dump file provided was from 15 and
wouldn't work with 12) and moving to the latest version of _pgadmin_
just so it would properly support Postgres 15.

##### How to Deploy #####

Much as the original instructions really:

```BASH
sudo make build
sudo make deploy-production
```

In the end the database was created by importing a dump file from
BodenMiller. For a clean database though:

```BASH
sudo make db-migration
```

Starting and stopping after installation:

```BASH
sudo make start
sudo make stop
```

##### Locations #####

The Postgres data lives in the Docker volumes under `airlab_postgres_data`.
It can be accessed by running (on the server):

```BASH
psql --host=localhost --user=histolab_user histolab
```

The uploaded files (images) can be found in the Docker volume
`airlab_app_data`.

The Docker volumes are located at `/var/lib/docker/volumes`.

##### System Admin (setting up) #####

Our IT team provided a minimal Rocky Linux 8 VM to start with.
They (well, Gareth) also set up a local _postfix_ mail agent
and allowed used of _mailrelay_.

#### Allowing PGAdmin Access through the firewall ####

Create the file `/etc/firewalld/services/pgadmin.xml`:

```XML
<?xml version="1.0" encoding="utf-8"?>
<service>
  <short>Postgres Admin</short>
  <description>The Postgres administration web interface.</description>
  <port protocol="tcp" port="5050"/>
</service>
```

Enable with `firewall-cmd`:

```BASH
sudo chmod 640 /etc/firewalld/services/pgadmin.xml
sudo restorecon /etc/firewalld/services/pgadmin.xml
sudo firewall-cmd --permanent --add-service pgadmin
sudo firewall-cmd --reload
```

#### Postgres ####

```BASH
sudo dnf module reset -y postgresql
sudo dnf module enable -y postgresql:15
sudo dnf install postgresql
```


