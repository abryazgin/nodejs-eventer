Install
-------
1. Install packages

    1.1 Install nodejs

        sudo apt-get update
        sudo apt-get install nodejs-legacy npm

    1.2 Install mongodb (see https://docs.mongodb.com/getting-started/shell/tutorial/install-on-linux/ )

2. Init directory

        cd /to/home/directory/of/your/projects
        mkdir eventer
        cd eventer

3. Install libraries
    
        npm install

Run
-------

Run server

    ./src/run/server.sh

Run tests

    ./src/run/test.sh

API
-------

- **Register subscriber** by POST-request to *http://localhost:8000/api/subscribe* with params *{event: <eventtype>, callback: <url>}*
    on event with type *<eventtype>* service send POST-request on *<url>* with *{event: <eventtype>, data: <data of event>}*

- **Unregister subscriber** by DELETE-request to *http://localhost:8000/api/subscribe* with params *{event: <eventtype>, callback: <url>}*

- **Alert event** by POST-request to *http://localhost:8000/api/event* with params *{event: <eventtype>, data: <data of event>}*

